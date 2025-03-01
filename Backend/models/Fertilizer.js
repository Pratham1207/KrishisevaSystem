const mongoose = require("mongoose");

const FertilizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ["kg", "g", "ton", "lb"],
    default: "kg",
  },
});

const Fertilizer = mongoose.model("Fertilizer", FertilizerSchema);
module.exports = Fertilizer;
