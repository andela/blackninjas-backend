import express from 'express';
import userRoute from './user.route';
import tripsRoute from './trip.route';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/trip', tripsRoute);


export default Router;
