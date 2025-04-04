const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    season: { type: String },
    distance: { type: String },
    temperature: { type: String },

    fertilizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fertilizer",
    },
    fertilizerTime: { type: String },

    pesticide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pesticide",
    },
    pesticideDose: { type: String },

    soil: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Soil",
    },

    warm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Insect",
    },

    growthTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", PlantSchema);
