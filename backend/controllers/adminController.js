const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const RestaurantRequest = require("../models/RestaurantRequest");

const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const restaurants = await Restaurant.countDocuments();
    const orders = await Order.countDocuments();

    res.json({
      users,
      restaurants,
      orders
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getRestaurantRequests = async (req, res) => {
  try {

    const requests =
      await RestaurantRequest.find()
      .populate("user", "name email");

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

const approveRestaurantRequest = async (req, res) => {
  try {

    const request =
      await RestaurantRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    const existingRestaurant =
      await Restaurant.findOne({
        name: request.restaurantName
      });

    if (!existingRestaurant) {

      await Restaurant.create({
        name: request.restaurantName,
        address: request.address,
        description: request.description,
        owner: request.user,
        image:
          "https://via.placeholder.com/300"
      });

    }

    request.status = "approved";
    await request.save();

    await User.findByIdAndUpdate(
      request.user,
      {
        role: "restaurantOwner"
      }
    );

    res.json({
      success: true,
      message:
        "Restaurant Owner Approved Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

const rejectRestaurantRequest = async (req, res) => {
  try {

    const request =
      await RestaurantRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = "rejected";

    await request.save();

    res.json({
      success: true,
      message:
        "Restaurant Request Rejected"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

module.exports = {
  getDashboardStats,
  getRestaurantRequests,
  approveRestaurantRequest,
  rejectRestaurantRequest
};
