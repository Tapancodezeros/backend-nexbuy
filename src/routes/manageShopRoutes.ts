import express from 'express';
import {listShops,getOneShop,createNewShop,updateExistingShop,deleteExistingShop} from '../controllers/manageShopController.js';

const router = express.Router();

router.route('/')
    .get(listShops)
    .post(createNewShop);

router.route('/:id')
    .get(getOneShop)
    .patch(updateExistingShop)
    .delete(deleteExistingShop);

export default router;
