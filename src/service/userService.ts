import * as userRepository from '../repository/userRepository.js';

async function getAllUsers() {
    return userRepository.findAll();
}

async function getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error(`User with ID ${id} not found.`);
    }
    return user;
}

async function createUser(userData: any) {
    return userRepository.create(userData);
}

async function updateUser(id: number, updateData: any) {
    return userRepository.update(id, updateData);
}

async function deleteUser(id: number) {
    return userRepository.remove(id);
}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};