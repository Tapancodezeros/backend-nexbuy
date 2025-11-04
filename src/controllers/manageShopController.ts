import { Request, Response } from 'express';
import {getAllShops,getShopById,createShop,updateShop,deleteShop, getShopsByOwnerId} from '../service/manageShopService.js';
import { STATUS, MESSAGES, HTTP_STATUS } from '../constants/messages.js';

const getShopId = (req: Request): number => Number(req.params.id);
export async function listShops(req: Request, res: Response) {
    try {
        const shops = await getAllShops();
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: shops.length, data: shops });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export async function listShopsByUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId);
        if (isNaN(userId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.USER.INVALID_ID });
        }
        const shops = await getShopsByOwnerId(userId);
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, results: shops.length, data: shops });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export async function getOneShop(req: Request, res: Response) {
    try {
        const shopId = getShopId(req);
        if (isNaN(shopId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.INVALID_ID });
        }
        const shop = await getShopById(shopId);
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, data: shop });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export async function createNewShop(req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId);
        if (isNaN(userId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.USER.INVALID_ID });
        }
        if (!req.body.name) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.MISSING_FIELDS });
        }
        const newShop = await createShop({ ...req.body, ownerId: userId });
        res.status(HTTP_STATUS.CREATED).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.SHOP.CREATED,
            data: newShop
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export async function updateExistingShop(req: Request, res: Response) {
    try {
        const shopId = getShopId(req);
        if (isNaN(shopId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.INVALID_ID });
        }
        const updatedShop = await updateShop(shopId, req.body);
        if (!updatedShop) return res.status(HTTP_STATUS.NOT_FOUND).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.NOT_FOUND(shopId) });

        res.status(HTTP_STATUS.OK).json({
            status: STATUS.SUCCESS,
            message: MESSAGES.SHOP.UPDATED(shopId),
            data: updatedShop
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}

export async function deleteExistingShop(req: Request, res: Response) {
    try {
        const shopId = getShopId(req);
        if (isNaN(shopId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.INVALID_ID });
        }
        const deletedShop = await deleteShop(shopId);
        if (!deletedShop) return res.status(HTTP_STATUS.NOT_FOUND).json({ status: STATUS.ERROR, message: MESSAGES.SHOP.NOT_FOUND(shopId) });
        res.status(HTTP_STATUS.OK).json({ status: STATUS.SUCCESS, message: MESSAGES.SHOP.DELETED(shopId) });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: STATUS.ERROR, message: (error as Error).message });
    }
}
