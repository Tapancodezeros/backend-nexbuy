import { Request, Response } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../service/userService.js'; 
import { STATUS, MESSAGES, HTTP_STATUS } from '../constants/messages.js';

async function listUsers(req: Request, res: Response) {
     try {
        const users = await getAllUsers();
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: users.length, data: users });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function getOneUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.USER.INVALID_ID });
        const user = await getUserById(userId);
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, data: user });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) return res.status(HTTP_STATUS.NOT_FOUND).json({ status: STATUS.ERROR, message: errorMessage });
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

async function createNewUser(req: Request, res: Response) {
    try {       
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.USER.MISSING_FIELDS });
        }
        
        const newUser = await createUser(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.USER.CREATED,
            data: newUser
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

async function updateExistingUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.USER.INVALID_ID });
        const updatedUser = await updateUser(userId, req.body);
        res.status(HTTP_STATUS.OK).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.USER.UPDATED(userId),
            data: updatedUser
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) return res.status(HTTP_STATUS.NOT_FOUND).json({ status: STATUS.ERROR, message: errorMessage });
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

async function deleteExistingUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.USER.INVALID_ID });
        
        const deletedUser = await deleteUser(userId);
        res.status(HTTP_STATUS.OK).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.USER.DELETED(userId),
            data: deletedUser
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('not found')) return res.status(HTTP_STATUS.NOT_FOUND).json({ status: STATUS.ERROR, message: errorMessage });
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

export {listUsers,getOneUser,createNewUser,updateExistingUser,deleteExistingUser};