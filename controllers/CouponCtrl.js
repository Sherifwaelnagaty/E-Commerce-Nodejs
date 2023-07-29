import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";
export const createCouponCrtl = asyncHandler(async (req, res) => {
    const {code,startDate,endDate,discount} = req.body;
    const couponExist = await Coupon.findOne({code});
    if(couponExist) {
        throw new Error("coupon already exists");
    }
    if(isNaN(discount)){
        throw new Error("discount must be a number");
    }
    const coupon = await Coupon.create({
        code,
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    });
    res.json({
        status: "success",
        msg: "coupon created",
        coupon,
    });
}); 
export const getAllCouponsCrtl = asyncHandler(async(req,res)=>{
    const coupons = await Coupon.find();
    res.json({
        status:"success",
        msg:"coupons fetched successfully",
        coupons,
    });
});
