const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ph: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Soil", soilSchema);
