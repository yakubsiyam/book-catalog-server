'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookValidation = void 0;
const zod_1 = require('zod');
const bookZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title is required',
    }),
    author: zod_1.z.string({
      required_error: 'Author is required',
    }),
    genre: zod_1.z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: zod_1.z.string({
      required_error: 'Publication Date is required',
    }),
    userEmail: zod_1.z.string({
      required_error: 'User Email Date is required',
    }),
    user: zod_1.z.string().optional(),
  }),
});
exports.BookValidation = {
  bookZodSchema,
};
