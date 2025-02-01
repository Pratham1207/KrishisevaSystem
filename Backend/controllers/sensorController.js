const moment = require("moment");
const SensorData = require("../models/sensorData");

// To store the Sensor Data
const receiveSensorData = async (req, res) => {
  try {
    const { temperature, humidity, soilMoisture, motion } = req.body;

    const newSensorData = new SensorData({
      temperature,
      humidity,
      soilMoisture,
      motion,
    });

    await newSensorData.save();
    console.log("Data saved:", newSensorData);

    res.status(200).send({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ message: "Error saving data" });
  }
};

// to get the sensor data
const sendSensorData = async (req, res) => {
  try {
    const datas = await SensorData.find().sort({ timestamp: -1 });

    const sensorData = datas.map((data) => ({
      temperature: data.temperature,
      humidity: data.humidity,
      soilMoisture: data.soilMoisture,
      motion: data.motion,
      timestamp: moment(data.timestamp).format("YYYY-MM-DD HH:mm:ss"),
    }));

    res.status(200).json(sensorData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ message: "Error retrieving data" });
  }
};

module.exports = { sendSensorData, receiveSensorData };
