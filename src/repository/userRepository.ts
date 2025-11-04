import { User } from '../models/userModel.js';

async function findAll() {
    return User.findAll();
}

async function findById(id: number) {
    return User.findByPk(id);
}

async function findByEmail(email: string) {
    return User.findOne({ where: { email } });
}

async function create(userData: any) {
    return User.create(userData);
}

async function update(id: number, updateData: any) {
    return User.update(updateData, { where: { id } });
}

async function remove(id: number) {
    return User.destroy({ where: { id } });
}   

export { findAll, findById, findByEmail, create, update, remove };