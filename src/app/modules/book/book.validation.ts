import { z } from 'zod';

const bookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
    userEmail: z.string({
      required_error: 'User Email Date is required',
    }),
    user: z.string().optional(),
  }),
});

export const BookValidation = {
  bookZodSchema,
};
