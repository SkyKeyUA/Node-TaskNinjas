/** @format */

import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { initRoutes } from './router/routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

initRoutes(app);

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
