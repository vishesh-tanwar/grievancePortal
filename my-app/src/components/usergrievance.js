import React, { useState } from 'react';

const UserGrievance = () => {
    const [userData, setUserData] = useState({ name: "", email: "", enrollment_no: "", grievance: "" });

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };
    
    const fileGrievance = async (event) => {
        event.preventDefault();

        const { name, email, enrollment_no, grievance } = userData;
        if (!name || !email || !enrollment_no || !grievance) {
            alert("Please fill all the details.");
            return;
        }

        const res = await fetch("http://localhost:5000/grievance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, enrollment_no, grievance
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Grievance Not Filed");
            window.alert("Try to relogin. Your grievance was not filed!");
        } else {
            alert("Grievance Filed Successfully!! We'll inform you when there will be a response");
            setUserData({ ...userData, grievance: "" });
        }
    };

    return (
        <div className="box">
            <h1>File Grievance</h1>
            <br></br>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="enrollment_no" className="form-label">
                        Enrollment Number
                    </label>
                    <input type="number" className="form-control" name="enrollment_no" id="enrollment_no" value={userData.enrollment_no} onChange={handleInputs} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input type="text" className="form-control" name="name" id="name" value={userData.name} onChange={handleInputs} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" className="form-control" name="email" id="email" value={userData.email} onChange={handleInputs} />
                </div>
                <div className="col-md-6 ">
                    <label htmlFor="grievance" className="form-label">
                        Grievance
                    </label>
                    <textarea className="form-control" name="grievance" id="grievance" rows="4" value={userData.grievance} onChange={handleInputs} />
                </div>
                <br></br>
                <div className="col-md-6">
                    <input type="file" className="form-control" id="customFile" />
                    <label htmlFor="customFile" id="customFileLabel">Choose file</label>
                </div> 
                <div className="col-12">
                    <button type="submit" name="submit" id="submit" className="btn btn-primary" onClick={fileGrievance}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserGrievance;
