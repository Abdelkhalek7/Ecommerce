
import { Router  } from "express";
import { login,CreateUser,getUser,getUsers,updateUser } from "../controller/userController";

const router =Router();
router.post('/',CreateUser);
router.post('/login',login);

router.get('/All',getUsers);
router.get('/:id',getUser);
router.patch('/:id',updateUser);


export default router;