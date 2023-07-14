/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  _id?: string;
};

export type IloginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type UserModel = {
  isAdminExist(
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
