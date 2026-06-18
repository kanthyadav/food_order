const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRestaurantRequests,
  approveRestaurantRequest,
  rejectRestaurantRequest
} = require("../controllers/adminController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);

router.get(
  "/restaurant-requests",
  authMiddleware,
  adminMiddleware,
  getRestaurantRequests
);

router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveRestaurantRequest
);

router.put(
  "/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectRestaurantRequest
);

module.exports = router;