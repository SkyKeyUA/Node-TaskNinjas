/** @format */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import { tokenService, userService } from '../service/index.js';

const secretJWT = process.env.JWT_ACCESS_SECRET;

export const registration = async (req, res) => {
  try {
    const { email, password, fullName, avatarUrl } = req.body;
    const userData = await userService.registration(email, password, fullName, avatarUrl);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to registration',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'The login or password is not correct',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      secretJWT,
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to log in',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'No access',
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.json(['1523', '456']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'No access',
    });
  }
};

export const activate = async (req, res) => {
  try {
    const activationLink = req.params.link;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'No access',
    });
  }
};

export const refresh = async (req, res) => {
  try {
    res.json(['1523', '456']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'No access',
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    res.json(['1523', '456']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'No access',
    });
  }
};
