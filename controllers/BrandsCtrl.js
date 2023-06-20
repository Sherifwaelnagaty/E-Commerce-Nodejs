import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

export const CreateBrandCtrl = asyncHandler(async(req,res)=>{
    const{name,user,images,products}=req.body;
    const brand= await Brand.findOne({name:name.toLowerCase()});
    console.log(brand);
    
    if(brand){
    throw new Error("Brand Exists");
    }
    else{
        const brand = await Brand.create({
            name:name.toLowerCase(),
            user:req.userAuthId,
        });
        res.json({
            status:"success",
            message:"Brand created successfully",
            brand,
        });
    }
});
export const getAllBrandsCtrl = asyncHandler(async(req,res)=>{
const brands = await Brand.find();
res.json({
    status:"success",
    message:"Brands Fetched successfully",
    brands,
});
});
export const getBrandCtrl = asyncHandler(async(req,res)=>{
    const brands=await Brand.findById(req.params.id);
    if(!brands){
        throw new Error("Brand not found");
    }
    res.json({
        status:"success",
        message:"Brand fetched successfully",
        brands,
    });
});
export const updateBrandCtrl = asyncHandler(async(req,res)=>{
    const{name}=req.body;
    const brand= await Brand.findByIdAndUpdate(req.params.id,{name},{new:true});
    if(!brand){
        throw new Error("Brand not found")
    }else{
        res.json({
            status:"success",
            message:"Brand Updated successfully",
            brand,
        });
    }

});
export const deleteBrandCtrl = asyncHandler(async(req,res)=>{
    const{name}=req.body;
    const brand= await Brand.findByIdAndDelete(req.params.id);
    if(!brand){
        throw new Error("Brand not found")
    }else{
        res.json({
            status:"success",
            message:"Brand Deleted successfully",
        });
    }

});