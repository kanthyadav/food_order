import React, { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Signup() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleSignup =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "https://food-order-eyxp.onrender.com/api/users/register",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Signup Successful ✅"
        );

        navigate("/login");
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.msg ||
            "Signup Failed ❌"
        );
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          Create Account 
        </h2>

        <p className="auth-subtitle">
          Join Food Order Platform
          and start ordering.
        </p>

        <form
          className="auth-form"
          onSubmit={
            handleSignup
          }
        >
          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
          />

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
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link
            className="auth-link"
            to="/login"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;