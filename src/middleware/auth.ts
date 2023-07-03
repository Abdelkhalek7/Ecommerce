import { NextFunction, Request, Response } from "express";
import { verifytoken } from  "../service/user.auth";
import {UserType,IUser} from '../models/user'
export const auth= (userType:UserType)=>{return(
  request: Request&{body:IUser,user?:IUser},
  response: Response,
  next: NextFunction
)=> {
try {
    const authorization: string | undefined = request.headers.authorization;

  if (authorization === undefined) {
    throw new Error("unauthenticated Request.");
  }

  const [authorizationType, authorizationValue] = authorization.split(" ");

  if (authorizationType.toLocaleLowerCase() !== "bearer") {
    return response.send("unauthenticated.");
  }
  
  const user=verifytoken(authorizationValue)
  if(userType===UserType.Admin&&user.type!==UserType.Admin) {
    throw new Error("Unauthorized ,only for admin");

  }
  request.user=user;

  next();
} catch (error:any) {
    response.send({error: error.message})
}
  
}}