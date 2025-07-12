import { Types } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  status: 'In Stock' | 'Stock Out';  
  productCode: string;
  subcategory: Types.ObjectId;
}
