import { Router } from 'express';
import { createSubCategory, deleteSubCategory, getSingleSubCategory, getSubCategories, updateSubCategory } from '../modules/subCategory';


const subCategoryRouter = Router();

subCategoryRouter.post('/create-subcategory', createSubCategory);
subCategoryRouter.get('/get-subcategories', getSubCategories);
subCategoryRouter.get('/subcategories/:id', getSingleSubCategory);
subCategoryRouter.put('/subcategories/:id', updateSubCategory);
subCategoryRouter.delete('/subcategories/:id', deleteSubCategory);

export default subCategoryRouter;
