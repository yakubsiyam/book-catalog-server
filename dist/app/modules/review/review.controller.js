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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const review_service_1 = require('./review.service');
// import pick from '../../../shared/pick';
// import { bookFilterableFields } from '../../../constants/filterableFields';
// import { paginationFields } from '../../../constants/pagination';
// import { IBook } from './book.interface';
// import { Book } from './book.model';
// import ApiError from '../../../errors/ApiError';
// import { CowService } from './cow.service';
// import { ICow } from './cow.interface';
// import pick from '../../../shared/pick';
// import { paginationFields } from '../../../constants/pagination';
// import { cowFilterableFields } from '../../../constants/filterableFields';
// import ApiError from '../../../errors/ApiError';
// import { Cow } from './cow.model';
const createReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const reviewData = __rest(req.body, []);
    const result = yield review_service_1.ReviewService.createReview(
      bookId,
      reviewData,
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Review Created successfully',
      data: result,
    });
  }),
);
// const getAllBooks = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, bookFilterableFields);
//   const paginationOption = pick(req.query, paginationFields);
//   const result = await BookService.getAllBooks(filters, paginationOption);
//   sendResponse<IBook[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
exports.ReviewController = {
  createReview,
};
