/** @format */

import { ApiError } from '../exceptions/apiError.js';

const postMiddleware = async (req, res, next) => {
  try {
    req.userId = req.user.id;
    if (!req.userId) {
      return next(ApiError.UnauthorizedError());
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

export { postMiddleware };
