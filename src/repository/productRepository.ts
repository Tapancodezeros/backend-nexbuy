import { Product } from '../models/productModel.js';
import { sequelize } from '../config/database.js';
import { MESSAGES } from '../constants/messages.js';
import { Op } from 'sequelize';

export async function findAll() {
 return Product.findAll();
}

export async function findById(id: number) {
 return Product.findByPk(id);
}

export async function findByCategory(category: string) {
    return Product.findAll({
        where: {
            category: {
                [Op.iLike]: category
            }
        }
    });
}

export async function findDistinctCategories() {
    return Product.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
        where: { category: { [Op.ne]: null } } // Ensure we don't get null categories
    });
}

export async function create(productData: any) {
 return Product.create(productData);
}

export async function update(id: number, updateData: any) {
 const product = await findById(id);
 if (!product) {
 throw new Error(MESSAGES.PRODUCT.NOT_FOUND(id));
 }
 return product.update(updateData);
}

export async function remove(id: number) {
 const product = await findById(id);
 if (!product) {
 throw new Error(MESSAGES.PRODUCT.NOT_FOUND(id));
 }
 await product.destroy();
 return product;
}
