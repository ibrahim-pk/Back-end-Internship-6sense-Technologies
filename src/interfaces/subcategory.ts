import { Types } from 'mongoose';

export interface ISubCategory {
  name: string;
  category: Types.ObjectId;
}
