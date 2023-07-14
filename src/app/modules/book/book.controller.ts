import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFilterableFields } from '../../../constants/filterableFields';
import { paginationFields } from '../../../constants/pagination';
import { IBook } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
// import { CowService } from './cow.service';
// import { ICow } from './cow.interface';
// import pick from '../../../shared/pick';
// import { paginationFields } from '../../../constants/pagination';
// import { cowFilterableFields } from '../../../constants/filterableFields';
// import ApiError from '../../../errors/ApiError';
// import { Cow } from './cow.model';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookData } = req.body;
    const result = await BookService.createBook(bookData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book Created successfully',
      data: result,
    });
  },
);

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);

  const paginationOption = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOption);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  // const validUser = await Book.findById(id).populate('user');

  // if (validUser?.user?._id?.toString() !== req?.user?._id) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'This is not your Book');
  // }

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Updated successfully',
    data: result,
  });
});

// const deleteCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const isCowExist = await Cow.findById(id);
//   if (!isCowExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Cow does not exist');
//   }

//   const validUser = await Cow.findById(id).populate('seller');

//   if (validUser?.seller?._id?.toString() !== req?.user?._id) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'This is not your cow');
//   }

//   const result = await CowService.deleteCow(id);

//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow Deleted Successfully',
//     data: result,
//   });
// });

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  //   getAllCows,
  //   getSingleCow,
  //   deleteCow,
  //   updateCow,
};
