import dotenv from 'dotenv';
import Stripe from 'stripe';

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
import orderRoutes from '../routes/orderRoute.js';
import Order from '../model/Order.js';

//stripe
const stripe = new Stripe(process.env.STRIPE_KEY);
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
app.use('/api/v1/orders/',orderRoutes);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_4eb8a7d1f545f64e09af1efe7b60d37625578ee50e909fc0310bb4ae5d90f4ff";

app.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("event");
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if(event.type === 'checkout.session.completed'){
    //update order
    const session = event.data.object;
    const {orderId} = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency= session.currency;
    console.log({orderId, paymentStatus,paymentMethod,totalAmount,currency});
    //find the order
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
      totalPrice:totalAmount/100,
      paymentStatus,
      paymentMethod,
      currency,
      },
      {
        new:true,
      }
    );
  }else{
    return;
  }
  // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));

//err middleware
app.use(NotfoundHandler);
app.use(globalErrHandler);

export default app;