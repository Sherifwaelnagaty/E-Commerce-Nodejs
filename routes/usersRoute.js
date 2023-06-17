import Express from "express";
import { registerUserCtrl } from "../controllers/usersCrtl.js";
import {loginUserCtrl} from "../controllers/usersCrtl.js";
import {getUserProfileCtrl} from "../controllers/usersCrtl.js";
import{isLoggedIn} from "../middlewares/isLoggedIn.js";

const userRoutes = Express.Router();

userRoutes.post("/register",registerUserCtrl);
userRoutes.post("/login",loginUserCtrl);
userRoutes.get("/profile",isLoggedIn,getUserProfileCtrl);


export default userRoutes;