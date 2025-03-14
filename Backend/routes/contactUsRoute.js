const express = require("express");
const {
  createResponse,
  getResponses,
  deleteResponses,
} = require("../controllers/contactUsController");

const router = express.Router();

router.post("/", createResponse);
router.get("/", getResponses);
router.delete("/:id", deleteResponses);

module.exports = router;
