import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px"
      }}
    >
      <h1>🍔 Food Order Platform</h1>

      <h3>
        Choose how you want to continue
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "40px"
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "30px",
            borderRadius: "10px",
            width: "300px"
          }}
        >
          <h2>🍔 Order Food</h2>

          <p>
            Browse restaurants and
            order food online.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
          >
            Continue as Customer
          </button>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "30px",
            borderRadius: "10px",
            width: "300px"
          }}
        >
          <h2>🏪 Become Owner</h2>

          <p>
            Register your restaurant
            and start receiving orders.
          </p>

          <button
            onClick={() =>
              navigate("/apply-restaurant")
            }
          >
            Become Restaurant Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
