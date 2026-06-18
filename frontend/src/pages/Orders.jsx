import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    user?.role !== "customer"
  ) {
    return <Navigate to="/home" />;
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/orders/${user.id}`,
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

  const getStatusEmoji = (status) => {
    switch (status) {
      case "PLACED":
        return "📦";

      case "ACCEPTED":
        return "✅";

      case "PREPARING":
        return "👨‍🍳";

      case "OUT_FOR_DELIVERY":
        return "🚚";

      case "DELIVERED":
        return "🏠";

      default:
        return "📦";
    }
  };

  return (
    <div className="container">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card"
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3>
              {getStatusEmoji(
                order.status
              )}{" "}
              {order.status}
            </h3>

            <p>
              <strong>Total:</strong>{" "}
              ₹{order.totalPrice}
            </p>

            <p>
              <strong>Message:</strong>{" "}
              {order.statusMessage ||
                "No update from restaurant yet"}
            </p>

            <hr />

            <h4>
              Order Tracking
            </h4>

            <p>
              📦 ➜ ✅ ➜ 👨‍🍳 ➜ 🚚 ➜ 🏠
            </p>

            <hr />

            <h4>
              Items Ordered
            </h4>

            {order.items?.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginBottom: "8px"
                  }}
                >
                  <span>
                    {item.food?.name}
                  </span>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;