import React from 'react';
import { Link } from 'react-router-dom';

const Admingrievance = () => {
  return (
    <>
      <table className="Gtable table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Grievance</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Your table rows here */}
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