// controllers/rainController.js
const Rain = require("../models/Rain");

const addRain = async (req, res) => {
  const { amount, unit } = req.body;
  try {
    const newEntry = await Rain.create({
      user: req.user.userId,
      amount,
      unit,
      timestamp: new Date(),
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRainData = async (req, res) => {
  try {
    const data = await Rain.find({ user: req.user.userId }).sort({
      timestamp: -1,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRainData = async (req, res) => {
  try {
    const data = await Rain.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE rain entry
const updateRain = async (req, res) => {
  const { amount, unit } = req.body;
  try {
    const updated = await Rain.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { amount, unit },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE rain entry
const deleteRain = async (req, res) => {
  try {
    const deleted = await Rain.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addRain,
  getRainData,
  getAllRainData,
  updateRain,
  deleteRain,
};