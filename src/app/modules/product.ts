import { Request, Response } from 'express';
import crypto from 'crypto';
import catchAsync from '../../shared/catchAsync';
import { Category } from '../../model/category';
import { SubCategory } from '../../model/subcategory';
import { Product } from '../../model/product';
import sendResponse from '../../shared/sendResponse';


function generateProductCode(name: string): string {
  const str = name.toLowerCase();
  let substrings: { start: number; end: number; str: string }[] = [];
  let maxLen = 0;
  let start = 0;

  for (let i = 1; i <= str.length; i++) {
    const prev = str[i - 1];
    const curr = str[i];

    if (
      i < str.length &&
      /[a-z]/.test(prev) &&
      /[a-z]/.test(curr) &&
      curr > prev
    ) {
      continue;
    } else {
      const len = i - start;
      if (len > 1) {
        const substr = str.slice(start, i);
        if (len > maxLen) {
          maxLen = len;
          substrings = [{ start, end: i - 1, str: substr }];
        } else if (len === maxLen) {
          substrings.push({ start, end: i - 1, str: substr });
        }
      }
      start = i;
    }
  }

  if (substrings.length === 0) {
    substrings.push({ start: 0, end: 0, str: str[0] || '' });
  }

  const concatStr = substrings.map((s) => s.str).join('');
  const startIndex = substrings[0].start;
  const endIndex = substrings[substrings.length - 1].end;

  const hash = crypto
    .createHash('md5')
    .update(name)
    .digest('hex')
    .slice(0, 7);

  return `${hash}-${startIndex}${concatStr}${endIndex}`;
}



export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    discount,
    image,
    status,
    subcategory,
  } = req.body;

  const subCategoryExists = await SubCategory.findById(subcategory);

  if (!subCategoryExists) {
    throw new Error('Invalid  subcategory');
  }

  const productCode = generateProductCode(name);

  const existing = await Product.findOne({ productCode });
  if (existing) throw new Error('Product code already exists');

  const newProduct = await Product.create({
    name,
    description,
    price,
    discount,
    image,
    status,
    subcategory,
    productCode,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

export const getFilteredProducts = catchAsync(async (req: Request, res: Response) => {
  let { subcategory, search, page = '1', limit = '10' } = req.query;
  console.log( req.query)

  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  // Build filter query object
  const filter: any = {};

  if (subcategory) {
    filter.subcategory = subcategory;
  }

 if (search) {
  const words = (search as string).split(' ').filter(Boolean);

  filter.$or = words.map(word => ({
    name: { $regex: word, $options: 'i' }
  }));
}

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate('subcategory', 'name')
    .skip(skip)
    .limit(limitNum)
    .lean(); 

  const productsWithFinalPrice = products.map((p) => {
    const discountPercent = p.discount ?? 0;
    const originalPrice = p.price ?? 0;
    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;

    return {
      ...p,
      originalPrice,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
    };
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Filtered products fetched successfully',
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
    },
    data: productsWithFinalPrice,
  });
});

export const getSingleProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name')
    .populate('subcategory', 'name');

  if (!product) throw new Error('Product not found');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved',
    data: product,
  });
});


export const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const existingProduct = await Product.findById(id);
  if (!existingProduct) throw new Error('Product not found');

  const updatedData = {
    ...existingProduct.toObject(),
    ...req.body,
  };

  if (req.body.name && req.body.name !== existingProduct.name) {
    const newCode = generateProductCode(req.body.name);

    const existingCode = await Product.findOne({ productCode: newCode });
    if (existingCode && existingCode._id.toString() !== id) {
      throw new Error('Generated product code already exists. Please choose a different name.');
    }

    updatedData.productCode = newCode;
  }

  const updated = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated',
    data: updated,
  });
});


export const deleteProduct = catchAsync(async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) throw new Error('Product not found or already deleted');

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: deleted,
  });
});
