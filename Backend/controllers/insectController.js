const Insect = require("../models/Insect");

const createInsect = async (req, res) => {
  try {
    const { name, pesticide } = req.body;
    const newInsect = new Insect({ name, pesticide });
    await newInsect.save();
    res.status(201).json(newInsect);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllInsects = async (req, res) => {
  try {
    const insects = await Insect.find();
    res.status(200).json(insects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateInsect = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Insect.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteInsect = async (req, res) => {
  try {
    const { id } = req.params;
    await Insect.findByIdAndDelete(id);
    res.status(200).json({ message: "Insect deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createInsect, getAllInsects, updateInsect, deleteInsect };
