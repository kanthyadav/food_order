import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Navigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    user?.role !== "customer"
  ) {
    return (
      <Navigate to="/home" />
    );
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `https://food-order-eyxp.onrender.com/api/orders/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setOrders(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const getStatusEmoji =
    (status) => {
      switch (
        status
      ) {
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
    <div className="orders-page">
      <h2 className="orders-title">
        My Orders 
      </h2>

      {orders.length ===
      0 ? (
        <div className="empty-orders">
          <p>
            No Orders Found
          </p>
        </div>
      ) : (
        orders.map(
          (order) => (
            <div
              key={
                order._id
              }
              className="order-card"
            >
              <h3 className="order-status">
                {getStatusEmoji(
                  order.status
                )}{" "}
                {
                  order.status
                }
              </h3>

              <p>
                <strong>
                  Total:
                </strong>{" "}
                ₹
                {
                  order.totalPrice
                }
              </p>

              <p>
                <strong>
                  Message:
                </strong>{" "}
                {order.statusMessage ||
                  "No update from restaurant yet"}
              </p>

              <div className="order-divider"></div>

              <h4>
                Order Tracking
              </h4>

              <p className="tracking-flow">
                📦 ➜ ✅ ➜ 👨‍🍳 ➜ 🚚 ➜ 🏠
              </p>

              <div className="order-divider"></div>

              <h4>
                Items Ordered
              </h4>

              {order.items?.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className="order-item"
                  >
                    <span>
                      {item.food
                        ?.name}
                    </span>

                    <span>
                      Qty:
                      {" "}
                      {
                        item.quantity
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          )
        )
      )}
    </div>
  );
}

export default Orders;