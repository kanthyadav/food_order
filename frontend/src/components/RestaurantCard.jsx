import React from "react";

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img
        className="restaurant-image"
        src={restaurant.image}
        alt={restaurant.name}
      />

      <div className="restaurant-content">
        <h3 className="restaurant-name">
          {restaurant.name}
        </h3>

        <p className="restaurant-address">
          {restaurant.address}
        </p>

        <p className="restaurant-rating">
          {restaurant.rating || 4.5}
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;