import { CreateCategoryCtrl,getCategoryCtrl,getAllCategoriesCtrl,updateCategoryCtrl,deleteCategoryCtrl } from "../controllers/CategoryCtrl.js";
import Express  from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import CategoryUpload from "../config/categoryUpload.js";
import isAdmin from "../middlewares/isAdmin.js";
//build routes
const categoryroutes = Express.Router();


categoryroutes.post("/create",isLoggedIn,isAdmin,CategoryUpload.single("file"),CreateCategoryCtrl);
categoryroutes.get("/",getAllCategoriesCtrl);
categoryroutes.get("/:id",getCategoryCtrl);
categoryroutes.put("/:id",isLoggedIn,isAdmin,updateCategoryCtrl);
categoryroutes.delete("/:id",isLoggedIn,isAdmin,deleteCategoryCtrl);


export default categoryroutes;