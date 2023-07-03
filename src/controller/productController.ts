import { RequestHandler } from "express";
import { Product, IProduct } from "../models/product";
import { HydratedDocument,Document } from "mongoose";

export const CreateProducts: RequestHandler<any,any,IProduct> = async (
  req,
  res
) => {
  try {
    const product: HydratedDocument<IProduct> = new Product(req.body);
    await product.save();
    return res.send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getProducts: RequestHandler = async (
  req,
  res
) => {
  try {
    
    const products=await Product.find();
    return res.send(products);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getProduct: RequestHandler = async (
  req,
  res
) => {
  try {
    const product=await Product.findById(req.params.id);
    return res.send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateProduct: RequestHandler<{ id: number }, any, IProduct> = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(400).send(error);
  }
}
