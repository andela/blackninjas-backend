import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import swagger from './routes/swagger';
import Route from './routes/index';
import './config/passport.config';

const app = express();
passport.serializeUser((user, done) => {
  done(null, user);
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1', swagger, Route);
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Barefoot Nomad!' }));

export default app;
