import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IComment = {
  comment?: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  img?: string;
  user?: Types.ObjectId | IUser;
  comments?: IComment[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilter = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationYear?: string;
};
