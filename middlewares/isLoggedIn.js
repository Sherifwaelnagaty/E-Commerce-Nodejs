import { verifyToken } from "../utils/verifyToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";

export const isLoggedIn =(req,res,next)=>{
    //get token from header
    const token=getTokenFromHeader(req);
    //verify token
    const decodedToken=verifyToken(token);
    if(!decodedToken){
       throw new Error("invalid token");
    }else{
        req.userAuthId=decodedToken?.id;
        next();

    }
};