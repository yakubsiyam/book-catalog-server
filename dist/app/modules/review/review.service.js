'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewService = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
// import { ICow, ICowFilter } from './cow.interface';
// import { Cow } from './cow.model';
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
// import { User } from '../user/user.model';
// import {
//   IGenericResponse,
//   IPaginationOption,
// } from '../../../interfaces/pagination';
// import { cowSearchableFields } from '../../../constants/searchableFields';
// import { paginationHelpers } from '../../../helpers/paginationHelper';
// import { IBook, IBookFilter } from './book.interface';
// import { User } from '../user/user.model';
// import { Book } from './book.model';
// import {
//   IGenericResponse,
//   IPaginationOption,
// } from '../../../interfaces/pagination';
// import { bookSearchableFields } from '../../../constants/searchableFields';
// import { paginationHelpers } from '../../../helpers/paginationHelpers';
// import { SortOrder } from 'mongoose';
const review_model_1 = require('./review.model');
const createReview = (id, review) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newReviewAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const newReview = yield review_model_1.Review.create([review], {
        session,
      });
      if (!newReview.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create new Book',
        );
      }
      newReviewAllData = newReview[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    //   if (newBookAllData) {
    //     newBookAllData = await User.findOne({ id: newBookAllData.id }).populate({
    //       path: 'Book',
    //     });
    //   }
    return newReviewAllData;
  });
// const updateBook = async (
//   id: string,
//   payload: Partial<IBook>,
// ): Promise<IBook | null> => {
//   const result = await Book.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   }).populate('user');
//   return result;
// };
exports.ReviewService = {
  createReview,
  //   getAllBooks,
  //   getSingleBook,
  //   updateBook,
  //   deleteBook,
};
