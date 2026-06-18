const express = require("express");
const router = express.Router();

const {
  applyRestaurant,
  getRestaurantRequests,
  approveRestaurantRequest
} = require("../controllers/restaurantRequestController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Customer applies
router.post(
  "/apply-restaurant",
  authMiddleware,
  applyRestaurant
);

// Admin sees all requests
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getRestaurantRequests
);

// Admin approves request
router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveRestaurantRequest
);

module.exports = router;