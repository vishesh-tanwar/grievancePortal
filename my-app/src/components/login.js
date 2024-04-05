import React, { useState} from 'react';
import { NavLink , useNavigate} from "react-router-dom";
import "./login.css";
//import { UserContext } from '../App';


const Login = () => {
  //const {state,dispatch} = useContext(UserContext);

  const history=useNavigate();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const loginUser=async(e)=>{
     e.preventDefault();

     const res= await fetch('http://localhost:5000/signin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          'Accept': 'application/json'
        },
        
        body:JSON.stringify({
            email,password
        })
     });
     const data=await res.json();
     
     if(res.status===400 || !data){
       window.alert("Invalid Credentials");
     }else{
      //dispatch({type:"USER",payload:true})
      window.alert("Login Successful");
      history("/");
     }
  }

  return (
    <>
      <div className = "box">
        <h1>Login</h1>
        <br></br>
        <form>
          <div class="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              class="form-control margin5"
              id="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter email"
            />
           
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary" onClick={loginUser}>
            Submit
          </button>
          
        </form>
        <br></br>
        <NavLink to="/signup" className="signup-image-link">New User ?</NavLink>
        <NavLink to="/adminlogin" className="admin">Login As Admin</NavLink>
      </div>
    </>
  );
}
export default Login ;