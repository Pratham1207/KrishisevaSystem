const SoilData = require("../models/SoilData");
const sendAlertNotification = require("../utils/sendNotification");

const postSoilData = async (req, res) => {
  try {
    const { humidity, temperature, moisture } = req.body;
    const MOISTURE_THRESHOLD = 700;
    if (moisture > MOISTURE_THRESHOLD) {
      sendAlertNotification(
        "yashpancholi001@gmail.com",
        "+13828850314",
        moisture
      );
    }

    const data = new SoilData({
      humidity,
      temperature,
      moisture,
      createdBy: "67e43d91d32e12a5ecdd8630",
    });
    await data.save();
    res.status(200).json({ message: "Soil data saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving soil data", error: err });
  }
};

const getSOilDataForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await SoilData.find({ createdBy: userId }).sort({
      timestamp: -1,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getLatestSoilData = async (req, res) => {
  try {
    const latestData = await SoilData.findOne().sort({ timestamp: -1 });
    res.status(200).json(latestData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching latest soil data", error: err });
  }
};

const getAllSoilData = async (req, res) => {
  try {
    const allData = await SoilData.find().sort({ timestamp: -1 });
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching soil data", error: err });
  }
};

module.exports = {
  postSoilData,
  getLatestSoilData,
  getAllSoilData,
  getSOilDataForUser,
};
