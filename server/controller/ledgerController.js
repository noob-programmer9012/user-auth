import { Ledger } from "../models/Ledger.js";
import { Challan } from "../models/Challan.js";
import { Firm } from "../models/Firm.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { createPDF } from "../utils/createPDF.js";
import Debit from "../models/Debit.js";
import Credit from "../models/Credit.js";
import mongoose from "mongoose";
import path from "node:path";

export async function createLedger(req, res, next) {
  const {
    firmId,
    companyName,
    ledgerGroup,
    openingBalance,
    address,
    pincode,
    gst_no,
    mobile,
    email,
  } = req.body;

  const firm = await Firm.findById(firmId);

  if (!firm) {
    return next(new ErrorResponse("No firm found with this id.", 404));
  }

  const exist = await Ledger.findOne({ $and: [{ firmId, companyName }] });
  if (exist) {
    return next(new ErrorResponse("Company already exist.", 400));
  }

  try {
    const ledger = new Ledger({
      firmId,
      companyName,
      ledgerGroup,
      openingBalance,
      address,
      pincode,
      gst_no,
      mobile,
      email,
    });
    await ledger.save();
    res.status(200).json({
      success: true,
      data: ledger,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDebtors(req, res, next) {
  try {
    const debtors = await Ledger.find({
      $and: [{ firmId: req.params.id, ledgerGroup: "Sundry Debtors" }],
    });

    if (!debtors) {
      res.status(404).json({ success: true, data: "No debtors are found" });
    }

    res.status(200).json({
      success: true,
      data: debtors,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDebitEntry(req, res, next) {
  const { firmId, clientId } = { ...req.params }

  try {
    const firm = await Firm.findById(firmId);
    const client = await Ledger.findOne({ _id: clientId, ledgerGroup: "Sundry Debtors" });

    if (!firm || !client) return next(new ErrorResponse("Please enter valid client ID and firm ID", 400));

    const debitEntry = await Debit.find({ firmId, clientId }).sort({ challanNumber: -1, challanDate: -1 });
    return res.status(200).json({
      success: true,
      entries: debitEntry
    })
  } catch (error) {
    console.log(error)
  }
}

export async function getCreditors(req, res, next) {
  try {
    const creditors = await Ledger.find({
      $and: [{ firmId: req.params.id, ledgerGroup: "Sundry Creditors" }],
    });

    if (!creditors) {
      res.status(404).json({ success: true, data: "No Creditors are found" });
    }

    res.status(200).json({
      success: true,
      data: creditors,
    });
  } catch (error) {
    next(error);
  }
}

export async function createChallan(req, res, next) {
  let { firmId, clientId, challanNumber, challanDate, products } = req.body;
  if (challanDate === "") {
    challanDate = new Date();
  }

  // get the last challan date and throw error if date conflict
  const last = await Challan.find({ firmId });
  if (last.length > 0) {
    const lastDate = last[last.length - 1].challanDate;
    if (new Date(challanDate) < lastDate) return next(new ErrorResponse("Date conflict", 400));
  }

  const challan = new Challan({
    firmId,
    clientId,
    challanNumber,
    challanDate,
    products,
  });
  try {
    const data = await challan.save();
    // after successfully creating challan make debit entry
    const prices = products.map(p => Number(p.rate) * Number(p.quantity));
    const totalPrice = prices.reduce((sum, num) => sum + num, 0);
    const debitEntry = new Debit({ firmId, clientId, challanNumber: challan.challanNumber, challanDate, amount: totalPrice });
    await debitEntry.save();
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function editChallan(req, res, next) {
  const { challanId, firmId, clientId, challanNumber, challanDate, products } = req.body;

  try {
    const filter = { _id: challanId };
    const update = { clientId: clientId, challanDate, products, edit: true };
    const updatedChallan = await Challan.findOneAndUpdate(filter, update);
    await updatedChallan.save();

    const filterDebit = { firmId, challanNumber: updatedChallan.challanNumber };
    const prices = products.map(p => Number(p.rate) * Number(p.quantity));
    const totalPrice = prices.reduce((sum, num) => sum + num, 0);
    const updateDebit = { firmId, clientId, challanNumber, challanDate, amount: totalPrice }
    const debitEntry = await Debit.findOneAndUpdate(filterDebit, updateDebit);
    await debitEntry.save();
    return res.status(201).json({ success: true, message: "Challan Updated Successfully" });
  } catch (error) {
    next(error);
  }
}

async function challanDetail(challanId) {
  const challan = await Challan.findById(challanId)
    .populate({ path: "firmId", select: "companyName address -_id" })
    .populate({ path: "clientId", select: "companyName address _id" })
    .populate({
      path: "products.productId",
      select: "productName openingRate saleRate unit _id",
    });

  return challan;
}

export async function getChallanDetail(req, res, next) {
  const { challanId } = req.params;

  if (!challanId) return next(new ErrorResponse("Please enter challanId and FirmId"));

  if (!mongoose.Types.ObjectId.isValid(challanId))
    return next(new ErrorResponse("Please enter valid challan and firm ID", 400));

  const challan = await challanDetail(challanId);

  if (!challan) return next(new ErrorResponse("Requested challan not available", 404));

  return res.status(200).json({
    success: true,
    challan
  })
}

export async function deleteChallan(req, res, next) {
  const { challanId } = req.params;
  // first delete the debit entry based on the challan
  const challan = await Challan.findById(challanId);
  const firmId = challan.firmId;
  const clientId = challan.clientId;
  const challanNumber = challan.challanNumber;
  try {
    const debit = await Debit.findOne({ firmId, clientId, challanNumber });
    await debit.delete();
    await challan.delete();
    return res.status(200).json({ success: true, message: "delete successfully" });
  } catch (error) {
    return next(new ErrorResponse("Could not delete challan", 500));
  }
}

export async function getChallanDetails(req, res, next) {
  const { challanId } = req.params;
  try {
    const challan = await challanDetail(challanId);
    if (!challan) {
      return next(new ErrorResponse("Not Found", 404));
    }
    // res.status(200).json({
    //   success: true,
    //   data: challan,
    // });
    return createPDF(challan, req, res, next);
    // const name = challan.clientId.companyName.split(" ").map(word => word[0]).join("");

  } catch (error) {
    next(error);
  }
}

export async function getAllChallans(req, res, _next) {
  const { firmId } = req.params;
  const data = await Challan.find({ firmId })
    .populate({
      path: "clientId",
      select: "companyName address -_id",
    })
    .sort([["createdAt", -1]]);
  if (!data) {
    return res.status(404).json({
      success: true,
      message: "No Challans found.",
    });
  }
  return res.status(200).json({
    success: true,
    data: data,
  });
}

export async function addCreditEntry(req, res, next) {
  const { firmId, clientId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(firmId) || !mongoose.Types.ObjectId.isValid(clientId)) {
    return next(new ErrorResponse("Please enter valid firm ID and Client ID.", 400));
  }

  const isValid = await Ledger.findById(clientId) && await Firm.findById(firmId);
  if (!isValid) {
    return next(new ErrorResponse("Given client ID does not exist", 400));
  }

  try {
    const entry = new Credit({ ...req.body });
    await entry.save();
    return res.status(200).json({
      success: true,
      msg: "Entry saved successfully!",
      entry
    })

  } catch (error) {
    return next(new ErrorResponse(error), 500);
  }

}

export async function getStatement(req, res, next) {
  const { firmId, clientId } = req.params;
  const { from, to } = req.query;

  if (!from || !to) return next(new ErrorResponse("Please enter date range"))

  const isValid = await Ledger.findById(clientId) && await Firm.findById(firmId);
  if (!isValid) {
    return next(new ErrorResponse("Given client ID does not exist", 400));
  }

  try {
    const debits = await Debit.find({ firmId, clientId, challanDate: { $gte: from, $lte: to } });
    const credits = await Credit.find({ firmId, clientId, date: { $gte: from, $lte: to } });
    const statement = [...debits, ...credits];
    statement.sort();

    return res.status(200).json({
      success: true,
      statement
    })

  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
}
