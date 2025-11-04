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
    return await Shop.create(shopData);
}

export async function updateShop(id: number, updateData: any) {
    return await shopRepository.update(id, updateData);
}

export async function deleteShop(id: number) {
    return await shopRepository.remove(id);
}

export async function getShopsByOwnerId(ownerId: number) {
    return await shopRepository.findByOwnerId(ownerId);
}
