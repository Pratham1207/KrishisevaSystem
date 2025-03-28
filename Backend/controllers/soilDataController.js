const SoilData = require("../models/SoilData");
const sendAlertNotification = require("../utils/sendNotification");

const postSoilData = async (req, res) => {
  try {
    const { humidity, temperature, moisture } = req.body;
    const MOISTURE_THRESHOLD = 800;
    if (moisture > MOISTURE_THRESHOLD) {
      sendAlertNotification(
        "yashpancholi001@gmail.com",
        "+12268997572",
        moisture
      );
    }

    const data = new SoilData({ humidity, temperature, moisture });
    await data.save();
    res.status(200).json({ message: "Soil data saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving soil data", error: err });
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

module.exports = { postSoilData, getLatestSoilData, getAllSoilData };
