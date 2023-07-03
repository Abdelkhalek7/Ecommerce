import { Schema, model, Document, Error } from 'mongoose';
import validator from 'validator';

enum UserType {
  Admin = 'Admin',
  User = 'User',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  type: UserType;
}



const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: { type: String, required: true },
  type: { type: String, enum: Object.values(UserType) },
});



userSchema.post<IUser>('save', function (error: any, doc: any, next: any) {
  if (error.code === 11000 ) {
    next(new Error('Email address already exists'));
  } else {
    next(error);
  }
});

export const User = model<IUser>('User', userSchema);
