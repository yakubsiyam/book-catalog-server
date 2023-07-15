import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

export const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    comments: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
