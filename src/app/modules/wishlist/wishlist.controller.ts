import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WishlistService } from './wishlist.service';
import { IWishlist } from './wishlist.interface';

const createWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...wishlistData } = req.body;

    const result = await WishlistService.createWishlist(wishlistData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Wishlist Created successfully',
      data: result,
    });
  },
);

const getMyAllWishlist = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.params.userEmail;

  const result = await WishlistService.getMyAllWishlist(userEmail);

  sendResponse<IWishlist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish List retrieved successfully',
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getMyAllWishlist,
};
