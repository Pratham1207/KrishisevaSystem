const Soil = require("../models/Soil");

const createSoil = async (req, res) => {
  try {
    const { name, ph, description } = req.body;
    const newSoil = new Soil({ name, ph, description });
    await newSoil.save();
    res.status(201).json(newSoil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSoils = async (req, res) => {
  try {
    const soils = await Soil.find();
    res.status(200).json(soils);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSoil = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSoil = await Soil.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedSoil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSoil = async (req, res) => {
  try {
    const { id } = req.params;
    await Soil.findByIdAndDelete(id);
    res.status(200).json({ message: "Soil data deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSoil, getAllSoils, updateSoil, deleteSoil };
