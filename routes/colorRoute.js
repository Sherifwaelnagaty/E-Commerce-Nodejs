import Express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { CreateColorCtrl, deleteColorCtrl, getAllColorsCtrl, getColorCtrl, updateColorCtrl } from "../controllers/ColorCtrl.js";

const colorroutes=Express.Router();

colorroutes.post("/create",isLoggedIn,CreateColorCtrl);
colorroutes.get("/",getAllColorsCtrl);
colorroutes.get("/:id",getColorCtrl);
colorroutes.put("/:id",isLoggedIn,updateColorCtrl);
colorroutes.delete("/:id",isLoggedIn,deleteColorCtrl);


export default colorroutes;