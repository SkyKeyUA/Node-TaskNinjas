/** @format */

import express from 'express';
import { loginValidation, registerValidation } from '../validations/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { getMe, login, register, refresh } from '../controllers/index.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidation, handleValidationErrors, login);
authRouter.post('/register', registerValidation, handleValidationErrors, register);
authRouter.get('/me', checkAuth, getMe);

authRouter.get('/refresh', refresh);

export default authRouter;
