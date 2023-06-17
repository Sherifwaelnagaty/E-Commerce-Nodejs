import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

export const CreateCategoryCtrl = asyncHandler(async(req,res)=>{
    const{name,user,images,products}=req.body;
    const category= await Category.findOne({name});
    
    if(category){
    throw new Error("Category Exists");
    }
    else{
        const category = await Category.create({
            name:name.toLowerCase(),
            user:req.userAuthId,
        });
        res.json({
            status:"success",
            message:"Category created successfully",
            category,
        });
    }
});
export const getAllCategoriesCtrl = asyncHandler(async(req,res)=>{
const categories = await Category.find();
res.json({
    status:"success",
    message:"Categories Fetched successfully",
    categories,
});
});
export const getCategoryCtrl = asyncHandler(async(req,res)=>{
    const category=await Category.findById(req.params.id);
    if(!category){
        throw new Error("Category not found");
    }
    res.json({
        status:"success",
        message:"Category fetched successfully",
        category,
    });
});
export const updateCategoryCtrl = asyncHandler(async(req,res)=>{
    const{name}=req.body;
    const category= await Category.findByIdAndUpdate(req.params.id,{name},{new:true});
    if(!category){
        throw new Error("Category not found")
    }else{
        res.json({
            status:"success",
            message:"Category Updated successfully",
            category,
        });
    }

});
export const deleteCategoryCtrl = asyncHandler(async(req,res)=>{
    const{name}=req.body;
    const category= await Category.findByIdAndDelete(req.params.id);
    if(!category){
        throw new Error("Category not found")
    }else{
        res.json({
            status:"success",
            message:"Category Deleted successfully",
        });
    }

});