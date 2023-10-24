import express from 'express';
import router from './app/routes/index.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';


const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//Routes
app.get('/', (req, res) => {
  res.send("API is running....");
});

app.use(router);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});