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
exports.WishlistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const wishlist_model_1 = require("./wishlist.model");
const book_model_1 = require("../book/book.model");
const createWishlist = (wishlist) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isValid = yield wishlist_model_1.Wishlist.findOne({
        userEmail: wishlist === null || wishlist === void 0 ? void 0 : wishlist.userEmail,
        book: wishlist === null || wishlist === void 0 ? void 0 : wishlist.book,
    }).populate('book');
    const isBookExist = book_model_1.Book.findById(wishlist === null || wishlist === void 0 ? void 0 : wishlist.book);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book Not found');
    }
    if ((isValid === null || isValid === void 0 ? void 0 : isValid.userEmail) === (wishlist === null || wishlist === void 0 ? void 0 : wishlist.userEmail) &&
        ((_a = isValid === null || isValid === void 0 ? void 0 : isValid.book) === null || _a === void 0 ? void 0 : _a._id.toString()) === (wishlist === null || wishlist === void 0 ? void 0 : wishlist.book)) {
        throw new ApiError_1.default(http_status_1.default.ALREADY_REPORTED, 'Already in your wishlist');
    }
    const result = (yield wishlist_model_1.Wishlist.create(wishlist)).populate('book');
    return result;
});
const getMyAllWishlist = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.find({ userEmail: userEmail }).populate('book');
    return result;
});
exports.WishlistService = {
    createWishlist,
    getMyAllWishlist,
};
