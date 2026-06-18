const Restaurant = require("../models/Restaurant");

// ADD RESTAURANT
const addRestaurant = async (req, res) => {
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
    res.status(500).json({
      error: error.message
    });
  }
};

// GET ALL RESTAURANTS
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.json(restaurants);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  addRestaurant,
  getRestaurants
};