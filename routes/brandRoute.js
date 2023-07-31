import Express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { CreateBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getBrandCtrl, updateBrandCtrl } from "../controllers/BrandsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandroutes=Express.Router();

brandroutes.post("/create",isLoggedIn,isAdmin,CreateBrandCtrl);
brandroutes.get("/",getAllBrandsCtrl);
brandroutes.get("/:id",getBrandCtrl);
brandroutes.put("/:id",isLoggedIn,isAdmin,updateBrandCtrl);
brandroutes.delete("/:id",isLoggedIn,isAdmin,deleteBrandCtrl);


export default brandroutes;