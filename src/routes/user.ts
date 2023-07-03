
import { Router  } from "express";
import { CreateUser,getUser,getUsers,updateUser } from "../controller/userController";

const router =Router();
router.post('/',CreateUser);
router.get('/All',getUsers);
router.get('/:id',getUser);
router.patch('/:id',updateUser);


export default router;