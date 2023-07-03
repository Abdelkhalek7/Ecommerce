


import { ObjectId, Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IProduct {
  name: string;
  price: number;
  category: string;
}

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true}
});

// 3. Create a Model.
export const Product = model<IProduct>('Product', productSchema);
