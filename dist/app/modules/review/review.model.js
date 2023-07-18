'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Review = exports.ReviewSchema = void 0;
const mongoose_1 = require('mongoose');
exports.ReviewSchema = new mongoose_1.Schema(
  {
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
exports.Review = (0, mongoose_1.model)('Review', exports.ReviewSchema);
