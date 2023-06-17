import Express from "express";
import { createOrderCrtl, getOrderCrtl } from "../controllers/OrdersCtrl.js";

const orderroutes = Express.Router();
orderroutes.post("/", createOrderCrtl);
orderroutes.get("/:id", getOrderCrtl);
export default orderroutes;