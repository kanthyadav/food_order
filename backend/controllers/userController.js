const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        msg: "All fields required"
      });
    }

    const userExists =
      await User.findOne({
        email
      });

    if (userExists) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer"
    });

    res.status(201).json({
      message:
        "User registered successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server error"
    });

  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(400).json({
        msg: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    let restaurantId = null;

    if (
      user.role ===
      "restaurantOwner"
    ) {

      const restaurant =
        await Restaurant.findOne({
          owner: user._id
        });

      console.log(
        "USER ID:",
        user._id
      );

      console.log(
        "FOUND RESTAURANT:",
        restaurant
      );

      if (restaurant) {
        restaurantId =
          restaurant._id.toString();
      }
    }

    res.json({
      token,
      restaurantId,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server error"
    });

  }
};

module.exports = {
  registerUser,
  loginUser
};