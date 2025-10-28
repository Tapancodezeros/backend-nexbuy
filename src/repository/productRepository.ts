import { Product } from '../models/productModel.js';

export async function findAll() {
 return Product.findAll();
}

export async function findById(id: number) {
 return Product.findByPk(id);
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
