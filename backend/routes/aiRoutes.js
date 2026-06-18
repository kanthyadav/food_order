const express = require("express");
const router = express.Router();

const {
  generateRestaurants,
  foodAssistant
} = require("../controllers/aiController");

const authMiddleware =
  require("../middleware/authMiddleware");

// AI Restaurant Generator
router.post(
  "/generate-restaurants",
  authMiddleware,
  generateRestaurants
);

// AI Food Assistant
router.post(
  "/food-assistant",
  authMiddleware,
  foodAssistant
);

module.exports = router;