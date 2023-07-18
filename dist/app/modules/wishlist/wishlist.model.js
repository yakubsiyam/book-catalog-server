'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Wishlist = exports.WishlistSchema = void 0;
const mongoose_1 = require('mongoose');
exports.WishlistSchema = new mongoose_1.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    book: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Book',
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
exports.Wishlist = (0, mongoose_1.model)('Wishlist', exports.WishlistSchema);
