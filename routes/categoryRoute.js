import { CreateCategoryCtrl,getCategoryCtrl,getAllCategoriesCtrl,updateCategoryCtrl,deleteCategoryCtrl } from "../controllers/CategoryCtrl.js";
import Express  from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

//build routes
const categoryroutes = Express.Router();


categoryroutes.post("/create",isLoggedIn,CreateCategoryCtrl);
categoryroutes.get("/",getAllCategoriesCtrl);
categoryroutes.get("/:id",getCategoryCtrl);
categoryroutes.put("/:id",isLoggedIn,updateCategoryCtrl);
categoryroutes.delete("/:id",isLoggedIn,deleteCategoryCtrl);


export default categoryroutes;