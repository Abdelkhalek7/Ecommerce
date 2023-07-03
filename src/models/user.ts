import { Schema, model, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from "bcrypt";

export enum UserType {
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
      validator: (value: string) => isEmail(value),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: { type: String, required: true },
  type: { type: String, enum: Object.values(UserType) },
});


userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    try {
     
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error:any) {
      return next(error);
    }
  }
  next();
});

export const auth =async(email:string,password:string) => {
 const user=await User.findOne({ email: email})
if (!user) {
  throw new Error("Wrong Username or password")
}

if (await bcrypt.compare(password,user.password)) {
  return true;
}
throw new Error("Wrong Username or password")
}


userSchema.post<IUser>('save', function (error: any, doc: any, next: any) {
  if (error.code === 11000 ) {
    next(new Error('Email address already exists'));
  } else {
    next(error);
  }
});

export const User = model<IUser>('User', userSchema);
