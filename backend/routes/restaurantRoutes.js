const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// ADD RESTAURANT
router.post("/add", async (req, res) => {
  try {
    const { name, location, image } = req.body;

    const restaurant = new Restaurant({
      name,
      location,
      image
    });

    await restaurant.save();

    res.status(201).json(restaurant);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL RESTAURANTS
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;