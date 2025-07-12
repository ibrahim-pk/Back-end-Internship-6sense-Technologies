import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../modules/category';


const categoryRouter = Router();


categoryRouter.post('/create-category', createCategory);
categoryRouter.get('/get-categories', getCategories);
categoryRouter.put('/categories/:id', updateCategory);
categoryRouter.delete('/categories/:id', deleteCategory);

export default categoryRouter;
