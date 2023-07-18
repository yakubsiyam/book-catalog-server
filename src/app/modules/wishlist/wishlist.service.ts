import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';
import { Book } from '../book/book.model';

const createWishlist = async (
  wishlist: IWishlist,
): Promise<IWishlist | null> => {
  const isValid = await Wishlist.findOne({
    userEmail: wishlist?.userEmail,
    book: wishlist?.book,
  }).populate('book');

  const isBookExist = Book.findById(wishlist?.book);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not found');
  }

  if (
    isValid?.userEmail === wishlist?.userEmail &&
    isValid?.book?._id.toString() === wishlist?.book
  ) {
    throw new ApiError(httpStatus.ALREADY_REPORTED, 'Already in your wishlist');
  }

  const result = (await Wishlist.create(wishlist)).populate('book');

  return result;
};

const getMyAllWishlist = async (userEmail: string): Promise<IWishlist[]> => {
  const result = await Wishlist.find({ userEmail: userEmail }).populate('book');

  return result;
};

export const WishlistService = {
  createWishlist,
  getMyAllWishlist,
};
