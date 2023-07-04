/** @format */

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/User.js';
import { mailService, tokenService } from './index.js';
import { UserDto } from '../dtos/userDTO.js';

class UserService {
  async registration(email, password, fullName, avatarUrl) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`A user with the email address ${email} already exists`);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const activationLink = uuidv4();

    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
      activationLink,
    });

    const user = await doc.save();

    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const { passwordHash, ...userData } = user._doc;

    return {
      ...tokens,
      userData,
    };
  }
}

const userService = new UserService();

export { userService };
