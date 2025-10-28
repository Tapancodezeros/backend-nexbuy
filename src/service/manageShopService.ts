import { Shop } from '../models/shopModel.js';
import * as shopRepository from '../repository/manageShopRepository.js';

export async function getAllShops() {
    return await shopRepository.findAll();
}

export async function getShopById(id: number) {
    const shop = await shopRepository.findById(id);
    if (!shop) throw new Error(`Shop with ID ${id} not found.`);
    return shop;
}

export async function createShop(shopData: any) {
    // In a real app, you'd have more validation here
    return await Shop.create(shopData);
}

export async function updateShop(id: number, updateData: any) {
    const shop = await getShopById(id);
    return await shop.update(updateData);
}

export async function deleteShop(id: number) {
    const shop = await getShopById(id);
    await shop.destroy();
    return shop;
}
