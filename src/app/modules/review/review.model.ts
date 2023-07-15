import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

export const ReviewSchema = new Schema<IReview, ReviewModel>(
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

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
