import { Request, Response } from 'express';
import {
    getAllShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop
} from '../service/manageShopService.js';

const getShopId = (req: Request): number => Number(req.params.id);

export async function listShops(req: Request, res: Response) {
    try {
        const shops = await getAllShops();
        res.status(200).json({ status: 'success', results: shops.length, data: shops });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

export async function getOneShop(req: Request, res: Response) {
    try {
        const shopId = getShopId(req);
        if (isNaN(shopId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid shop ID format.' });
        }
        const shop = await getShopById(shopId);
        res.status(200).json({ status: 'success', data: shop });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

export async function createNewShop(req: Request, res: Response) {
    try {
        if (!req.body.name || !req.body.ownerId) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields (name, ownerId).' });
        }
        const newShop = await createShop(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Shop created successfully.',
            data: newShop
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

export async function updateExistingShop(req: Request, res: Response) {
    try {
        const shopId = getShopId(req);
        if (isNaN(shopId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid shop ID format.' });
        }
        const updatedShop = await updateShop(shopId, req.body);
        res.status(200).json({
            status: 'success',
            message: `Shop ${shopId} updated successfully.`,
            data: updatedShop
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}

export async function deleteExistingShop(req: Request, res: Response) {
    try {
        const shopId = getShopId(req);
        if (isNaN(shopId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid shop ID format.' });
        }
        await deleteShop(shopId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ status: 'error', message: (error as Error).message });
    }
}
