import mongoose from "mongoose";
//create random number
const randomtxt =Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomnumber=Math.floor(1000+Math.random()*10000);
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
    {
        type: Object,
        required: true,
    }
    ],
    shippingAddress: {
        type:Object,
        required: true, 
    },
    OrderNumber: {
        type: Number,
        required: true,
        default: randomnumber+randomtxt,
    },
    paymentStatus:{
        type: String,
        required: true,
        default: "Not Paid",
    },
    paymentMethod:{
        type: String,
        required: true,
        default:"Not Specified",
    },
    currency:{
        type: String,
        required: true,
        default:"Not Specified",
    },
    status:{
        type: String,
        default:"pending",
        enum: ["pending", "processing", "shipped", "delivered"],
    },
    delieveredAt:{
        type: Date,
    },
},
{
    timestamps: true,
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;