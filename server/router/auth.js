const express = require("express");
const router = express.Router();
const User = require("../model/userschema");
//const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authenticate=require('../middleware/authenticate');
const jwtSecret = "thisismybvicamjwtokenforthelogin";

router.post("/register", async (req, res) => {
    const { enrollment_no, name, father_name, email, mobile, password } = req.body;

    // Input validation
    if (!enrollment_no || !name || !father_name || !email || !mobile || !password) {
        return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate mobile number format (assuming 10-digit Indian mobile numbers)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: "Invalid mobile number format" });
    }

    const passwordRegex = /^.{5,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must be at least 5 characters long" });
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ enrollment_no, name, father_name, email, mobile, password: hashedPassword });

        // Save the user to the database
        await user.save();

        /*
        // Send registration email
        const message = {
            to: email,
            from: 'potssteve187@gmail.com',
            name: "Grievance Portal",
            subject: 'Successfully Registered!!',
            text: `Congratulations ${name}, You have been successfully registered on BVICAM Grievance Portal. Kindly login. Thank you.`
        };

        // Sending email
        await sgMail.send(message); */

        res.status(200).json({ message: "Registration Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/signin",async(req,res)=>{
  try{
    const {email,password}=req.body;
       //console.log(`Data posted: ${email} and ${password}`);

    if(!email || !password){
        return res.status(400).json({ error:"Please enter data"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    //userLogin will be the document with whom email matches
    const userLogin=await User.findOne({email:email});

    //if user exists
    if(userLogin){
     //trying to compare the passwords
     const isMatch=await bcrypt.compare(password,userLogin.password);
     //(password==userLogin.password)
     //console.log(`isMatch= ${isMatch}`);
    
     //creating a token
    //const token=await userLogin.generateAuthToken();

    if(!isMatch){
      return res.status(400).json({ error:"Invalid Credentials"})
    }
    else{
    //storing token in a cookie
    //res.cookie(name,values)
    //res.cookie("jwtoken",token,{
      //will expire in 30 days (coverted to millisecond)
      //expires:new Date(Date.now()+25892000000)
    //});
                                                        // update today 
    const data = {
        user : {
            id:userLogin.id, 
            name: userLogin.name, // Include other user data as needed
            email: userLogin.email,
            enrollment_no: userLogin.enrollment_no
        }
    };
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now

    // Generate JWT token with expiry date
    const authtoken = jwt.sign(data, jwtSecret, { expiresIn: '30d' });  
    return res.status(200).json({message:"Login Succesful",authtoken:authtoken})  
    }
    }
    //if user does not exist
    else{
      return res.status(400).json({ error:"User not registered"})
    }
    
  }catch(err){
      console.log(err);
  } 
})
            //  to check if the expiry date is working or not    
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwODU3NTViNzIwZGUwMGRkN2NlYjM1In0sImlhdCI6MTcxMzU1MDExNSwiZXhwIjoxNzE2MTQyMTE1fQ.oFe8_JACHp-A5uVo5MNQVfbYp5CFAfCo-KWCll5Q9_w"; // Replace this with your actual JWT token

// try {
//     const decodedToken = jwt.decode(token);
//     console.log(decodedToken);
// } catch (error) {
//     console.error('Error decoding token:', error.message);
// }

router.post("/grievance", async (req, res) => {
    try {
        const { name, email, enrollment_no, grievance } = req.body;

        if (!name || !email || !enrollment_no || !grievance) {
            console.log("Empty data in grievance portal");
            return res.status(400).json({ error: "Please fill all the details" });
        }

        const userContact = await User.findOne({ enrollment_no: enrollment_no });
        if (userContact) { 
            const userMsg = await userContact.addGrievance(name, email, enrollment_no, grievance);
            await userContact.save();

            return res.status(200).json({ message: "Grievance Filed Successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

                                                                        // update today 

router.get('/getdata',authenticate , async (req, res) => {  
    try {  
        const token = req.header("Authorization");
        console.log("Received token:", token);
        const userdata = req.isverified ; 
        console.log("decoded",userdata); 
        res.status(200).json({userdata});   
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;