const mongoose = require("mongoose");

const ColdStorageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    size: { type: String, required: true },
    photo: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ColdStorage", ColdStorageSchema);
