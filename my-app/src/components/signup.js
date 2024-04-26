import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    enrollment_no: "",
    name: "",
    father_name: "",
    email: "",
    mobile: "",
    password: "",
  });
  let name, value;
  const handleInputs = (event) => {
   
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };
 
  const PostData=async(event)=>{
    event.preventDefault();
    const {enrollment_no,name,father_name,email,mobile,password} = user;
    
    if (!user.enrollment_no || !user.name || !user.father_name || !user.email || !user.mobile || !user.password) {
      window.alert("Please fill all the required fields");
      return;
    }
    const res= await fetch("http://localhost:5000/register",{
     
      "method":"POST",
      headers:{
        "Content-Type":"application/json",
        'Accept': 'application/json'
      }, 
      credentials:"same-origin",
      body:JSON.stringify({
        enrollment_no,name,father_name,email,mobile,password
      })
    });
    const data= await res.json();

    if(data.status===400 || !data){
        window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
    }else{
      window.alert("Registration Successful");
      console.log("Registration Successful");

      history("/login");
    }
  }
  return (
    <div className="box">
      <h1>Registration</h1>
      <br></br>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="enrollment_no" className="form-label">
            Enrollment Number 
          </label>
          <input type="number" className="form-control" name="enrollment_no" id="enrollment_no" value={user.enrollment_no} onChange={handleInputs} />
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" name="name" id="name" value={user.name} onChange={handleInputs} />
        </div>
        <div className="col-md-6">
          <label htmlFor="father_name" className="form-label">
            Father Name
          </label>
          <input type="text" className="form-control" name="father_name" id="father_name" value={user.father_name} onChange={handleInputs} />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" name="email" id="email" value={user.email} onChange={handleInputs} />
        </div>
        <div className="col-md-6">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input type="number" className="form-control" name="mobile" id="mobile" value={user.mobile} onChange={handleInputs} />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" id="password" value={user.password} onChange={handleInputs} />
        </div>
        <div className="col-12">
          <button type="submit" name="register" id="register" onClick={PostData} className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
      <br></br>
      <div className="link">  
      <NavLink to="/login" className="signup-image-link">Already Registered ?</NavLink>
      </div>
    </div>
  );
};
export default Signup;
