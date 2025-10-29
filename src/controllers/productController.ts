import { Request, Response } from 'express';
import {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct, getProductsByCategory} from '../service/productService.js'; 

const getProductId = (req: Request): number => Number(req.params.id);
async function listProducts(req: Request, res: Response) {
    try {
        const products = await getAllProducts();
        res.status(200).json({ status: 'success', results: products.length, data: products });
    } catch (error) {
 
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

async function listProductsByCategory(req: Request, res: Response) {
    try {
        const category = req.params.category;
        const products = await getProductsByCategory(category);
        res.status(200).json({ status: 'success', results: products.length, data: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

async function getOneProduct(req: Request, res: Response) {
    try {
        const productId = getProductId(req); 
        
        if (isNaN(productId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID format.' });
        }
        
        const product = await getProductById(productId);

        res.status(200).json({ status: 'success', data: product });
    } catch (error) {
        // All service errors result in a 500 status
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

// --- CREATE (C) ---
async function createNewProduct(req: Request, res: Response) {
    try {
        if (!req.body.title || !req.body.price) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields (title, price).' });
        }
        
        const newProduct = await createProduct(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Product created successfully (mocked).',
            data: newProduct
        });
    } catch (error) {
        // All service errors result in a 500 status
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

async function updateExistingProduct(req: Request, res: Response) {
    try {
        const productId = getProductId(req);
        if (isNaN(productId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID format.' });
        }
        
        const updatedProduct = await updateProduct(productId, req.body);
        
        res.status(200).json({
            status: 'success',
            message: `Product ${productId} updated successfully (mocked).`,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

async function deleteExistingProduct(req: Request, res: Response) {
    try {
        const productId = getProductId(req);
        if (isNaN(productId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID format.' });
        }
        
        const deletedProduct = await deleteProduct(productId);
        
        res.status(200).json({
            status: 'success',
            message: `Product ${productId} deleted successfully (mocked).`,
            data: deletedProduct
        });
    } catch (error) {
        // All service errors result in a 500 status
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

export { listProducts, getOneProduct, createNewProduct, updateExistingProduct, deleteExistingProduct, listProductsByCategory };