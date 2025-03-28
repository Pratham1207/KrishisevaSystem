const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", verifyToken, getProfile);
router.put("/profile/:id", verifyToken, updateProfile);

module.exports = router;
