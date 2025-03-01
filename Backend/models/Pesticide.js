const mongoose = require("mongoose");

const PesticideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dose: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Pesticide = mongoose.model("Pesticide", PesticideSchema);
module.exports = Pesticide;
