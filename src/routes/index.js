import express from 'express';
import userRoute from './user.route';

const Router = express.Router();
Router.use('/auth', userRoute);

export default Router;
