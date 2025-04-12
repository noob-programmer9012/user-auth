/* 
Requirements
  firmId - required
  ClientId - required
  Amount - required
  paymentType - required
  Date - required
  againstChallanNo
*/

import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Types.ObjectId,
    ref: "Firm",
    required: [true, "Please enter firm id."],
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Ledger",
    required: [true, "Please enter client id."],
  },
  againstChallanNumber: {
    type: Number,
    match: ["^d+$", "Please provide valid challan number. e.g. 001"],
    minlength: 1,
    maxlength: 5
  },
  date: {
    type: Date,
    default: new Date(),
    required: [true, "Please enter date."]
  },
  amount: {
    type: Number,
    required: [true, "Please enter total amount."],
    match: ["^d+$", "Please provide valid amount. e.g. 10025.25"],
  },
  paymentType: {
    type: String,
    enum: {
      values: ['UPI', 'CASH', 'SALES RETURN', 'ANGADIYA', 'NEFT/RTGS/IMPS'],
      message: "Please enter valid payment type."
    },
    required: [true, "Please enter payment type."]
  }
})

const Credit = mongoose.model("Credit", creditSchema);

export default Credit;
