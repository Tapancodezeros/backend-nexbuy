
import { Request, Response } from 'express';
// Import all new CUD functions
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../service/userService.js'; 

async function listUsers(req: Request, res: Response) {
     try {
        const users = await getAllUsers();
        res.status(200).json({ status: 'success', results: users.length, data: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

async function getOneUser(req: Request, res: Response) {
    // ... (implementation here)
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return res.status(400).json({ status: 'error', message: 'Invalid user ID format.' });
        const user = await getUserById(userId);
        res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) return res.status(404).json({ status: 'error', message: errorMessage });
        res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
}

// --- CREATE (C) ---
async function createNewUser(req: Request, res: Response) {
    try {
       
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields (firstName, lastName).' });
        }
        
        const newUser = await createUser(req.body);
        // 201 Created status
        res.status(201).json({
            status: 'success',
            message: 'User created successfully (mocked).',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

// --- UPDATE (U) ---
async function updateExistingUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return res.status(400).json({ status: 'error', message: 'Invalid user ID format.' });
        
        const updatedUser = await updateUser(userId, req.body);
        
        res.status(200).json({
            status: 'success',
            message: `User ${userId} updated successfully (mocked).`,
            data: updatedUser
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) return res.status(404).json({ status: 'error', message: errorMessage });
        res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
}

// --- DELETE (D) ---
async function deleteExistingUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return res.status(400).json({ status: 'error', message: 'Invalid user ID format.' });
        
        const deletedUser = await deleteUser(userId);
        res.status(200).json({
            status: 'success',
            message: `User ${userId} deleted successfully (mocked).`,
            data: deletedUser
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) return res.status(404).json({ status: 'error', message: errorMessage });
        res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
}

export {
    listUsers,
    getOneUser,
    createNewUser,
    updateExistingUser,
    deleteExistingUser
};