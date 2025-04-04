const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addPlant,
  getPlants,
  updatePlant,
  deletePlant,
} = require("../controllers/plantController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/add", upload("plants").single("image"), addPlant);
router.put(
  "/update/:id",
  verifyToken,
  upload("plants").single("image"),
  updatePlant
);
router.delete("/delete/:id", verifyToken, deletePlant);
router.get("/", getPlants);

module.exports = router;
