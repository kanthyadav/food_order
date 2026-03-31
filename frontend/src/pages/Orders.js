import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `http://localhost:5000/api/orders/${userId}`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>My Orders 📦</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="card"
          style={{ marginBottom: "20px", padding: "15px" }}
        >
          <h4 style={{ color: "green" }}>
            Status: {order.status}
          </h4>

          <p style={{ fontWeight: "bold" }}>
            Total: ₹{order.totalPrice}
          </p>

          <hr />

          <h5>Items:</h5>

          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px"
              }}
            >
              <span>{item.food?.name}</span>
              <span>Qty: {item.quantity}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;