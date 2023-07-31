import Express  from "express";
import { createProductCtrl, getProductsCtrl,getProductCtrl,UpdateProductCtrl, DeleteProductCtrl } from "../controllers/productsCrtl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";
//build routes
const productRoutes = Express.Router();

//create routes
productRoutes.post("/create",isLoggedIn,isAdmin,upload.array("files"),createProductCtrl);
productRoutes.get("/",getProductsCtrl);
productRoutes.get("/:id",getProductCtrl);
productRoutes.put("/:id",isLoggedIn,isAdmin,UpdateProductCtrl);
productRoutes.delete("/:id/delete",isLoggedIn,isAdmin,DeleteProductCtrl);




export default productRoutes;