// //get token from Header

// //Got token?

// //Token got access?
// const User = require('../models/userModel');
// const jwt = require("jsonwebtoken");

// const auth = async(req, res, next) => {
//     try{

//         //get token from Header
//         const token = req.header("Authorization").split(" ")[1];
        
//         console.log("tokennnnnnnnnnn: "+token);
//         if(!token){
//             //throw new Error();    
//         }
//         //check got the correct token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({
//             name: decoded.name,
//             "tokens.token" :token,
//         });
//         if(!user){
//             throw new Error();
//         }
//         req.user = user;
//         req.token = token;
//         next();
       

//     }catch(error){
//         res.status(400).send("You are not authorized to access");
//     }
// };

// module.export = auth;