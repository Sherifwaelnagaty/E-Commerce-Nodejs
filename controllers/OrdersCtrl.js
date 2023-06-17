import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
export const createOrderCrtl= asyncHandler(async(req,res)=>{
    const{shippingAddress,user,}=req.body;
});
export const getOrderCrtl= asyncHandler(async(req,res)=>{
const order=await Order.findById(req.params.id);
if(!order){
    throw new Error("Order not found");
}
res.json({
    status:"success",
    message:"Order fetched successfully",
    order,
});
});