import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
import User from "../model/user.js";


export const registerUserCtrl = asyncHandler(async(req,res)=>{

    const{ fullname,email,password }=req.body;
    //check user exist
    const userExists= await User.findOne({email});
    if(userExists){
        throw new Error("user already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(password,salt);
    //create user
    const newUser= await User.create({
        fullname,
        email,
        password: hashedpassword,
    });
    res.status(201).json({
        status:"success",
        msg:"user created",
        data: newUser,
    });


});
export const loginUserCtrl = asyncHandler(async(req,res)=>{
    let{email,password}=req.body;
    //validate email and password
    if(!email || !password){
        res.json({
            msg:"please provide email and password",
        });
    }
    //check user exist
    const emailExists= await User.findOne({email});
    if(emailExists && await bcrypt.compare(password,emailExists?.password)){
        res.json({
        msg:"user logged in successfully",
        status:"success",
        emailExists,
        token:generateToken(emailExists?._id),
        });
    }else{
        throw new Error("invalid email or password");
    }
    
});
export const getUserProfileCtrl = asyncHandler(async(req,res)=>{
    const token = getTokenFromHeader(req);
    //verify token
    const decoded =verifyToken(token);
    res.json({
        msg:"welcome profile page",
    });
});
export const updateUserAddressCtrl = asyncHandler(async(req,res)=>{
    const{ firstName,lastName,address,city,postalcode,province,country,phone }=req.body;
     const user = await User.findByIdAndUpdate(req.userAuthId,{
        ShippingAddress:{
            firstName,
            lastName,
            address,
            city,
            postalcode,
            province,
            country,
            phone, 
        },
        hasShippingAddress:true,
        },
        {
            new:true,
        }
     );
     res.json({
            status:"success",           
            msg:"user address updated",
            user,
     });
     if(!user){
        throw new Error("user not found");
     }

});