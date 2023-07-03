import { Router  } from "express";
import { CreateProducts,getProduct,getProducts,updateProduct } from "../controller/productController";
import {auth} from "../middleware/auth";
import {UserType} from '../models/user'

const router =Router();
router.post('/',auth(UserType.Admin),CreateProducts);
router.get('/All',auth(UserType.User),getProducts);
router.get('/:id',auth(UserType.User),getProduct);
router.patch('/:id',auth(UserType.Admin),updateProduct);


export default router;