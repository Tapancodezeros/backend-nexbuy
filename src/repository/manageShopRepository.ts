import { Shop } from '../models/shopModel.js';
import { MESSAGES } from '../constants/messages.js';

export async function findAll() {
    return Shop.findAll();
}

export async function findById(id: number) {
    return Shop.findByPk(id);
}

export async function create(shopData: any) {
    return Shop.create(shopData);
}

export async function update(id: number, shopData: any) {
    const shop = await findById(id);
    if (!shop) {
        return null;
    }
    return shop.update(shopData);
}

export async function remove(id: number) {
    const shop = await findById(id);
    if (!shop) {
        return null;
    }
    await shop.destroy();
    return shop;
}

export async function findByOwnerId(ownerId: number) {
    return Shop.findAll({ where: { ownerId } });
}
