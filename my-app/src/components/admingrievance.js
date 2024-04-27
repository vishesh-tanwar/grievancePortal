import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./admingrievance.css";

const Admingrievance = () => {
  const [grievances,setGrievances] = useState([]);
  useEffect(() => {
    const fetchGrievance = async () => {
      try{
        const response = await fetch("http://localhost:5000/grievancedata",{
          method : "GET",
          headers : {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
        });
        if (response.ok){
          const data = await response.json();
          const sortedGrievances = data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setGrievances(sortedGrievances) ;
        } else {
          console.error("failed to fetch grievance data");
        }
      }
      catch(error){
        console.error("error fetching data",error); 
      }
    }
    fetchGrievance();
  }, []);
  return ( 
    <>
      <table className="Gtable table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Enrollment No.</th> 
            <th>Email</th>
          {/*  <th>Phone</th> */}  
            <th>Grievance</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>       
        </thead>
        <tbody>
        {grievances.map((grievance, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{grievance.name}</td>
              <td>{grievance.enrollment_no}</td>
              <td>{grievance.email}</td>
            {/*  <td>{grievance.mobile}</td> */}
              <td>{grievance.grievance}</td>
              <td>{grievance.status}</td>
              <td>{grievance.feedback}</td>
              <td>{new Date(grievance.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin-grievance/admin-update" className="btn btn-outline-primary mx-4 mb-1 update">Update Documents</Link>
      <Link to="/login" className="btn btn-outline-warning mx-4 mb-1 update">Logout as Admin</Link>
      <br />
      <br />
      <p className='small mx-4' style={{ "fontStyle": "italic" }}>Note: Copy the grievance ID to update.</p>
    </>
  );
};

export default Admingrievance;