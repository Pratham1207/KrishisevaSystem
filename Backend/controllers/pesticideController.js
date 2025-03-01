const Pesticide = require("../models/Pesticide");

const addPesticide = async (req, res) => {
  try {
    const { name, dose, description } = req.body;

    const existingPesticide = await Pesticide.findOne({ name });
    if (existingPesticide) {
      return res.status(400).json({ message: "Pesticide already exists" });
    }

    const newPesticide = new Pesticide({ name, dose, description });
    await newPesticide.save();
    res
      .status(201)
      .json({ message: "Pesticide added successfully", newPesticide });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPesticides = async (req, res) => {
  try {
    const pesticides = await Pesticide.find();
    res.status(200).json(pesticides);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePesticide = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPesticide = await Pesticide.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPesticide) {
      return res.status(404).json({ message: "Pesticide not found" });
    }

    res
      .status(200)
      .json({ message: "Pesticide updated successfully", updatedPesticide });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePesticide = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPesticide = await Pesticide.findByIdAndDelete(id);

    if (!deletedPesticide) {
      return res.status(404).json({ message: "Pesticide not found" });
    }

    res.status(200).json({ message: "Pesticide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addPesticide,
  getPesticides,
  updatePesticide,
  deletePesticide,
};
