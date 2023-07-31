import Express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { CreateColorCtrl, deleteColorCtrl, getAllColorsCtrl, getColorCtrl, updateColorCtrl } from "../controllers/ColorCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorroutes=Express.Router();

colorroutes.post("/create",isLoggedIn,isAdmin,CreateColorCtrl);
colorroutes.get("/",getAllColorsCtrl);
colorroutes.get("/:id",getColorCtrl);
colorroutes.put("/:id",isLoggedIn,isAdmin,updateColorCtrl);
colorroutes.delete("/:id",isLoggedIn,isAdmin,deleteColorCtrl);


export default colorroutes;