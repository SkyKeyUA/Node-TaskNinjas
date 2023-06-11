/** @format */

import jwt from 'jsonwebtoken';

const secretJWT = process.env.JWT_SECRET;

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, secretJWT);

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'No access',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
