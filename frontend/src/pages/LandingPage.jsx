import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">

        <h1 className="landing-title">
          Food Order Platform
        </h1>

        <p className="landing-subtitle">
          Order delicious food from your
          favorite restaurants or start
          your own restaurant business.
        </p>

        <div className="landing-cards">

          <div className="landing-card">
            <h2> Order Food</h2>

            <p>
              Browse restaurants,
              explore menus and order
              your favorite meals.
            </p>

            <button
              className="landing-btn"
              onClick={() =>
                navigate("/login")
              }
            >
              Continue as Customer
            </button>
          </div>

          <div className="landing-card">
            <h2>Become Owner</h2>

            <p>
              Register your restaurant,
              get approved and start
              receiving orders.
            </p>

            <button
              className="landing-btn"
              onClick={() =>
                navigate(
                  "/apply-restaurant"
                )
              }
            >
              Become Restaurant Owner
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;