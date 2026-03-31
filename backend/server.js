const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ FINAL CORS (ALLOW ALL — NO BLOCKING)
app.use(cors());

// ✅ BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// ✅ TEST
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});