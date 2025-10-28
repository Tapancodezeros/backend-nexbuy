"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
let users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
];
const getAllUsers = () => users;
exports.getAllUsers = getAllUsers;
const getUserById = (id) => users.find((user) => user.id === id);
exports.getUserById = getUserById;
const createUser = (newUser) => {
    users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const updateUser = (id, updatedUser) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), updatedUser);
        return users[userIndex];
    }
    return undefined;
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);
    return users.length < initialLength;
};
exports.deleteUser = deleteUser;
