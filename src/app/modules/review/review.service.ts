import mongoose from 'mongoose';
// import { ICow, ICowFilter } from './cow.interface';
// import { Cow } from './cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
// import { User } from '../user/user.model';
// import {
//   IGenericResponse,
//   IPaginationOption,
// } from '../../../interfaces/pagination';
// import { cowSearchableFields } from '../../../constants/searchableFields';
// import { paginationHelpers } from '../../../helpers/paginationHelper';
// import { IBook, IBookFilter } from './book.interface';
// import { User } from '../user/user.model';
// import { Book } from './book.model';
// import {
//   IGenericResponse,
//   IPaginationOption,
// } from '../../../interfaces/pagination';
// import { bookSearchableFields } from '../../../constants/searchableFields';
// import { paginationHelpers } from '../../../helpers/paginationHelpers';
// import { SortOrder } from 'mongoose';
import { Review } from './review.model';
import { IReview } from './review.interface';

const createReview = async (
  id: string,
  review: IReview,
): Promise<IReview | null> => {
  let newReviewAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newReview = await Review.create([review], { session });

    if (!newReview.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new Book');
    }

    newReviewAllData = newReview[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //   if (newBookAllData) {
  //     newBookAllData = await User.findOne({ id: newBookAllData.id }).populate({
  //       path: 'Book',
  //     });
  //   }

  return newReviewAllData;
};

// const updateBook = async (
//   id: string,
//   payload: Partial<IBook>,
// ): Promise<IBook | null> => {
//   const result = await Book.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   }).populate('user');

//   return result;
// };

export const ReviewService = {
  createReview,
  //   getAllBooks,
  //   getSingleBook,
  //   updateBook,
  //   deleteBook,
};
