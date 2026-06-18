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
    <div className="navbar">
      <h2>Food Order 🍔</h2>

      <div className="nav-links">

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/home">Home</Link>

            {user?.role === "customer" && (
              <Link to="/orders">
                Orders
              </Link>
            )}

            <Link to="/ai-assistant">
              AI Assistant
            </Link>

            {user?.role === "restaurantOwner" && (
              <Link to="/restaurant-dashboard">
                Dashboard
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                Admin
              </Link>
            )}

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;