
import jwt from"jsonwebtoken"
import bcrypt from "bcrypt";
import { User, IUser } from "../models/user";

export const auth =async(email:string,password:string) => {
 const user=await User.findOne({ email: email})
if (!user) {
  throw new Error("Wrong Username or password")
}

if (await bcrypt.compare(password,user.password)) {
  return user;
}
throw new Error("Wrong Username or password")
}

export const createtoken=(user:IUser) =>{
   return jwt.sign({
    data: user
  }, process.env.secret_key||"hi", { expiresIn: '24h' });
}


export const verifytoken=(token:string) :IUser =>{
    return jwt.verify(token, process.env.secret_key||"hi")as IUser;
 }