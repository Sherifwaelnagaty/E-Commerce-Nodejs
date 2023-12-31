import mongoose from "mongoose";
//create random number
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
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
        type: String,
        default: randomTxt + randomNumbers,
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
    totalPrice:{
        type: Number,
        required: true,
        default: 0.00,
    },
},
{
    timestamps: true,
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;