import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookService } from './book.service';
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

// const getAllCows = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, cowFilterableFields);

//   const paginationOption = pick(req.query, paginationFields);

//   const result = await CowService.getAllCows(filters, paginationOption);

//   sendResponse<ICow[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cows retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const getSingleCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await CowService.getSingleCow(id);

//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow retrieved successfully',
//     data: result,
//   });
// });

// const updateCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   const isCowExist = await Cow.findById(id);
//   if (!isCowExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Cow does not exist');
//   }

//   const validUser = await Cow.findById(id).populate('seller');

//   if (validUser?.seller?._id?.toString() !== req?.user?._id) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'This is not your cow');
//   }

//   const result = await CowService.updateCow(id, updatedData);

//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow Updated successfully',
//     data: result,
//   });
// });

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
  //   getAllCows,
  //   getSingleCow,
  //   deleteCow,
  //   updateCow,
};
