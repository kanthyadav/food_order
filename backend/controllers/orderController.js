const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {

    if (
      req.user.role !== "customer"
    ) {
      return res.status(403).json({
        message:
          "Only customers can place orders"
      });
    }

    const {
      user,
      restaurant,
      items,
      totalPrice
    } = req.body;

    const order = new Order({
      user,
      restaurant,
      items,
      totalPrice,
      status: "PLACED",
      statusMessage:
        "Order Placed Successfully"
    });

    await order.save();

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.params.userId
    })
      .populate("items.food")
      .populate("restaurant");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// GET RESTAURANT ORDERS
const getRestaurantOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      restaurant: req.params.restaurantId
    })
      .populate("user", "name email")
      .populate("items.food");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {

    const {
      status,
      statusMessage
    } = req.body;

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status,
          statusMessage
        },
        {
          new: true
        }
      );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus
};