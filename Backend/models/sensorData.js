const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  soilMoisture: { type: Number, required: true },
  motion: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);

module.exports = SensorData;
