import Category from "../model/Category.js";
import Product from "../model/Product.js";
import Brand from "../model/Brand.js";
import asyncHandler from "express-async-handler";
export const createProductCtrl = asyncHandler(async(req,res)=>{
    const convertedImgs= req.files.map((file)=>file.path);
    if(!convertedImgs){
        throw new Error("Please upload images");
    }
    const{ name,description,category,colors,sizes,price,totalQty,brand,reviews }=req.body;
    const productexist =await Product.findOne({ name });
    if(productexist){
        throw new Error("product already exists");
    }else{
        // find the category
        const categoryFound = await Category.findOne({
            name:category,
        });
        if(!categoryFound){
            throw new Error("Category not found");
        }
        const brandFound = await Brand.findOne({
            name:brand.toLowerCase(),
        });
        if(!brandFound){
            throw new Error("Brand not found");
        }
        //create the product
        const createdProduct= await Product.create({
            name,
            description,
            category,
            colors,
            sizes,
            price,
            totalQty,
            user:req.userAuthId,
            brand,
            reviews,
            images:convertedImgs,
        });
        //push the product into category
        categoryFound.products.push(createdProduct._id);
        //resave
        await categoryFound.save();
        //push the product into brand
        brandFound.products.push(createdProduct._id);
        //resave
        await brandFound.save();
        res.status(201).json({
            msg:"product created successfully",
            status:"success",
            createdProduct,
        });
    }

});
export const getProductsCtrl = asyncHandler(async(req,res)=>{
    let productQuery = Product.find();
    //Filter by name
    if(req.query.name){
        productQuery = productQuery.find({
            name:{$regex: req.query.name,$options:"i"},
        });
    }
    //Filter by brand
    if(req.query.brand){
        productQuery = productQuery.find({
            band:{$regex: req.query.band,$options:"i"},
        });
    }
    //Filter by brand
    if(req.query.colors){
        productQuery = productQuery.find({
            colors:{$regex: req.query.colors,$options:"i"},
        });
    }//Filter by brand
    if(req.query.sizes){
        productQuery = productQuery.find({
            sizes:{$regex: req.query.sizes,$options:"i"},
        });
    }
    //Filter by price range
    if(req.query.price){
        const fromprice=req.query.price.split("-")[0];
        const toprice=req.query.price.split("-")[1];
        productQuery=products.find({
            price:{$gte:fromprice,$lte:toprice},
        });

    }
    
    //page
    const page=parseInt(req.query.page)?parseInt(req.query.page):1;
    
    const limit=parseInt(req.query.limit)?parseInt(req.query.limit):10;
    
    const startIndex=(page-1)*limit;
    
    const endIndex=page*limit;
    
    const total=await Product.countDocuments();
    
    productQuery=productQuery.skip(startIndex).limit(limit);
    
    const pagination={}
    
    if(endIndex<total){
        pagination.next={
            page: page+1,
            limit,
        };
    }

    if(startIndex>0){
        pagination.prev={
            page: page-1,
            limit,
        };
    }

    const products = await productQuery.populate("reviews");
    res.status(201).json({
        status:"success",
        total,
        pagination,
        results:products.length,
        message:"Products fetched successfully",
        products,

    });
});
export const getProductCtrl= asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id).populate("reviews");
    if(!product){
        throw new Error("Product not found");
    }else{
        res.json({
            status:"success",
            message:"product fetched successfully",
            product,
        });
    }
});
export const UpdateProductCtrl = asyncHandler(async(req,res)=>{
    const{ name,description,category,colors,sizes,price,totalQty,user,brand }=req.body;
    const product=await Product.findByIdAndUpdate(req.params.id,{
        name,
        description,
        category,
        colors,
        sizes,
        price,
        totalQty,
        user,
        brand,
    },
    {
        new:true,
    }).populate("reviews");
    res.json({
        status:"success",
        message:"Product updated successfully",
        product,
    });
});
export const DeleteProductCtrl = asyncHandler(async(req,res)=>{
    const product=await Product.findByIdAndDelete(req.params.id);
    if(!product){
        throw new Error("Product not found");
    }
    res.json({
        status:"success",
        message:"Product Deleted successfully",
        product,
    });
});