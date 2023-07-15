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
import { IBook, IBookFilter } from './book.interface';
// import { User } from '../user/user.model';
import { Book } from './book.model';
import {
  IGenericResponse,
  IPaginationOption,
} from '../../../interfaces/pagination';
import { bookSearchableFields } from '../../../constants/searchableFields';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createBook = async (book: IBook): Promise<IBook | null> => {
  // const userDetails = await User.findById(book.user);
  //   console.log(userDetails);

  // if (!userDetails) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  // }

  let newBookAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newBook = await Book.create([book], { session });

    if (!newBook.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new Book');
    }

    newBookAllData = newBook[0];

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

  return newBookAllData;
};

const createComment = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { comments: payload } },
    {
      new: true,
    },
  );

  return result;
};

const getAllBooks = async (
  filters: IBookFilter,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereCondition)
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('user');
  return result;
};

const getComment = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id, { comments: 1 });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('user');

  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(
    { _id: id },
    { new: true },
  ).populate('user');

  return result;
};

export const BookService = {
  createBook,
  createComment,
  getAllBooks,
  getSingleBook,
  getComment,
  updateBook,
  deleteBook,
};
