import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import productRoutes from '../routes/productRoute.js';
import { globalErrHandler,NotfoundHandler } from "../middlewares/globalErrHandler.js";
import categoryroutes from '../routes/categoryRoute.js';
import brandroutes from '../routes/brandRoute.js';
import colorroutes from '../routes/colorRoute.js';
import reviewroutes from '../routes/reviewRoute.js';
//connect to db
dbConnect();
const app = express();
//pass incoming data
app.use(express.json());
//routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products/',productRoutes);
app.use('/api/v1/categories/',categoryroutes);
app.use('/api/v1/brands/',brandroutes);
app.use('/api/v1/colors/',colorroutes);
app.use('/api/v1/reviews/',reviewroutes);
//err middleware
app.use(NotfoundHandler);
app.use(globalErrHandler);

export default app;