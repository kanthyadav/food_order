import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurants");
      setRestaurants(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addRestaurant = async () => {
    try {
      await axios.post("http://localhost:5000/api/restaurants/add", {
        name,
        location,
        image: "https://via.placeholder.com/200"
      });

      alert("Restaurant Added ✅");
      setName("");
      setLocation("");
      fetchRestaurants();
    } catch (error) {
      alert("Error ❌");
    }
  };

  const addFood = async () => {
    try {
      await axios.post("http://localhost:5000/api/foods/add", {
        name: foodName,
        price,
        image: "https://via.placeholder.com/200",
        restaurant: restaurantId
      });

      alert("Food Added ✅");
      setFoodName("");
      setPrice("");
    } catch (error) {
      alert("Error ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel 👨‍💻</h2>

      {/* Add Restaurant */}
      <div style={{
        background: "white",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px"
      }}>
        <h3>Add Restaurant</h3>

        <input
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button style={{ width: "100%" }} onClick={addRestaurant}>
          Add Restaurant
        </button>
      </div>

      {/* Add Food */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px"
      }}>
        <h3>Add Food</h3>

        <input
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <input
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((res) => (
            <option key={res._id} value={res._id}>
              {res.name}
            </option>
          ))}
        </select>

        <button style={{ width: "100%" }} onClick={addFood}>
          Add Food
        </button>
      </div>
    </div>
  );
}

export default Admin;