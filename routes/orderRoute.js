import Express from "express";
import { createOrderCrtl, getOrderCrtl } from "../controllers/OrdersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const orderroutes = Express.Router();
orderroutes.post("/",isLoggedIn,createOrderCrtl);
orderroutes.get("/:id", getOrderCrtl);
export default orderroutes;