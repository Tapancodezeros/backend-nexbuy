import { Product } from '../models/productModel.js';
import { sequelize } from '../config/database.js';

export async function findAll() {
 return Product.findAll();
}

export async function findById(id: number) {
 return Product.findByPk(id);
}

export async function findByCategory(category: string) {
    return Product.findAll({
        where: {
            category: category
        }
    });
}

export async function findDistinctCategories() {
    return Product.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
        where: { category: { $ne: null } } // Ensure we don't get null categories
    });
}

export async function create(productData: any) {
 return Product.create(productData);
}

export async function update(id: number, updateData: any) {
 const product = await findById(id);
 if (!product) {
 throw new Error(`Product with ID ${id} not found.`);
 }
 return product.update(updateData);
}

export async function remove(id: number) {
 const product = await findById(id);
 if (!product) {
 throw new Error(`Product with ID ${id} not found.`);
 }
 await product.destroy();
 return product;
}
