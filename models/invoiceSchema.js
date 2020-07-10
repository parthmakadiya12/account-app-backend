import mongoose from "mongoose";

const InvoiceSchema = mongoose.Schema(
  {
    username: { type: String, unique: false, required: true },
    type: { type: String, unique: false, required: true },
    amount: { type: String, unique: false, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("invoice", InvoiceSchema);
