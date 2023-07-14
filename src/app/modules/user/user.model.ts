/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      //   select: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, 'email' | 'password' | '_id'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing user password
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

export const User = model<IUser, UserModel>('user', UserSchema);
