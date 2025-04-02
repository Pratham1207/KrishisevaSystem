const mongoose = require("mongoose");

const insectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pesticide: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insect", insectSchema);
