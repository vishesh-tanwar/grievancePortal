import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      localStorage.setItem("authtoken", data.authtoken);
      console.log(localStorage.getItem("authtoken"))
      history("/user-grievance"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message); // Display error message to user
    }
  }

  return (
    <>
      <div className="box">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control margin5"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={loginUser}
          >
            Submit
          </button>
        </form>
        <br />
        <NavLink to="/signup" className="signup-image-link">New User ?</NavLink>
        <NavLink to="/adminlogin" className="admin">Login As Admin</NavLink>
      </div>
    </>
  );
}

export default Login;

