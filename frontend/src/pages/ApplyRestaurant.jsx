import React, { useState } from "react";
import axios from "axios";

function ApplyRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

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
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    <div
      style={{
        padding: "20px"
      }}
    >
      <h2>
        Apply For Restaurant Owner 🏪
      </h2>

      <p>
        Submit your restaurant
        details for admin approval.
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Restaurant Name"
          value={restaurantName}
          onChange={(e) =>
            setRestaurantName(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button type="submit">
          Submit Request
        </button>

      </form>
    </div>
  );
}

export default ApplyRestaurant;