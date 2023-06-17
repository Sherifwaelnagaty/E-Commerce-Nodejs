import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

export const CreateColorCtrl = asyncHandler(async(req,res)=>{
    const{name,user,images,products}=req.body;
    const color= await Color.findOne({name});
    
    if(color){
    throw new Error("Color Exists");
    }
    else{
        const color = await Color.create({
            name:name.toLowerCase(),
            user:req.userAuthId,
        });
        res.json({
            status:"success",
            message:"Color created successfully",
            color,
        });
    }
});
export const getAllColorsCtrl = asyncHandler(async(req,res)=>{
const colors = await Color.find();
res.json({
    status:"success",
    message:"Colors Fetched successfully",
    colors,
});
});
export const getColorCtrl = asyncHandler(async(req,res)=>{
    const colors=await Color.findById(req.params.id);
    if(!colors){
        throw new Error("Color not found");
    }
    res.json({
        status:"success",
        message:"Color fetched successfully",
        colors,
    });
});
export const updateColorCtrl = asyncHandler(async(req,res)=>{
    const{name}=req.body;
    const color= await Color.findByIdAndUpdate(req.params.id,{name},{new:true});
    if(!color){
        throw new Error("Color not found");
    }else{
        res.json({
            status:"success",
            message:"Color Updated successfully",
            color,
        });
    }

});
export const deleteColorCtrl = asyncHandler(async(req,res)=>{
    const{name}=req.body;
    const color= await Color.findByIdAndDelete(req.params.id);
    if(!color){
        throw new Error("Color not found");
    }else{
        res.json({
            status:"success",
            message:"Color Deleted successfully",
        });
    }

});