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
            Authorization: `Bearer ${token}`
          }
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
            Authorization: `Bearer ${token}`
          }
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
            Authorization: `Bearer ${token}`
          }
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
            Authorization: `Bearer ${token}`
          }
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
          count: 10
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    <div style={{ padding: "20px" }}>

      <h2>Admin Dashboard 👨‍💻</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <h3>Users: {stats.users}</h3>
        <h3>Restaurants: {stats.restaurants}</h3>
        <h3>Orders: {stats.orders}</h3>
      </div>

      <hr />

      <h2>AI Restaurant Generator 🤖</h2>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
      />

      <button
        onClick={generateRestaurants}
        style={{
          marginLeft: "10px"
        }}
      >
        Generate Restaurants
      </button>

      <hr />

      <h2>
        Restaurant Owner Requests
      </h2>

      {requests.length === 0 ? (
        <p>No Requests Found</p>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}
          >
            <h3>
              {request.restaurantName}
            </h3>

            <p>
              Owner:
              {" "}
              {request.user?.name}
            </p>

            <p>
              Email:
              {" "}
              {request.user?.email}
            </p>

            <p>
              Address:
              {" "}
              {request.address}
            </p>

            <p>
              Status:
              {" "}
              {request.status}
            </p>

            {request.status ===
              "pending" && (
              <>
                <button
                  onClick={() =>
                    approveRequest(
                      request._id
                    )
                  }
                >
                  Approve ✅
                </button>

                <button
                  onClick={() =>
                    rejectRequest(
                      request._id
                    )
                  }
                  style={{
                    marginLeft: "10px"
                  }}
                >
                  Reject ❌
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
