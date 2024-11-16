import  Jwt  from "jsonwebtoken";
import asyncHandler from "./asyncHandler.mjs";
import User from "../model/userModel.mjs";

//protect route
const protect=asyncHandler(async(req,res,next)=>{
let token;
//read jwt from cookie
token=req.cookies.Jwt;

if(token){

try{
const decoded=Jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decoded.userId).select('-password');
next();
}catch(error){
    console.log(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
}

}
else{
    res.status(401);
    throw new Error('Not authorized, no token');
}

})

//Admin Middleware
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin)
    {
          next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as admin');
    }
}

export {protect,admin};