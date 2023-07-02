/** @format */

import { authRouter, postRouter, uploadRouter } from './index.js';

const initRoutes = (app) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  app.use('/upload', uploadRouter);
};

export { initRoutes };
