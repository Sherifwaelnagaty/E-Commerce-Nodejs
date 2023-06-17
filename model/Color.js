import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ColorSchema= Schema({
    name:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    products:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        }
    ],
    
},
{
    timestamps: true,
});
const Color = mongoose.model("Color", ColorSchema);
export default Color;