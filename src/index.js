import { config } from 'dotenv';
import app from './app';

config(); // This enables dotenv configulations


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

export default app;
