import { Request, Response } from 'express';
import { Category } from '../../model/category';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { SubCategory } from '../../model/subcategory';

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const exists = await Category.findOne({ name });
  if (exists) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Category already exists',
    });
  }

  const category = await Category.create({ name, description });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

export const getCategories = catchAsync(async (_: Request, res: Response) => {
  const categories = await Category.find();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories fetched successfully',
    data: categories,
  });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingCategory = await Category.findById(id);
  if (!existingCategory) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Category not found',
    });
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name: req.body.name ?? existingCategory.name,
      description: req.body.description ?? existingCategory.description,
    },
    { new: true }
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findOne({ category: id });
  if (subCategory) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Cannot delete category:subcategory  exist under this category',
    });
  }

  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Category not found',
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
  });
});
