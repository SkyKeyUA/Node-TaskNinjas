/** @format */

import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { initRoutes } from './router/routes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use('/uploads', express.static('uploads'));
initRoutes(app);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('DB ok'))
      .catch((err) => console.log('DB error', err));
    app.listen(PORT, () => console.log('Server OK'));
  } catch (e) {
    console.log(e);
  }
};

start();
