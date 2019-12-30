import express from 'express';
import userRoute from './user.route';
import tripsRoute from './trips.route';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/trips', tripsRoute);


export default Router;
