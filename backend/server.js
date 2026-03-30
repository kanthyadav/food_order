const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// models
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");

// 🔥 ADD DUMMY DATA (FORCE ADD)
mongoose.connection.once("open", async () => {
  try {
    console.log("Checking data...");

    // CLEAR OLD DATA (important)
    await Restaurant.deleteMany({});
    await Food.deleteMany({});

    const restaurants = await Restaurant.insertMany([
      {
        name: "KFC",
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086"
      },
      {
        name: "Dominos",
        location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65"
      },
      {
        name: "Burger King",
        location: "Delhi",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
      }
    ]);

    await Food.insertMany([
      {
        name: "Chicken Burger",
        price: 150,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        restaurant: restaurants[0]._id
      },
      {
        name: "Pizza",
        price: 300,
        image: "https://images.unsplash.com/photo-1601924582975-7e3d57d47c0f",
        restaurant: restaurants[1]._id
      },
      {
        name: "Veg Burger",
        price: 120,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        restaurant: restaurants[2]._id
      }
    ]);

    console.log("✅ Fresh data inserted");

  } catch (error) {
    console.log(error);
  }
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});