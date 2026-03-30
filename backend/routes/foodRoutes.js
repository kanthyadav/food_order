const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// ADD FOOD
router.post("/add", async (req, res) => {
  try {
    const { name, price, image, restaurant } = req.body;

    const food = new Food({
      name,
      price,
      image,
      restaurant
    });

    await food.save();

    res.status(201).json(food);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL FOOD
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().populate("restaurant");
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;