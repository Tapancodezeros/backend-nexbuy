import express from 'express';
import {listShops,getOneShop,createNewShop,updateExistingShop,deleteExistingShop} from '../controllers/manageShopController.js';

const router = express.Router();

router.get('/', listShops);

router.post('/', createNewShop);

router.get('/:id', getOneShop);

router.patch('/:id', updateExistingShop);

router.delete('/:id', deleteExistingShop);

export default router;
