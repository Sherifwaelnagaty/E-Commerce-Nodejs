import Product from "../model/Product.js";
import Review from "../model/Reviews.js";
import asyncHandler from "express-async-handler";





export const createReviewsCtrl = asyncHandler(async (req, res) => {
    const{message,product,rating}=req.body;
    const productID = req.params.ProductID;
    const productFound =await Product.findById(productID).populate("reviews");
    //check if product exists
    if(!productFound){
        throw new Error("Product not found");
    }
    //check if user has already reviewed the product
    const alreadyReviewed = productFound?.reviews?.find((review)=>{
        return review?.user?.toString() === req?.userAuthId?.toString();
    });
    if(alreadyReviewed){
        throw new Error("You have already reviewed this product");
    }   
    //create review
    const review = await Review.create({
        message,
        rating,
        product:productFound?._id,
        user:req.userAuthId,
    });
    //push review into product
    productFound.reviews.push(review?._id);
    //resave
    await productFound.save();
    res.json({
        status:"success",
        message:"Review written successfully",
    });
});