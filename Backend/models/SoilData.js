const mongoose = require("mongoose");

const soilDataSchema = new mongoose.Schema({
  humidity: Number,
  temperature: Number,
  moisture: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SoilData", soilDataSchema);
