import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  Navigate,
} from "react-router-dom";

import axios from "axios";

import RestaurantCard from "../components/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    user?.role ===
    "restaurantOwner"
  ) {
    return (
      <Navigate
        to="/restaurant-dashboard"
      />
    );
  }

  if (
    user?.role === "admin"
  ) {
    return (
      <Navigate
        to="/admin"
      />
    );
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants =
    async () => {
      try {
        const res =
          await axios.get(
            "https://food-order-eyxp.onrender.com/api/restaurants"
          );

        setRestaurants(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const filtered =
    restaurants.filter(
      (restaurant) =>
        restaurant.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (
          restaurant.address ||
          ""
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>
          Restaurants 
        </h2>

        <input
          className="home-search"
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      <div className="restaurant-grid">
        {filtered.map(
          (
            restaurant
          ) => (
            <Link
              key={
                restaurant._id
              }
              to={`/restaurant/${restaurant._id}`}
              className="restaurant-link"
            >
              <RestaurantCard
                restaurant={
                  restaurant
                }
              />
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Home;