import Express from 'express';
import { createReviewsCtrl } from '../controllers/ReviewsCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const reviewrouter = Express.Router();
reviewrouter.post('/:ProductID',isLoggedIn,createReviewsCtrl);

export default reviewrouter;