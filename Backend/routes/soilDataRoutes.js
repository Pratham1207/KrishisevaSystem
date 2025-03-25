const express = require("express");
const router = express.Router();
const soilDataController = require("../controllers/soilDataController");

router.post("/", soilDataController.postSoilData);
router.get("/all", soilDataController.getAllSoilData);
router.get("/latest", soilDataController.getLatestSoilData);

module.exports = router;
