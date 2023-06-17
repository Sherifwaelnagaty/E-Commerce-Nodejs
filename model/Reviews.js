import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ReviewSchema= Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: [true,"Review must belong to a user"],
    },
    product:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        required: [true,"Review must belong to a product"],
    },
    message:{
        type: String,
        required: [true,"please enter your message"],
    },
    rating:{
        type: Number,
        required: [true,"please add a rating between 1 and 5"],
        min: 1,
        max: 5,
    },
    
},
{
    timestamps: true,
});
const Review = mongoose.model("Review", ReviewSchema);
export default Review;