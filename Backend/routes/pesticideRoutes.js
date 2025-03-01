const express = require("express");
const {
  addPesticide,
  getPesticides,
  updatePesticide,
  deletePesticide,
} = require("../controllers/pesticideController");

const router = express.Router();

router.post("/add", addPesticide);
router.get("/", getPesticides);
router.put("/update/:id", updatePesticide);
router.delete("/delete/:id", deletePesticide);

module.exports = router;
