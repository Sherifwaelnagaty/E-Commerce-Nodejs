import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
import Order from '../model/Order.js';
import User from '../model/user.js';
import Product from '../model/Product.js';
import Coupon from '../model/Coupon.js';
const stripe = new Stripe(process.env.STRIPE_KEY);
export const createOrderCrtl= asyncHandler(async(req,res)=>{
    const coupon = req.query;
    const couponExist = await Coupon.findOne({
        code:coupon?.toUpperCase(),
    });
    if(couponExist?.isExpired){
        throw new Error("coupon is expired");
    }
    if(!couponExist){
        throw new Error("invalid coupon");
    }
    const discount = couponExist?.discount / 100;
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
        totalPrice :couponExist? totalPrice - (totalPrice * discount):totalPrice,
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
export const getOrdersCrtl= asyncHandler(async(req,res)=>{
const order=await User.find();

res.json({
    status:"success",
    message:"Orders fetched successfully",
    order,
});
});  
export const getOrderCrtl= asyncHandler(async(req,res)=>{
    const order=await User.findById(req.params.id);
    if(!order){
        throw new Error("Order not found");
    }
    res.json({
        status:"success",
        message:"Order fetched successfully",
        order,
    });
});  
export const updateOrderCrtl= asyncHandler(async(req,res)=>{
    const id= req.params.id;
    const order=await Order.findByIdAndUpdate(id,{
        status:req.body.status,
    },
    {
        new:true
    });
    res.json({
        success:true,
        message:"Order updated successfully",
        order,
    });
});
export const getSalesSumCrtl= asyncHandler(async(req,res)=>{
    const sales = await Order.aggregate([
        {
            $group:{
                _id:null,
                totalSales:{
                    $sum:"$totalPrice"
                },
            }
        }
    ]);
    res.json({
        status:"success",
        message:"Sales fetched successfully",
        sales,
    });
});
export const getMinMaxOrderCrtl = asyncHandler(async(req,res)=>{
    const sales = await Order.aggregate([
        {
            $group:{
                _id:null,
                minSales:{
                    $min:"$totalPrice"
                },
                maxSales:{
                    $max:"$totalPrice"
                }
            }
        }
    ]);
});
export const getAvgOrderCrtl = asyncHandler(async(req,res)=>{
    const sales = await Order.aggregate([
        {
            $group:{
                _id:null,
                avgSales:{
                    $avg:"$totalPrice"
                }
            }
        }
    ]);
});