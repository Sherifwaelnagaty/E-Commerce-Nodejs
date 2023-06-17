import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema= Schema({
    name:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    images:{
        type:String,
        default:"https://via.placeholder.com/150"
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
const Category = mongoose.model("Category", CategorySchema);
export default Category;