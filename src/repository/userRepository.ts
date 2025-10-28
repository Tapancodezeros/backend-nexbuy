import { User } from '../models/userModel.js';

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
        throw new Error(`User with ID ${id} not found.`);
    }
    return user.update(updateData);
}

export async function remove(id: number) {
    const user = await findById(id);
    if (!user) {
        throw new Error(`User with ID ${id} not found.`);
    }
    await user.destroy();
    return user;
}