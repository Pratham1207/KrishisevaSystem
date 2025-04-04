const ColdStorage = require("../models/ColdStorage");

const addColdStorage = async (req, res) => {
  try {
    const { name, description, contact, address, size } = req.body;
    const photo = req.file?.filename;

    if (!photo) return res.status(400).json({ message: "Photo is required" });

    const newStorage = new ColdStorage({
      name,
      description,
      contact,
      address,
      size,
      photo: `/uploads/${photo}`,
      createdBy: req.userId,
    });

    await newStorage.save();
    res.status(201).json({ message: "Cold storage added", data: newStorage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getColdStorages = async (req, res) => {
  try {
    const query = req.userId ? { createdBy: req.userId } : {};
    const storages = await ColdStorage.find(query).populate(
      "createdBy",
      "name email"
    );
    res.json(storages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateColdStorage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.photo = `/uploads/${req.file.filename}`;
    }

    const updated = await ColdStorage.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteColdStorage = async (req, res) => {
  try {
    const { id } = req.params;
    await ColdStorage.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addColdStorage,
  getColdStorages,
  updateColdStorage,
  deleteColdStorage,
};
