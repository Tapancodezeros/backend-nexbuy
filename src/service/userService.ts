import * as userRepository from '../repository/userRepository.js';
import bcrypt from 'bcrypt';
import { MESSAGES } from '../constants/messages.js';

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

async function loginUser(email: string, password: string): Promise<any> {
    const user = await userRepository.findByEmail(email);
    
    if (!user) {
        throw new Error(MESSAGES.USER.INVALID_CREDENTIALS_LOGIN);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error(MESSAGES.USER.INVALID_CREDENTIALS_LOGIN);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    return userWithoutPassword;
}

export {getAllUsers,getUserById,createUser,updateUser,deleteUser,loginUser};