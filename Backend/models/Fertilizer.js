const mongoose = require("mongoose");

const FertilizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
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
  price: {
    type: String,
    required: true,
  },
});

const Fertilizer = mongoose.model("Fertilizer", FertilizerSchema);
module.exports = Fertilizer;
