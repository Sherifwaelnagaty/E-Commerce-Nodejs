import Express  from "express";
import { createProductCtrl, getProductsCtrl,getProductCtrl,UpdateProductCtrl, DeleteProductCtrl } from "../controllers/productsCrtl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
isLoggedIn
//build routes
const productRoutes = Express.Router();

//create routes
productRoutes.post("/create",isLoggedIn,createProductCtrl);
productRoutes.get("/",getProductsCtrl);
productRoutes.get("/:id",getProductCtrl);
productRoutes.put("/:id",isLoggedIn,UpdateProductCtrl);
productRoutes.delete("/:id/delete",isLoggedIn,DeleteProductCtrl);




export default productRoutes;