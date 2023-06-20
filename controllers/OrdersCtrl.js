import asyncHandler from 'express-async-handler';
import Order from '../model/Order.js';
import User from '../model/user.js';
import Product from '../model/Product.js';
export const createOrderCrtl= asyncHandler(async(req,res)=>{
    // Get the payload(Shipping address,order items,total price);
    const{shippingAddress,orderItems,totalPrice}=req.body;
    //find the user
    const user=await User.findById(req.userAuthId);
    // check if user has address
    if(user?.hasShippingAddress){
        throw new Error("User has no shipping address");
    }
    //check if order is not empty
    if(orderItems?.length<=0){
        throw new Error("No order items");
    }
    //create order 
    const order = await Order.create({
        user: user?._id,
        shippingAddress,
        orderItems,
        totalPrice,
    });
    //push order to user
    user.orders.push(order?._id);
    //send response 
    await user.save();
    //update totalSold
    const products = await Product.find({_id:{$in:orderItems}});
    orderItems.map(async(order)=>{
        const product= products.find((order)=>{
            return order?._id?.toString()===order?._id?.toString();
        });
        if(product){
            product.totalSold += order?.qty;
        }
        await product.save();
    });
    res.json({
        status:"success",
        message:"Order created successfully",
        order,
    });

});
export const getOrderCrtl= asyncHandler(async(req,res)=>{
const order=await User.findById(req.userAuthId);
if(!order){
    throw new Error("Order not found");
}
res.json({
    status:"success",
    message:"Order fetched successfully",
    order,
});
});