import express from 'express';
import bodyParser from 'body-parser';
import swagger from './routes/swagger';
import userRoute from './routes/userRoute';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/API/v1', swagger);
app.use('/api/v1/auth', userRoute);
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Barefoot Nomad!' }));

export default app;
