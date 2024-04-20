import React from 'react'

const usergrievance = () => {
  return (
    <div className="box">
      <h1>File Grievance</h1>
      <br></br>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="enrollment_no" className="form-label">
            Enrollment Number 
          </label>
          <input type="number" className="form-control" name="enrollment_no" id="enrollment_no"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" name="name" id="name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" name="email" id="email" />
        </div>
        <div className="col-md-6 ">
          <label htmlFor="email" className="form-label">
            Grievance 
          </label>
          <textarea className="form-control" name="grievance" id="grievance" rows="4"/>
        </div>
        <br></br>
        <div className="col-md-6">
           <input type="file" className="form-control" id="customFile"/> 
           <label htmlFor="customFile" id="customFile">Choose file</label>
        </div>
        <div className="col-12">
          <button type="submit" name="register" id="register" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default usergrievance;

