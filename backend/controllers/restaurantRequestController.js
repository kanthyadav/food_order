const RestaurantRequest = require("../models/RestaurantRequest");
const User = require("../models/User");

// APPLY
const applyRestaurant = async (req, res) => {
  try {
    const {
      user,
      restaurantName,
      address,
      description
    } = req.body;

    const request = await RestaurantRequest.create({
      user,
      restaurantName,
      address,
      description
    });

    res.status(201).json(request);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL REQUESTS (ADMIN)
const getRestaurantRequests = async (req, res) => {
  try {

    const requests = await RestaurantRequest.find()
      .populate("user", "name email role");

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// APPROVE REQUEST (ADMIN)
const approveRestaurantRequest = async (req, res) => {
  try {

    const request = await RestaurantRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
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
      message: "Restaurant request approved"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  applyRestaurant,
  getRestaurantRequests,
  approveRestaurantRequest
};