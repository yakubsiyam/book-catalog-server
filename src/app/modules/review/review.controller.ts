import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
// import pick from '../../../shared/pick';
// import { bookFilterableFields } from '../../../constants/filterableFields';
// import { paginationFields } from '../../../constants/pagination';
// import { IBook } from './book.interface';
// import { Book } from './book.model';
// import ApiError from '../../../errors/ApiError';
// import { CowService } from './cow.service';
// import { ICow } from './cow.interface';
// import pick from '../../../shared/pick';
// import { paginationFields } from '../../../constants/pagination';
// import { cowFilterableFields } from '../../../constants/filterableFields';
// import ApiError from '../../../errors/ApiError';
// import { Cow } from './cow.model';

const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const { ...reviewData } = req.body;
    const result = await ReviewService.createReview(bookId, reviewData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review Created successfully',
      data: result,
    });
  },
);

// const getAllBooks = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, bookFilterableFields);

//   const paginationOption = pick(req.query, paginationFields);

//   const result = await BookService.getAllBooks(filters, paginationOption);

//   sendResponse<IBook[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

export const ReviewController = {
  createReview,
};
