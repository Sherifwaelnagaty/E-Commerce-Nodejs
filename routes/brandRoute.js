import Express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { CreateBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getBrandCtrl, updateBrandCtrl } from "../controllers/BrandsCtrl.js";

const brandroutes=Express.Router();

brandroutes.post("/create",isLoggedIn,CreateBrandCtrl);
brandroutes.get("/",getAllBrandsCtrl);
brandroutes.get("/:id",getBrandCtrl);
brandroutes.put("/:id",isLoggedIn,updateBrandCtrl);
brandroutes.delete("/:id",isLoggedIn,deleteBrandCtrl);


export default brandroutes;