import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';

export type IWishlist = {
  book?: Types.ObjectId | IBook;
  userEmail: string;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
