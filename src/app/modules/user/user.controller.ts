import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthUserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthUserService.createUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthAdminService.loginAdmin(loginData);
//   const { refreshToken, ...others } = result;

//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin Login Successfully',
//     data: others,
//   });
// });

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthAdminService.refreshToken(refreshToken);

//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Refresh Token Created Successfully',
//     data: result,
//   });
// });

export const AuthUserController = {
  createUser,
  //   loginUser,
};
