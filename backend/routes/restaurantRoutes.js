const express = require("express");
const router = express.Router();

const {
  addRestaurant,
  getRestaurants
} = require("../controllers/restaurantController");

// Add Restaurant
router.post("/add", addRestaurant);

// Get All Restaurants
router.get("/", getRestaurants);

module.exports = router;