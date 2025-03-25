const mongoose = require("mongoose");

const soilDataSchema = new mongoose.Schema({
  humidity: Number,
  temperature: Number,
  moisture: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SoilData", soilDataSchema);
