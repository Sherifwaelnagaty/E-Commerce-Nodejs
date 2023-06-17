import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BrandSchema= Schema({
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
const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;