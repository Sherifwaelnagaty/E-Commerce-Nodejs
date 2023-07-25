import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
import Order from '../model/Order.js';
import User from '../model/user.js';
import Product from '../model/Product.js';
const stripe = new Stripe(process.env.STRIPE_KEY);
export const createOrderCrtl= asyncHandler(async(req,res)=>{
    // Get the payload(Shipping address,order items,total price);
    const{shippingAddress,orderItems,totalPrice}=req.body;
    //find the user
    const user=await User.findById(req.userAuthId);
    // check if user has address
    // if(user?.hasShippingAddress){
    //     throw new Error("User has no shipping address");
    // }
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
    //create stripe session
    //convert order items to stripe line items
    const convertedOrders = orderItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item?.name,
              description: item?.description,
            },
            unit_amount: item?.price * 100,
          },
          quantity: item?.qty,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items:convertedOrders,
        metadata:{
            orderId:JSON.stringify(order?._id),
        },
        mode:"payment",
        success_url:"https://localhost:3000/success",
        cancel_url:"https://localhost:3000/cancel",
    });
    res.send({url:session.url});
    //update totalSold
    // const products = await Product.find({_id:{$in:orderItems}});
    // orderItems.map(async(order)=>{
    //     const product= products.find((order)=>{
    //         return order?._id?.toString()===order?._id?.toString();
    //     });
    //     if(product){
    //         product.totalSold += order?.qty;
    //     }
    //     await product.save();
    // });
    // res.json({
    //     status:"success",
    //     message:"Order created successfully",
    //     order,
    // });

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