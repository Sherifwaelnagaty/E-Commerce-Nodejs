import Express from "express";
import { createOrderCrtl, getOrderCrtl, getOrdersCrtl } from "../controllers/OrdersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const orderroutes = Express.Router();
orderroutes.post("/",isLoggedIn,createOrderCrtl);
orderroutes.get("/:id",isLoggedIn ,getOrderCrtl);
orderroutes.get("/",isLoggedIn ,getOrdersCrtl);
export default orderroutes;