/** @format */

import { body } from 'express-validator';

export const postCreateValidation = [
  body('nickname', 'Enter the nickname of the article').isLength({ min: 3 }).isString(),
  body('realName', 'Enter the realName of the article').isLength({ min: 3 }).isString(),
  body('originDescription', 'Enter the originDescription of the article')
    .isLength({ min: 3 })
    .isString(),
  body('superpowers', 'Incorrect superpowers format').optional().isString(),
  body('catchPhrase', 'Incorrect catchPhrase format').optional().isString(),
  body('imageUrl', 'Incorrect image link').optional().isString(),
];
