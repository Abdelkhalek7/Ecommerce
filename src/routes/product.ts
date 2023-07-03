import { Router  } from "express";
import { CreateProducts,getProduct,getProducts,updateProduct } from "../controller/productController";

const router =Router();
router.post('/',CreateProducts);
router.get('/All',getProducts);
router.get('/:id',getProduct);
router.patch('/:id',updateProduct);


export default router;