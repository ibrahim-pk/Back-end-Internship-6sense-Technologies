import { Request, Response } from 'express';
import { SubCategory } from '../../model/subcategory';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';


export const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { name, description, category } = req.body;

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Invalid category ID',
    });
  }

  const exists = await SubCategory.findOne({ name, category });
  if (exists) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'SubCategory already exists under this category',
    });
  }

  const subcategory = await SubCategory.create({ name, description, category });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'SubCategory created successfully',
    data: subcategory,
  });
});

export const getSubCategories = catchAsync(async (_: Request, res: Response) => {
  const subcategories = await SubCategory.find().populate('category', 'name');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'SubCategories fetched successfully',
    data: subcategories,
  });
});

export const getSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subcategory = await SubCategory.findById(req.params.id).populate('category', 'name');

  if (!subcategory) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'SubCategory not found',
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'SubCategory retrieved',
    data: subcategory,
  });
});

export const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingSubCategory = await SubCategory.findById(id);
  if (!existingSubCategory) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'SubCategory not found',
    });
  }

  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: 'Invalid category ID',
      });
    }
  }

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    {
      name: req.body.name ?? existingSubCategory.name,
      category: req.body.category ?? existingSubCategory.category,
    },
    { new: true }
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'SubCategory updated successfully',
    data: updatedSubCategory,
  });
});

export const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const productUsingSubCategory = await Product.findOne({ subcategory: id });
  if (productUsingSubCategory) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Cannot delete subcategory: products exist under this subcategory',
    });
  }

  const deleted = await SubCategory.findByIdAndDelete(id);
  if (!deleted) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'SubCategory not found',
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'SubCategory deleted successfully',
  });
});
