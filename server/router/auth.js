const express = require("express");
const router = express.Router();
const User = require("../model/userschema");
//const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

//const API_KEY = "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";
//sgMail.setApiKey(API_KEY);

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

    return res.status(200).json({message:"Login Succesful"})
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


module.exports = router;