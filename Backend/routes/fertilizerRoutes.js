const express = require("express");
const {
  addFertilizer,
  getFertilizers,
  updateFertilizer,
  deleteFertilizer,
} = require("../controllers/fertilizerController");

const router = express.Router();

router.post("/add", addFertilizer);
router.get("/", getFertilizers);
router.put("/update/:id", updateFertilizer);
router.delete("/delete/:id", deleteFertilizer);

module.exports = router;
