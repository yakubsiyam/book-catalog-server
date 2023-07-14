/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  _id?: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password' | '_id'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export type IRefreshTokenResponse = {
  accessToken: string;
};
