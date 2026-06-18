const express = require("express");
const router = express.Router();

const {
  addFood,
  getFoods,
  getRestaurantFoods,
  deleteFood
} = require("../controllers/foodController");

// Add Food
router.post("/add", addFood);

// Get All Foods
router.get("/", getFoods);

// Get Restaurant Foods
router.get(
  "/restaurant/:restaurantId",
  getRestaurantFoods
);

// Delete Food
router.delete(
  "/:id",
  deleteFood
);

module.exports = router;