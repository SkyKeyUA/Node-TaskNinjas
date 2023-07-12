/** @format */

import express from 'express';
import { postCreateValidation } from '../validations/index.js';
import { handleValidationErrors } from '../utils/index.js';
import { PostController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { postMiddleware } from '../middlewares/postMiddleware.js';

const postRouter = express.Router();

postRouter.get('/', PostController.getPages);
postRouter.get('/:id', PostController.getOne);
postRouter.post(
  '/',
  authMiddleware,
  postMiddleware,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
);
postRouter.delete('/:id', authMiddleware, postMiddleware, PostController.remove);
postRouter.patch(
  '/:id',
  authMiddleware,
  postMiddleware,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

export default postRouter;
