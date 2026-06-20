import React, { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res =
        await axios.post(
          "https://food-order-eyxp.onrender.com/api/users/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      if (
        res.data.restaurantId
      ) {
        localStorage.setItem(
          "restaurantId",
          res.data.restaurantId
        );
      }

      alert(
        "Login Successful ✅"
      );

      if (
        res.data.user.role ===
        "admin"
      ) {
        navigate("/admin");
      } else if (
        res.data.user.role ===
        "restaurantOwner"
      ) {
        navigate(
          "/restaurant-dashboard"
        );
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.msg ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          Welcome Back 
        </h2>

        <p className="auth-subtitle">
          Login to continue
          ordering food.
        </p>

        <form
          className="auth-form"
          onSubmit={
            handleLogin
          }
        >
          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link
            className="auth-link"
            to="/signup"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;