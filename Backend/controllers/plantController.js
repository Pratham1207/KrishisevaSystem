const Plant = require("../models/Plant");
const path = require("path");
const fs = require("fs");

const addPlant = async (req, res) => {
  try {
    const {
      name,
      description,
      season,
      distance,
      fertilizer,
      fertilizerTime,
      temperature,
      soil,
      pesticide,
      pesticideDose,
      growthTime,
      warm,
    } = req.body;

    const image = req.file?.filename;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const plant = new Plant({
      name,
      description,
      image: `/uploads/plants/${image}`,
      season,
      distance,
      fertilizer,
      fertilizerTime,
      temperature,
      soil,
      pesticide,
      pesticideDose,
      growthTime,
      warm,
    });

    await plant.save();
    res.status(201).json({ message: "Plant added successfully", plant });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find()
      .populate("fertilizer", "name")
      .populate("soil", "name")
      .populate("pesticide", "name")
      .populate("warm", "name");
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingPlant = await Plant.findById(id);
    if (!existingPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    if (req.file) {
      const newImagePath = `/uploads/plants/${req.file.filename}`;
      updates.image = newImagePath;

      const oldImagePath = existingPlant.image?.startsWith("/")
        ? existingPlant.image.slice(1)
        : existingPlant.image;
      const fullPath = path.join(__dirname, "..", oldImagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    const updatedPlant = await Plant.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json({ message: "Plant updated successfully", plant: updatedPlant });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findByIdAndDelete(id);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    if (plant.image) {
      const fullPath = path.join(__dirname, "..", plant.image);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    res.json({ message: "Plant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addPlant,
  getPlants,
  updatePlant,
  deletePlant,
};
