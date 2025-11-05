import { Request, Response } from 'express';
import {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct, getProductsByCategory, getAllCategories, getProductsByShopId} from '../service/productService.js'; 
import { STATUS, MESSAGES, HTTP_STATUS } from '../constants/messages.js';

const getProductId = (req: Request): number => Number(req.params.id);
async function listProducts(req: Request, res: Response) {
    try {
        const products = await getAllProducts();
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: products.length, data: products });
    } catch (error) { 
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function listProductsByCategory(req: Request, res: Response) {
    try {
        const category = req.params.category;
        const products = await getProductsByCategory(category);
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: products.length, data: products });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function listProductsByShop(req: Request, res: Response) {
    try {
        const shopId = Number(req.params.shopId);
        if (isNaN(shopId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.INVALID_ID });
        }
        const products = await getProductsByShopId(shopId);
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: products.length, data: products });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function listCategories(req: Request, res: Response) {
    try {
        const categories = await getAllCategories();
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: categories.length, data: categories });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function getOneProduct(req: Request, res: Response) {
    try {
        const productId = getProductId(req); 
        if (isNaN(productId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.PRODUCT.INVALID_ID });
        }
       
        const product = await getProductById(productId);

        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, data: product });
    } catch (error) {
        // All service errors result in a 500 status
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function createNewProduct(req: Request, res: Response) {
    try {
        if (!req.body.title || !req.body.price) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.PRODUCT.MISSING_FIELDS });
        }
        
        const newProduct = await createProduct(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.PRODUCT.CREATED,
            data: newProduct
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function updateExistingProduct(req: Request, res: Response) {
    try {
        const productId = getProductId(req);
        if (isNaN(productId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.PRODUCT.INVALID_ID });
        }
        
        const updatedProduct = await updateProduct(productId, req.body);
        
        res.status(HTTP_STATUS.OK).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.PRODUCT.UPDATED(productId),
            data: updatedProduct
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function deleteExistingProduct(req: Request, res: Response) {
    try {
        const productId = getProductId(req);
        if (isNaN(productId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.PRODUCT.INVALID_ID });
        }
        
        const deletedProduct = await deleteProduct(productId);
        
        res.status(HTTP_STATUS.OK).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.PRODUCT.DELETED(productId),
            data: deletedProduct
        });
    } catch (error) {
       res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export { listProducts, getOneProduct, createNewProduct, updateExistingProduct, deleteExistingProduct, listProductsByCategory, listCategories, listProductsByShop };