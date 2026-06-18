const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String
  },

  category: {
    type: String
  },

  isVeg: {
    type: Boolean,
    default: true
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Food", foodSchema);