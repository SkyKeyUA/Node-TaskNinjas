/** @format */

import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/authMiddleware.js';

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

uploadRouter.post('/', authMiddleware, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default uploadRouter;
