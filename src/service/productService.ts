import { Product } from '../models/productModel.js';
import * as productRepository from '../repository/productRepository.js';

export async function getAllProducts() {
    return await productRepository.findAll();
}

export async function getProductById(id: number) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error(`Product with ID ${id} not found.`);
    return product;
}

export async function getProductsByCategory(category: string) {
    return await productRepository.findByCategory(category);
}

export async function getProductsByShopId(shopId: number) {
    return await productRepository.findByShopId(shopId);
}

export async function getAllCategories() {
    const categories = await productRepository.findDistinctCategories();
    return categories.map(c => c.getDataValue('category')).filter(Boolean); // Extract just the category name and filter out any falsy values
}

export async function createProduct(productData: any) {
    return await Product.create(productData);
}

export async function updateProduct(id: number, updateData: any) {
    const product = await getProductById(id);
    return await product.update(updateData);
}

export async function deleteProduct(id: number) {
    const product = await getProductById(id);
    await product.destroy();
    return product;
} 