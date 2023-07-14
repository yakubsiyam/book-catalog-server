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
import { IBook } from './book.interface';
import { User } from '../user/user.model';
import { Book } from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const userDetails = await User.findById(book.user);
  //   console.log(userDetails);

  if (!userDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

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

// const getAllCows = async (
//   filters: ICowFilter,
//   paginationOption: IPaginationOption
// ): Promise<IGenericResponse<ICow[]>> => {
//   const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

//   const andCondition = [];

//   if (searchTerm) {
//     andCondition.push({
//       $or: cowSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   if (minPrice !== undefined) {
//     andCondition.push({
//       price: {
//         $gte: minPrice,
//       },
//     });
//   }

//   if (maxPrice !== undefined) {
//     andCondition.push({
//       price: {
//         $lte: maxPrice,
//       },
//     });
//   }

//   if (minPrice !== undefined && maxPrice !== undefined) {
//     andCondition.push({
//       price: {
//         $gte: minPrice,
//         $lte: maxPrice,
//       },
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andCondition.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOption);

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

//   const result = await Cow.find(whereCondition)
//     .populate('seller')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Cow.countDocuments(whereCondition);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// const getSingleCow = async (id: string): Promise<ICow | null> => {
//   const result = await Cow.findById(id).populate('seller');
//   return result;
// };

// const updateCow = async (
//   id: string,
//   payload: Partial<ICow>
// ): Promise<ICow | null> => {
//   const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   }).populate('seller');
//   return result;
// };

// const deleteCow = async (id: string): Promise<ICow | null> => {
//   const result = await Cow.findByIdAndDelete(
//     { _id: id },
//     { new: true }
//   ).populate('seller');

//   return result;
// };

export const BookService = {
  createBook,
  //   getAllCows,
  //   getSingleCow,
  //   deleteCow,
  //   updateCow,
};
