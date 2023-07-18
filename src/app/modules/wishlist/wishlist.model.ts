import { Schema, model } from 'mongoose';
import { IWishlist, WishlistModel } from './wishlist.interface';

export const WishlistSchema = new Schema<IWishlist, WishlistModel>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
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

export const Wishlist = model<IWishlist, WishlistModel>(
  'Wishlist',
  WishlistSchema,
);
