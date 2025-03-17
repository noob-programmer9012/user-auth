import { Ledger } from "../models/Ledger.js";
import { Challan } from "../models/Challan.js";
import { Firm } from "../models/Firm.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { createPDF } from "../utils/createPDF.js";
import Debit from "../models/Debit.js";

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

export async function getChallanDetails(req, res, next) {
  const { challanId } = req.params;
  try {
    const challan = await Challan.findById(challanId)
      .populate({ path: "firmId", select: "companyName address -_id" })
      .populate({ path: "clientId", select: "companyName address -_id" })
      .populate({
        path: "products.productId",
        select: "productName openingRate saleRate unit -_id",
      });
    if (!challan) {
      return next(new ErrorResponse("Not Found", 404));
    }
    // res.status(200).json({
    //   success: true,
    //   data: challan,
    // });
    // console.log(challan);
    return createPDF(challan, req, res, next);
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
