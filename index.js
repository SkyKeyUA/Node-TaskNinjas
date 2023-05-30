/** @format */

import express from 'express';
import multer from 'multer';
// node.js is blocked by other domains, cors is the unlock blocked
import cors from 'cors';

import mongoose from 'mongoose';

import { loginValidation, registerValidation, postCreateValidation } from './validations/index.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

import { register, login, getMe, PostController } from './controllers/index.js';

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
//check the folder "uploads" on files
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// app.get('/posts', PostController.getAll);
app.get('/posts', PostController.getPages);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(process.env.PORT || 7777, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
