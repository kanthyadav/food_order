import React, { useState } from "react";
import axios from "axios";

function ApplyRestaurant() {
  const [restaurantName, setRestaurantName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [description, setDescription] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "https://food-order-eyxp.onrender.com/api/restaurant-requests/apply-restaurant",
        {
          user: user.id,
          restaurantName,
          address,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Request Submitted Successfully ✅"
      );

      setRestaurantName("");
      setAddress("");
      setDescription("");
    } catch (error) {
      console.log(error);

      alert(
        "Failed To Submit Request"
      );
    }
  };

  return (
    <div className="apply-owner-page">
      <div className="apply-owner-card">
        <h2 className="apply-owner-title">
          Apply For Restaurant Owner 
        </h2>

        <p className="apply-owner-subtitle">
          Submit your restaurant details
          for admin approval.
        </p>

        <form
          className="apply-owner-form"
          onSubmit={handleSubmit}
        >
          <input
            className="apply-owner-input"
            type="text"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) =>
              setRestaurantName(
                e.target.value
              )
            }
            required
          />

          <input
            className="apply-owner-input"
            type="text"
            placeholder="Restaurant Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            required
          />

          <textarea
            className="apply-owner-textarea"
            placeholder="Restaurant Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows="5"
            required
          />

          <button
            className="apply-owner-btn"
            type="submit"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyRestaurant;