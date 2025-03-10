import mongoose from "mongoose";

const ChallanSchema = new mongoose.Schema(
  {
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
      match: ["^d+$", "Please provide valid challan number. e.g. 001"],
      minlength: 1,
      maxlength: 4,
      default: null,
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
  },
  { timestamps: true }
);

ChallanSchema.pre("save", async function(next) {
  this.challanDate = this.challanDate
    ? Date.parse(this.challanDate)
    : new Date();
  const last = await Challan.findOne(
    { firmId: this.firmId },
    {},
    { sort: { createdAt: -1 } }
  );

  if (!last) {
    this.challanNumber = 1;
    return next();
  }

  if (this.challanDate.getDate() >= 1 && this.challanDate.getMonth() + 1 >= 4) {
    if (last.challanNumber < 2 && last.challanDate.getMonth() + 1 < 4) {
      this.challanNumber = 1;
    } else if (
      last.challanDate.getFullYear() < this.challanDate.getFullYear() &&
      this.challanDate.getMonth() + 1 > 3
    ) {
      this.challanNumber = 1;
    } else {
      this.challanNumber = last.challanNumber + 1;
    }
  } else {
    this.challanNumber = last.challanNumber + 1;
  }

  next();
});

const Challan = mongoose.model("Challan", ChallanSchema);

export { Challan };
