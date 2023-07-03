/** @format */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import TokenService from '../service/tokenService.js';

const secretJWT = process.env.JWT_ACCESS_SECRET;

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const tokenService = new TokenService();
    const tokens = tokenService.generateTokens({ _id: user._id });
    await tokenService.saveToken(user._id, tokens.refreshToken);

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      tokens,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to register',
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
    res.json(['1523', '456']);
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
