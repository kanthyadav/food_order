import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.restaurantId) {
        localStorage.setItem(
          "restaurantId",
          res.data.restaurantId
        );
      }

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (
        res.data.user.role === "restaurantOwner"
      ) {
        navigate("/restaurant-dashboard");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.msg ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <br />

      <p>
        Don't have an account?
        <Link to="/signup">
          {" "}Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;