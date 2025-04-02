const express = require("express");
const router = express.Router();
const insectController = require("../controllers/insectController");

router.post("/add", insectController.createInsect);
router.get("/", insectController.getAllInsects);
router.put("/edit/:id", insectController.updateInsect);
router.delete("/delete/:id", insectController.deleteInsect);

module.exports = router;
