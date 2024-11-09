import express from 'express';
import { ProductController } from './product.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';

const productController = new ProductController();
const productRouter = express.Router();

productRouter.post('/rate', productController.rateProduct);
productRouter.get('/filter', productController.filterProduct);
productRouter.get('/averageRating', productController.averageRating);
productRouter.get('/average', productController.categoryAveragePrice);
productRouter.get('/', productController.getAllProducts);
productRouter.post('/',upload.single('imageUrl'), productController.addProduct);
productRouter.get('/:id', productController.findProductById);


export default productRouter;