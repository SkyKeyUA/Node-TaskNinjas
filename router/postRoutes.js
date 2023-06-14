/** @format */

import express from 'express';
import { postCreateValidation } from '../validations/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { PostController } from '../controllers/index.js';

const postRouter = express.Router();

// postRouter.get('/', PostController.getAll);
postRouter.get('/', PostController.getPages);
postRouter.get('/:id', PostController.getOne);
postRouter.post(
  '/',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
);
postRouter.delete('/:id', checkAuth, PostController.remove);
postRouter.patch(
  '/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

export default postRouter;
