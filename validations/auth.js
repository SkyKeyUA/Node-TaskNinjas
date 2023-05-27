/** @format */

import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
  body('fullName', 'Enter a name').isLength({ min: 2 }),
  body('avatarUrl', 'Wrong link to the avatar').optional().isURL(),
];
