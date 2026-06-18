import React, { useEffect, useState } from "react";
import axios from "axios";

function RestaurantDashboard() {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState({});
  const [foods, setFoods] = useState([]);

  const [foodData, setFoodData] =
    useState({
      name: "",
      price: "",
      category: "",
      image: ""
    });

  const restaurantId =
    localStorage.getItem("restaurantId");

  useEffect(() => {
    fetchOrders();
    fetchFoods();
  }, []);

  const fetchOrders = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `https://food-order-eyxp.onrender.com/api/orders/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchFoods = async () => {
    try {

      const res = await axios.get(
        `https://food-order-eyxp.onrender.com/api/foods/restaurant/${restaurantId}`
      );

      setFoods(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addFood = async () => {
    try {

      await axios.post(
        "https://food-order-eyxp.onrender.com/api/foods/add",
        {
          name: foodData.name,
          price: Number(
            foodData.price
          ),
          category:
            foodData.category,
          image: foodData.image,
          isVeg: true,
          restaurant:
            restaurantId
        }
      );

      alert(
        "Food Added Successfully ✅"
      );

      setFoodData({
        name: "",
        price: "",
        category: "",
        image: ""
      });

      fetchFoods();

    } catch (error) {

      console.log(error);

      alert(
        JSON.stringify(
          error.response?.data
        )
      );
    }
  };

  const deleteFood = async (id) => {
    try {

      await axios.delete(
        `https://food-order-eyxp.onrender.com/api/foods/${id}`
      );

      alert("Food Deleted ✅");

      fetchFoods();

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    orderId,
    status
  ) => {
    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `https://food-order-eyxp.onrender.com/api/orders/status/${orderId}`,
        {
          status,
          statusMessage:
            messages[orderId] ||
  `         Your order is currently ${status}`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order Updated ✅");

      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Restaurant Dashboard 🍽️
      </h2>

      <h4>
        Restaurant ID:
        {restaurantId || "NULL"}
      </h4>

      <hr />

      <h2>Add Food 🍔</h2>

      <input
        type="text"
        placeholder="Food Name"
        value={foodData.name}
        onChange={(e) =>
          setFoodData({
            ...foodData,
            name: e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={foodData.price}
        onChange={(e) =>
          setFoodData({
            ...foodData,
            price: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Category"
        value={foodData.category}
        onChange={(e) =>
          setFoodData({
            ...foodData,
            category: e.target.value
          })
        }
      />

      <button onClick={addFood}>
        Add Food
      </button>

      <hr />

      <h2>My Foods 🍕</h2>

      {foods.length === 0 ? (
        <p>No Foods Found</p>
      ) : (
        foods.map((food) => (
          <div key={food._id}>
            <h4>{food.name}</h4>

            <p>
              ₹{food.price}
            </p>

            <button
              onClick={() =>
                deleteFood(food._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>Received Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}
          >
            <h4>
              Customer:
              {" "}
              {order.user?.name}
            </h4>

            <p>
              Total:
              {" "}
              ₹{order.totalPrice}
            </p>

            <p>
              Status:
              {" "}
              {order.status}
            </p>

            <p>
              Message:
              {" "}
              {order.statusMessage}
            </p>

            <textarea
              placeholder="Status Message"
              value={
                messages[order._id] || ""
              }
              onChange={(e) =>
                setMessages({
                  ...messages,
                  [order._id]:
                    e.target.value
                })
              }
            />

            <br />
            <br />

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "ACCEPTED"
                )
              }
            >
              Accept
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "PREPARING"
                )
              }
            >
              Preparing
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "OUT_FOR_DELIVERY"
                )
              }
            >
              Out For Delivery
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  "DELIVERED"
                )
              }
            >
              Delivered
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RestaurantDashboard;
