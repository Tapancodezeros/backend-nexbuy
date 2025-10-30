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

export async function update(id: number, updateData: any) {
    const shop = await findById(id);
    if (!shop) {
        throw new Error(MESSAGES.SHOP.NOT_FOUND(id));
    }
    return shop.update(updateData);
}

export async function remove(id: number) {
    const shop = await findById(id);
    if (!shop) {
        throw new Error(MESSAGES.SHOP.NOT_FOUND(id));
    }
    await shop.destroy();
    return shop;
}
