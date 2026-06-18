const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware =
  require("../middleware/authMiddleware");

const restaurantOwnerMiddleware =
  require("../middleware/restaurantOwnerMiddleware");

// CUSTOMER CREATE ORDER
router.post(
  "/create",
  authMiddleware,
  createOrder
);

// RESTAURANT OWNER VIEW ORDERS
router.get(
  "/restaurant/:restaurantId",
  authMiddleware,
  restaurantOwnerMiddleware,
  getRestaurantOrders
);

// RESTAURANT OWNER UPDATE ORDER STATUS
router.put(
  "/status/:id",
  authMiddleware,
  restaurantOwnerMiddleware,
  updateOrderStatus
);

// CUSTOMER VIEW OWN ORDERS
router.get(
  "/:userId",
  authMiddleware,
  getUserOrders
);

module.exports = router;