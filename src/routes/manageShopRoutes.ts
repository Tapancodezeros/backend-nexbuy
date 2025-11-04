import express from 'express';
import {listShops,getOneShop,createNewShop,updateExistingShop,deleteExistingShop, listShopsByUser} from '../controllers/manageShopController.js';

const router = express.Router();

router.get('/', listShops);

router.get('/user/:userId', listShopsByUser);
router.post('/user/:userId', createNewShop);

router.get('/:id', getOneShop);
router.patch('/:id', updateExistingShop);
router.delete('/:id', deleteExistingShop);

export default router;
