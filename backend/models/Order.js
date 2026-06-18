const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  },

  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
      },

      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: [
      "PLACED",
      "ACCEPTED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED"
    ],
    default: "PLACED"
  },

  statusMessage: {
    type: String,
    default: "Order Placed Successfully"
  },

  estimatedTime: {
    type: Number,
    default: 20
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);