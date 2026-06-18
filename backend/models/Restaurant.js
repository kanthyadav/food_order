const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  address: {
    type: String,
    required: true
  },

  image: {
    type: String
  },

  rating: {
    type: Number,
    default: 0
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Restaurant",
  restaurantSchema
);