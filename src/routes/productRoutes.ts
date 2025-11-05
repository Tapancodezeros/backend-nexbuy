
import express from 'express';
import {listProducts, getOneProduct, createNewProduct, updateExistingProduct, deleteExistingProduct, listProductsByCategory, listCategories, listProductsByShop} from '../controllers/productController.js';

const router = express.Router();

router.get('/', listProducts);

router.get('/categories', listCategories);

router.post('/', createNewProduct); 

router.get('/category/:category', listProductsByCategory);

router.get('/shop/:shopId', listProductsByShop);

router.get('/:id', getOneProduct);

router.patch('/:id', updateExistingProduct);

router.delete('/:id', deleteExistingProduct); 

export default router;