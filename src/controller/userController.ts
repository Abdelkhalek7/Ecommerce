import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { HydratedDocument,Document } from "mongoose";

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

export const updateUser: RequestHandler<{ id: number }, any, IUser> = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
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
