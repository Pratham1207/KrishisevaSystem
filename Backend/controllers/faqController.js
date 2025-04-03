const FAQ = require("../models/FAQ");

// Create FAQ
const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const existing = await FAQ.findOne({ question });
    if (existing) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();

    res.status(201).json({ message: "FAQ added successfully", newFAQ });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all FAQs
const getFAQs = async (_req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update FAQ
const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await FAQ.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete FAQ
const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await FAQ.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ,
};
