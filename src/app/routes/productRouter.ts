import { Router } from 'express';
import { createProduct, deleteProduct, getFilteredProducts, getSingleProduct, updateProduct } from '../modules/product';


const productRouter = Router();

productRouter.post('/create-product', createProduct);
productRouter.get('/get-products', getFilteredProducts);
productRouter.get('/products/:id', getSingleProduct);
productRouter.put('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
