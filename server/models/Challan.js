import mongoose from "mongoose";

const ChallanSchema = new mongoose.Schema({
  firmId: {
    type: mongoose.Types.ObjectId,
    ref: "Firm",
    required: [true, "Please provide firm details."],
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Ledger",
    required: [true, "Please provide client id."],
  },
  challanNumber: {
    type: Number,
    required: [true, "Please provide challan Number."],
    match: ["^d+$", "Please provide valid challan number. e.g. 001"],
    minlength: 1,
    maxlength: 4,
    unique: true,
  },
  challanDate: {
    type: Date,
    default: new Date(),
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide product id."],
      },
      quantity: {
        type: Number,
        required: [true, "Please enter qunatity."],
        match: ["^d+$", "Please input only numbers."],
      },
      rate: {
        type: Number,
        required: [true, "Please enter product price."],
        match: [
          "^[1-9]d*(.d+)?$",
          "Opening rate field accepts natural numbers and decimals only.",
        ],
      },
    },
  ],
});

export const Challan = mongoose.model("Challan", ChallanSchema);
