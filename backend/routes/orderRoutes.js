const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;

    const order = new Order({
      user,
      items,
      totalPrice
    });

    await order.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.food");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;