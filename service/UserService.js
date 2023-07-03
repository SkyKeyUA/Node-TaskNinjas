/** @format */

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

class UserService {
  async register(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`A user with the email address ${email} already exists`);
    }

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
  }
}

export default UserService;
