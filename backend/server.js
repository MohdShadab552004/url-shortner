import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import urlRouter from './routes/urlRoute.js';
import adminRouter from './routes/adminRoute.js';

const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('URL Shortener API');
});
app.use('/api', urlRouter);
app.use('/admin', adminRouter);

connectDB();
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
