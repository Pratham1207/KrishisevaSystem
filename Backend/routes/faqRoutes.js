const express = require("express");
const {
  addFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

const router = express.Router();

router.post("/add", addFAQ);
router.get("/", getFAQs);
router.put("/update/:id", updateFAQ);
router.delete("/delete/:id", deleteFAQ);

module.exports = router;
