"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel = __importStar(require("../models/userModel"));
const getUsers = (req, res) => {
    const users = userModel.getAllUsers();
    res.json(users);
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const user = userModel.getUserById(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send('User not found');
    }
};
exports.getUser = getUser;
const createUser = (req, res) => {
    const newUser = userModel.createUser(req.body);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const updatedUser = userModel.updateUser(req.params.id, req.body);
    if (updatedUser) {
        res.json(updatedUser);
    }
    else {
        res.status(404).send('User not found');
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const success = userModel.deleteUser(req.params.id);
    if (success) {
        res.status(204).send();
    }
    else {
        res.status(404).send('User not found');
    }
};
exports.deleteUser = deleteUser;
