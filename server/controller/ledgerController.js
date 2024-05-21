import { Ledger } from "../models/Ledger.js";
import { Challan } from "../models/Challan.js";
import { Firm } from "../models/Firm.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { createPDF } from "../utils/createPDF.js";

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
  const challan = new Challan({
    firmId,
    clientId,
    challanNumber,
    challanDate,
    products,
  });
  try {
    const data = await challan.save();
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
      return next(new ErrorResponse(404, "Not Found"));
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

export async function getAllChallans(req, res, next) {
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
