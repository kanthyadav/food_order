import React from "react";

function FoodCard({ food, addToCart }) {
  return (
    <div className="food-card">
      <img
        className="food-image"
        src={food.image}
        alt={food.name}
      />

      <div className="food-content">
        <h3 className="food-name">
          {food.name}
        </h3>

        <p className="food-price">
          ₹{food.price}
        </p>

        <button
          className="food-btn"
          onClick={() => addToCart(food)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;