"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// import config from '../../../config';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newUserAllData;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check admin exist
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not Exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // create access token & refresh token
    const { email: userEmail, _id } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, _id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, _id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
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
exports.AuthUserService = {
    createUser,
    loginUser,
};
