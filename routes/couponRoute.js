import Express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCouponCrtl } from "../controllers/CouponCtrl.js";
const couponroutes=Express.Router();

couponroutes.post("/",isLoggedIn,createCouponCrtl);


export default couponroutes;