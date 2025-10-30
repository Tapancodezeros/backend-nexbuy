import { User } from '../models/userModel.js';
import { MESSAGES } from '../constants/messages.js';

export async function findAll() {
    return User.findAll();
}

export async function findById(id: number) {
    return User.findByPk(id);
}

export async function create(userData: any) {
    return User.create(userData);
}

export async function update(id: number, updateData: any) {
    const user = await findById(id);
    if (!user) {
        throw new Error(MESSAGES.USER.NOT_FOUND(id));
    }
    return user.update(updateData);
}

export async function remove(id: number) {
    const user = await findById(id);
    if (!user) {
        throw new Error(MESSAGES.USER.NOT_FOUND(id));
    }
    await user.destroy();
    return user;
}

export function findByUsername(username: any) {
    throw new Error('Function not implemented.');
}
