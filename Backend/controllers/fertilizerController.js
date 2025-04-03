const Fertilizer = require("../models/Fertilizer");

const addFertilizer = async (req, res) => {
  try {
    const { name, type, quantity, unit, price } = req.body;

    const existingFertilizer = await Fertilizer.findOne({ name });
    if (existingFertilizer) {
      return res.status(400).json({ message: "Fertilizer already exists" });
    }

    const newFertilizer = new Fertilizer({ name, type, quantity, unit, price });
    await newFertilizer.save();
    res
      .status(201)
      .json({ message: "Fertilizer added successfully", newFertilizer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find();
    res.status(200).json(fertilizers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateFertilizer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFertilizer = await Fertilizer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedFertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }

    res
      .status(200)
      .json({ message: "Fertilizer updated successfully", updatedFertilizer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteFertilizer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFertilizer = await Fertilizer.findByIdAndDelete(id);

    if (!deletedFertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }

    res.status(200).json({ message: "Fertilizer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addFertilizer,
  getFertilizers,
  updateFertilizer,
  deleteFertilizer,
};
