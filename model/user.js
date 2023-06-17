import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        },
    ],
    wishLists:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wishList",
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasShippingAddress: {
        type: Boolean,
        default: false,
    },
    ShippingAddress: {
        firstName: { 
            type: String,
        },
        lastName: { 
            type: String,
        },
        address: { 
            type: String,
        },
        city: { 
            type: String,
        },
        postalcode: { 
            type: String,
        },
        province: { 
            type: String,
        },
        country: { 
            type: String,
        },
        phone: { 
            type: String,
        },
    },
},
{
timestamps: true,
}
);
const user = mongoose.model("User", userSchema);

export default user;