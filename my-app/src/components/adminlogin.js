import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "./adminlogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const getAccess = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      window.alert("Login Successful");
      history("/admin-grievance");
    } else {
      window.alert("You don't have this access");
    }
  };
  return (
    <>
      <div className="box">
        <h1>Admin Login</h1>
        <br></br>
        <form>
          <div class="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control margin5"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={getAccess}>
            Submit
          </button>
        </form>
        <NavLink to="/login" className="space">
          Login As User
        </NavLink>
      </div>
    </>
  );
};
export default AdminLogin;
