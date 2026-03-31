import React from "react";

function RestaurantCard({ restaurant }) {
  return (
    <div className="card">
      <img src={restaurant.image} alt={restaurant.name} />

      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0" }}>{restaurant.name}</h3>

        <p style={{ color: "gray", margin: "5px 0" }}>
          📍 {restaurant.location}
        </p>

        <p style={{ color: "green", fontWeight: "bold" }}>
          ⭐ 4.{Math.floor(Math.random() * 5)}
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;