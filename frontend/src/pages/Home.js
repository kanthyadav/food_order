import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

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

  const filtered = restaurants.filter((res) =>
    res.name.toLowerCase().includes(search.toLowerCase()) ||
    res.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Restaurants 🍽️</h2>

      <input
        type="text"
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((res) => (
          <Link
            key={res._id}
            to={`/restaurant/${res._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <RestaurantCard restaurant={res} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;