import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchDashboard();
    fetchRequests();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://food-order-eyxp.onrender.com/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://food-order-eyxp.onrender.com/api/admin/restaurant-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveRequest = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `https://food-order-eyxp.onrender.com/api/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Approved Successfully ✅");

      fetchRequests();
      fetchDashboard();
    } catch (error) {
      console.log(error);
      alert("Approval Failed ❌");
    }
  };

  const rejectRequest = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `https://food-order-eyxp.onrender.com/api/admin/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rejected Successfully ❌");

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  };

  const generateRestaurants = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.post(
        "https://food-order-eyxp.onrender.com/api/ai/generate-restaurants",
        {
          city,
          count: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchDashboard();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Restaurant Generation Failed"
      );
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">
        Admin Dashboard 
      </h2>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Users: {stats.users}</h3>
        </div>

        <div className="stat-card">
          <h3>
            Restaurants:
            {stats.restaurants}
          </h3>
        </div>

        <div className="stat-card">
          <h3>Orders: {stats.orders}</h3>
        </div>
      </div>

      <div className="admin-section">
        <h2>
          AI Restaurant Generator 
        </h2>

        <div className="generator-box">
          <input
            className="admin-input"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <button
            className="generate-btn"
            onClick={generateRestaurants}
          >
            Generate Restaurants
          </button>
        </div>
      </div>

      <div className="admin-section">
        <h2>
          Restaurant Owner Requests
        </h2>

        {requests.length === 0 ? (
          <p>No Requests Found</p>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="request-card"
            >
              <h3>
                {request.restaurantName}
              </h3>

              <p>
                <strong>Owner:</strong>{" "}
                {request.user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {request.user?.email}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {request.address}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {request.status}
              </p>

              {request.status ===
                "pending" && (
                <div className="request-actions">
                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveRequest(
                        request._id
                      )
                    }
                  >
                    Approve ✅
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      rejectRequest(
                        request._id
                      )
                    }
                  >
                    Reject ❌
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;