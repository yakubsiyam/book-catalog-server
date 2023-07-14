import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
// import {
//   ICreateAdmin,
//   ILoginAdmin,
//   IloginAdminResponse,
//   IRefreshTokenResponse,
// } from './authAdmin.interface';
// import { CreateAdmin } from './authAdmin.model';
// import { Secret } from 'jsonwebtoken';
// import config from '../../../config';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from './user.model';
import { IUser } from './user.interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newUserAllData;
};

// const loginAdmin = async (
//   payload: ILoginAdmin,
// ): Promise<IloginAdminResponse> => {
//   const { phoneNumber, password } = payload;

//   // check admin exist
//   const isAdminExist = await CreateAdmin.isAdminExist(phoneNumber);

//   if (!isAdminExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not Exist');
//   }

//   if (
//     isAdminExist.password &&
//     !(await CreateAdmin.isPasswordMatched(password, isAdminExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   // create access token & refresh token
//   const { phoneNumber: adminPhoneNumber, role, _id } = isAdminExist;

//   const accessToken = jwtHelpers.createToken(
//     { adminPhoneNumber, role, _id },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );

//   const refreshToken = jwtHelpers.createToken(
//     { adminPhoneNumber, role, _id },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expires_in as string,
//   );

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   // verify Token
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret,
//     );
//   } catch (error) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { adminPhoneNumber } = verifiedToken;

//   // Checking Deleted Refresh token
//   const isAdminExist = await CreateAdmin.isAdminExist(adminPhoneNumber);
//   if (!isAdminExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not Exist');
//   }

//   //Generate new Token
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       _id: isAdminExist?._id,
//       role: isAdminExist?.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

export const AuthUserService = {
  createUser,
  //   loginAdmin,
};
