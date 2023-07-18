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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const book_model_1 = require("./book.model");
const searchableFields_1 = require("../../../constants/searchableFields");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    // const userDetails = await User.findById(book.user);
    //   console.log(userDetails);
    // if (!userDetails) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    // }
    let newBookAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newBook = yield book_model_1.Book.create([book], { session });
        if (!newBook.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create new Book');
        }
        newBookAllData = newBook[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    //   if (newBookAllData) {
    //     newBookAllData = await User.findOne({ id: newBookAllData.id }).populate({
    //       path: 'Book',
    //     });
    //   }
    return newBookAllData;
});
const createComment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { comments: payload } }, {
        new: true,
    });
    return result;
});
const getAllBooks = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: searchableFields_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOption);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield book_model_1.Book.find(whereCondition)
        .populate('user')
        .sort(sortConditions);
    const total = yield book_model_1.Book.countDocuments(whereCondition);
    return {
        meta: {
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).populate('user');
    return result;
});
const getComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id, { comments: 1 });
    return result;
});
const getSpecificAllBooks = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({ userEmail: userEmail });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('user');
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete({ _id: id }, { new: true }).populate('user');
    return result;
});
exports.BookService = {
    createBook,
    createComment,
    getAllBooks,
    getSingleBook,
    getComment,
    updateBook,
    deleteBook,
    getSpecificAllBooks,
};
