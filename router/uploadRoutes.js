/** @format */

import express from 'express';
import multer from 'multer';
import { checkAuth } from '../utils/index.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default uploadRouter;
