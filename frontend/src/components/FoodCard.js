import React from "react";

function FoodCard({ food, addToCart }) {
  return (
    <div className="card">
      <img
        src={food.image}
        alt={food.name}
      />

      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0", fontSize: "18px" }}>
          {food.name}
        </h3>

        <p style={{ margin: "5px 0", fontWeight: "bold" }}>
          ₹{food.price}
        </p>

        <button
          onClick={() => addToCart(food)}
          style={{ width: "100%" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;