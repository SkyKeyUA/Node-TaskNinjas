/** @format */

import express from 'express';
import { loginValidation, registrationValidation } from '../validations/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import {
  getMe,
  login,
  registration,
  refresh,
  logout,
  activate,
  getUsers,
} from '../controllers/index.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidation, handleValidationErrors, login);
authRouter.post('/registration', registrationValidation, handleValidationErrors, registration);
authRouter.get('/me', checkAuth, getMe);

authRouter.post('/logout', logout);
authRouter.get('/activate/:link', activate);
authRouter.get('/refresh', refresh);
authRouter.get('/users', authMiddleware, getUsers);

export default authRouter;
