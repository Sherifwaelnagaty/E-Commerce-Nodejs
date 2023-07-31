import Express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCouponCrtl } from "../controllers/CouponCtrl.js";
import { getAllCouponsCrtl } from "../controllers/CouponCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
const couponroutes=Express.Router();

couponroutes.post("/",isLoggedIn,isAdmin,createCouponCrtl);
couponroutes.post("/",isLoggedIn,getAllCouponsCrtl);



export default couponroutes;