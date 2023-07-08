/** @format */

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/User.js';
import { mailService, tokenService } from './index.js';
import { UserDto } from '../dtos/userDTO.js';
import { ApiError } from '../exceptions/apiError.js';

class UserService {
  async registration(email, password, fullName, avatarUrl) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`A user with the email address ${email} already exists`);
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

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );

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
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('invalid link activation');
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User not found`);
    }
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      throw ApiError.BadRequest(`The login or password is not correct`);
    }
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
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({
      ...userDto,
    });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      userDto,
    };
  }
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

const userService = new UserService();

export { userService };
