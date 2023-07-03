import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { HydratedDocument,Document } from "mongoose";
import {auth,createtoken,verifytoken} from '../service/user.auth'
import {  Request, Response } from "express";


export const CreateUser: RequestHandler<any,any,IUser> = async (
  req,
  res
) => {
  try {
    const user: HydratedDocument<IUser> = new User(req.body);
    await user.save();
    return res.send(user);
  } catch (e:any) {
    return res.status(400).send({error:e.message});
  }
};

export const getUsers: RequestHandler = async (
  req,
  res
) => {
  try {
    
    const users=await User.find();
    return res.send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getUser: RequestHandler = async (
  req,
  res
) => {
  try {
    const user=await User.findById(req.params.id);
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateUser: RequestHandler<any, any, IUser> = async (req:{body:IUser,user?:IUser}, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user!._id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const login: RequestHandler<any,any,IUser> = async (
  req,
  res
) => {
  try {
   const user=await auth(req.body.email,req.body.password)

   const token = createtoken(user)
  
    return res.send({token});
  } catch (e:any) {
    return res.status(400).send({error:e.message});
  }
};