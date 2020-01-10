import express from 'express';
import userRoute from './user.route';
import tripsRoute from './trip.route';
import userSettings from './user.settings.route';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/trip', tripsRoute);
Router.use('/users', userSettings);
export default Router;
