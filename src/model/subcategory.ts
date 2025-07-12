import { Schema, model } from 'mongoose';
import { ISubCategory } from '../interfaces/subcategory';

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

export const SubCategory = model<ISubCategory>('SubCategory', subCategorySchema);
