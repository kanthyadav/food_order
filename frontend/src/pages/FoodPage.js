import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchFoods();
  }, [id]);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");

      const filtered = res.data.filter(
        (food) => food.restaurant && food.restaurant._id === id
      );

      setFoods(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add to cart with quantity
  const addToCart = (food) => {
    const existing = cart.find((item) => item._id === food._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }

    setShowCart(true);
  };

  // ➕ increase
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ decrease
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 💰 total
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 📦 order
  const placeOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const items = cart.map((item) => ({
        food: item._id,
        quantity: item.quantity
      }));

      await axios.post("http://localhost:5000/api/orders/create", {
        user: userId,
        items,
        totalPrice
      });

      alert("Order Placed ✅");
      setCart([]);
      setShowCart(false);
    } catch (error) {
      alert("Order Failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Food Items 🍔</h2>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div className="grid">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} addToCart={addToCart} />
        ))}
      </div>

      {/* 🛒 OPEN BUTTON */}
      <button
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => setShowCart(true)}
      >
        Cart 🛒 ({cart.length})
      </button>

      {/* 🛒 SIDEBAR */}
      <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={() => setShowCart(false)}>X</button>
        </div>

        {cart.length === 0 ? (
          <p>No items</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} style={{ marginBottom: "15px" }}>
                <p>{item.name}</p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}

            <h3>Total: ₹{totalPrice}</h3>

            <button onClick={placeOrder}>Place Order</button>
          </>
        )}
      </div>
    </div>
  );
}

export default FoodPage;