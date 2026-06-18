import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";

function FoodPage() {
  const { id } = useParams();

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchFoods();
  }, [id]);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        "https://food-order-eyxp.onrender.com/api/foods"
      );

      const restaurantFoods = res.data.filter(
        (food) =>
          food.restaurant &&
          food.restaurant._id === id
      );

      setFoods(restaurantFoods);

    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (food) => {

    if (
      user?.role ===
      "restaurantOwner"
    ) {
      alert(
        "Restaurant Owners cannot place orders"
      );
      return;
    }

    setCart((prevCart) => [...prevCart, food]);

    alert(`${food.name} added to cart`);
  };

  const placeOrder = async () => {
    try {

      if (
        user?.role ===
        "restaurantOwner"
      ) {
        alert(
          "Restaurant Owners cannot place orders"
        );
        return;
      }

      const token =
        localStorage.getItem("token");

      const items = cart.map((item) => ({
        food: item._id,
        quantity: 1
      }));

      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price,
        0
      );

      await axios.post(
        "https://food-order-eyxp.onrender.com/api/orders/create",
        {
          user: user.id,
          restaurant: id,
          items,
          totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(
        "Order Placed Successfully ✅"
      );

      setCart([]);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Order Failed ❌"
      );

    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h2>Food Items 🍔</h2>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {user?.role === "customer" && (
        <h3>
          Cart Items: {cart.length}
        </h3>
      )}

      <div className="grid">
        {filteredFoods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            addToCart={addToCart}
          />
        ))}
      </div>

      {user?.role === "customer" &&
        cart.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #ccc"
            }}
          >
            <h3>Cart 🛒</h3>

            {cart.map((item, index) => (
              <p key={index}>
                {item.name} - ₹{item.price}
              </p>
            ))}

            <h4>
              Total: ₹
              {cart.reduce(
                (sum, item) =>
                  sum + item.price,
                0
              )}
            </h4>

            <button onClick={placeOrder}>
              Place Order
            </button>

          </div>
      )}

    </div>
  );
}

export default FoodPage;