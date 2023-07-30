import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema= Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    brand:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    colors:{
        type:[String],
        required: true
    },
    sizes:{
        type:[String],
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    reviews:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }
    ],
    images:[
    {
        type:[String],
        required: true,
    }
    ],
    category:{
        type:String,
        ref: "Category",
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    totalQty:{
        type:Number,
        required: true,
    },
    totalSold:{
        type:Number,
        required: true,
        default: 0,
    },
},
{
    timestamps: true,
    toJSON:{ virtuals:true},

});
//virtuals
productSchema.virtual("Qtyleft").get(function(){
const product = this;
return product?.totalQty - product?.totalSold;
});
productSchema.virtual("totalReviews").get(function(){
const product = this;
return product?.reviews?.length;
});
productSchema.virtual("avgRating").get(function(){
let totalrating = 0;
const product = this;
product?.reviews?.forEach((review)=> {
    totalrating += review?.rating;
});
const avgRating =Number(totalrating/product?.reviews?.length).toFixed(2);
return avgRating;    
});

const Product = mongoose.model("Product", productSchema);
export default Product;