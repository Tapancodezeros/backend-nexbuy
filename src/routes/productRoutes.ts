// routes/productRoutes.ts
import express from 'express';
import {listProducts, getOneProduct, createNewProduct, updateExistingProduct, deleteExistingProduct, listProductsByCategory} from '../controllers/productController.js';

const router = express.Router();

router.get('/', listProducts);

router.post('/', createNewProduct); 

router.get('/category/:category', listProductsByCategory);

router.get('/:id', getOneProduct);

router.patch('/:id', updateExistingProduct);

router.delete('/:id', deleteExistingProduct); 

export default router;