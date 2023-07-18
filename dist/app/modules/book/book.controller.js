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
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const book_service_1 = require('./book.service');
const pick_1 = __importDefault(require('../../../shared/pick'));
const filterableFields_1 = require('../../../constants/filterableFields');
const pagination_1 = require('../../../constants/pagination');
const book_model_1 = require('./book.model');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const createBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const bookData = __rest(req.body, []);
    const result = yield book_service_1.BookService.createBook(bookData);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book Created successfully',
      data: result,
    });
  }),
);
const createComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const commentData = req.body.comments;
    console.log(id, commentData);
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book does not exist',
      );
    }
    const result = yield book_service_1.BookService.createComment(
      id,
      commentData,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Comment Added Successfully',
      data: result,
    });
  }),
);
const getAllBooks = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      filterableFields_1.bookFilterableFields,
    );
    const paginationOption = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields,
    );
    const result = yield book_service_1.BookService.getAllBooks(
      filters,
      paginationOption,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Books retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }),
);
const getSpecificAllBooks = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.userEmail;
    const result = yield book_service_1.BookService.getSpecificAllBooks(
      userEmail,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Your Books retrieved successfully',
      data: result,
    });
  }),
);
const getSingleBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  }),
);
const getComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.getComment(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Comment retrieved successfully',
      data: result,
    });
  }),
);
const updateBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const id = req.params.id;
    const updatedData = req.body;
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book does not exist',
      );
    }
    const validUser = yield book_model_1.Book.findById(id).populate('user');
    if (
      ((_b =
        (_a =
          validUser === null || validUser === void 0
            ? void 0
            : validUser.user) === null || _a === void 0
          ? void 0
          : _a._id) === null || _b === void 0
        ? void 0
        : _b.toString()) !==
      ((_c = req === null || req === void 0 ? void 0 : req.user) === null ||
      _c === void 0
        ? void 0
        : _c._id)
    ) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'This is not your Book',
      );
    }
    const result = yield book_service_1.BookService.updateBook(id, updatedData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book Updated successfully',
      data: result,
    });
  }),
);
const deleteBook = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const id = req.params.id;
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book does not exist',
      );
    }
    const validUser = yield book_model_1.Book.findById(id).populate('user');
    if (
      ((_e =
        (_d =
          validUser === null || validUser === void 0
            ? void 0
            : validUser.user) === null || _d === void 0
          ? void 0
          : _d._id) === null || _e === void 0
        ? void 0
        : _e.toString()) !==
      ((_f = req === null || req === void 0 ? void 0 : req.user) === null ||
      _f === void 0
        ? void 0
        : _f._id)
    ) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'This is not your book',
      );
    }
    const result = yield book_service_1.BookService.deleteBook(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Book Deleted Successfully',
      data: result,
    });
  }),
);
exports.BookController = {
  createBook,
  createComment,
  getAllBooks,
  getSingleBook,
  getComment,
  updateBook,
  deleteBook,
  getSpecificAllBooks,
};
