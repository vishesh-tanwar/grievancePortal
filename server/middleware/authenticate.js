// // update today
 const jwt=require('jsonwebtoken');
 const User=require('../model/userschema'); 

const authenticate=async(req,res,next)=>{
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({message : "token not provided"}) ;
    }
    const jwttoken = token.replace("Bearer", "").trim(); 
    console.log("token",jwttoken) ; 
    try{
        const isverified = jwt.verify(jwttoken, "thisismybvicamjwtokenforthelogin");  
        console.log("deploy :",isverified);
        //const userData = await User.findOne({enrollment_no:isverified.enrollment_no}) ;    // error in this line 
        //console.log(userData) ;
        // req.token=token;
        // req.userData=userData;
        // req.email = userData; 
        req.isverified=isverified;
        req.token=token 
        
        next();
    } 
    catch(e){
        return res.status(401).json({message : "token not verified "}) ;
    }
};

module.exports=authenticate;

// const jwt = require('jsonwebtoken');
// const User = require('../model/userschema');

// const authenticate = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");
//         if (!token) {
//             return res.status(401).json({ message: "Token not provided" });
//         }

//         const jwttoken = token.replace("Bearer", "").trim();
//         console.log("Token:", jwttoken);

//         const decodedToken = jwt.verify(jwttoken,"thisismybvicamjwtokenforthelogin");
//         console.log("Decoded Token:", decodedToken);

//         const userData = await User.findOne({ email: decodedToken.email });
//         if (!userData) {
//             return res.status(401).json({ message: "User not found" });
//         }

//         req.token = token;
//         req.userData = userData;
//         req.email = userData.email;

//         next();
//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(401).json({ message: "Token verification failed" });
//     }
// };

// module.exports = authenticate;
