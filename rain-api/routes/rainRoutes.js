// routes/rainRoutes.js
const express = require("express");
const {
  addRain,
  getRainData,
  getAllRainData,
  updateRain,
  deleteRain,
} = require("../controllers/rainController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, addRain);
router.get("/", auth, getRainData);
router.get("/admin/all", auth, getAllRainData);

// ✅ NEW: update and delete routes
router.put("/:id", auth, updateRain);
router.delete("/:id", auth, deleteRain);

module.exports = router;