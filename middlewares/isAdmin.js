import User from '../models/userModel.js';
const isAdmin=async(req,res,next)=>{
    const user= await User.findById(req.userAuthId);
    if(user && user.isAdmin){
        next();
    }else{
        new(new Error('Not authorized as an admin'));
    }
}
export default isAdmin;