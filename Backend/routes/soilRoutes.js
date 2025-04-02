const express = require("express");
const router = express.Router();
const soilController = require("../controllers/soilController");

router.post("/add", soilController.createSoil);
router.get("/", soilController.getAllSoils);
router.put("/edit/:id", soilController.updateSoil);
router.delete("/delete/:id", soilController.deleteSoil);

module.exports = router;
