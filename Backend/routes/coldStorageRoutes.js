const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  addColdStorage,
  getColdStorages,
  updateColdStorage,
  deleteColdStorage,
} = require("../controllers/coldStorageController");

router.post(
  "/add",
  verifyToken,
  upload("coldstorages").single("photo"),
  addColdStorage
);
router.get("/", getColdStorages);
router.put(
  "/update/:id",
  verifyToken,
  upload("coldstorages").single("photo"),
  updateColdStorage
);
router.delete("/delete/:id", verifyToken, deleteColdStorage);

module.exports = router;
