import express from 'express';
import userRouter from './userRoutes.js';
import productRouter from './productRoutes.js';
import manageShopRouter from './manageShopRoutes.js';
import contactRouter from './contactRoutes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/contact', contactRouter);
router.use('/manage-shop', manageShopRouter);

export default router;