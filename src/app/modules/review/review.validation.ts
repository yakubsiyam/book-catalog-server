import { z } from 'zod';

const reviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),
  }),
});

export const ReviewValidation = {
  reviewZodSchema,
};
