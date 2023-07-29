import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CouponSchema = new Schema({
    code:{
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
        default: 0,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true,
    toJSON: {virtuals: true},
});
CouponSchema.virtual('isExpired').get(function(){
return Date.now() > this.endDate;
});
CouponSchema.virtual('Daysleft').get(function(){
    return Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24));
});
CouponSchema.pre('validate', function(next){
    if(this.startDate > this.endDate){
        next(new Error("start date must be less than end date"));
    }
    next();
});
CouponSchema.pre('validate', function(next){
    if(this.discount < 0 || this.discount > 100 ){
        next(new Error("discount must be greater than 0"));
    }
    next();
});
CouponSchema.pre('validate',function(next){
    if(this.startDate < Date.now()){
        next(new Error("start date must be greater than today"));
    }
    next();
});
const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;