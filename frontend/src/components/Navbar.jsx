import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Food Order </h2>
      </div>

      <div className="navbar-links">

        {!token ? (
          <>
            <Link
              className="nav-link"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              className="nav-link"
              to="/home"
            >
              Home
            </Link>

            {user?.role === "customer" && (
              <>
                <Link
                  className="nav-link"
                  to="/orders"
                >
                  Orders
                </Link>

                <Link
                  className="nav-link"
                  to="/become-owner"
                >
                  Become Owner
                </Link>
              </>
            )}

            <Link
              className="nav-link"
              to="/ai-assistant"
            >
              AI Assistant
            </Link>

            {user?.role === "restaurantOwner" && (
              <Link
                className="nav-link"
                to="/restaurant-dashboard"
              >
                Dashboard
              </Link>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  className="nav-link"
                  to="/admin"
                >
                  Admin
                </Link>

                <Link
                  className="nav-link"
                  to="/ai-generator"
                >
                  AI Generator
                </Link>
              </>
            )}

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;