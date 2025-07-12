import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/product';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ['In Stock', 'Stock Out'],
      required: true,
    },
    productCode: { type: String, required: true, unique: true },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
