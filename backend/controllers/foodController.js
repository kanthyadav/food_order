const Food = require("../models/Food");

// ADD FOOD
const addFood = async (req, res) => {
  try {

    const {
      name,
      price,
      image,
      category,
      isVeg,
      restaurant
    } = req.body;

    const food = new Food({
      name,
      price,
      image,
      category,
      isVeg,
      restaurant
    });

    await food.save();

    res.status(201).json(food);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};

// GET ALL FOODS
const getFoods = async (req, res) => {
  try {

    const foods = await Food.find()
      .populate("restaurant");

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// GET RESTAURANT FOODS
const getRestaurantFoods = async (req, res) => {
  try {

    const foods = await Food.find({
      restaurant:
        req.params.restaurantId
    });

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// DELETE FOOD
const deleteFood = async (req, res) => {
  try {

    await Food.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Food Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  addFood,
  getFoods,
  getRestaurantFoods,
  deleteFood
};
