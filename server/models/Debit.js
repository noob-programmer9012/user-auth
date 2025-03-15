/* 
Requirements
  firmId - required
  ClientId - required
  challanNo - required
  challanDate - required
  Amount - required
*/

import mongoose from "mongoose";

const debitSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Types.ObjectId,
    ref: "Firm",
    required: ["true", "Please enter firm id."],
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Ledger",
    required: ["true", "Please enter client id."],
  },
  challanNumber: {
    type: Number,
    required: [true, "Please provide challan Number."],
    match: ["^d+$", "Please provide valid challan number. e.g. 001"],
    minlength: 1,
    maxlength: 5
  },
  challanDate: {
    type: Date,
    default: new Date(),
  },
  amount: {
    type: Number,
    required: [true, "Please enter total amount."],
    match: ["^d+$", "Please provide valid amount. e.g. 10025.25"],
  }
})

const Debit = mongoose.model("Debit", debitSchema);

export default Debit;
