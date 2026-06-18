const mongoose = require("mongoose");

const restaurantRequestSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  restaurantName: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "RestaurantRequest",
  restaurantRequestSchema
);