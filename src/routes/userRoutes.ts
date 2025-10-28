import express from 'express';

import {listUsers,getOneUser,createNewUser,updateExistingUser,deleteExistingUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/', listUsers);

router.post('/', createNewUser); 

router.get('/:id', getOneUser);

router.patch('/:id', updateExistingUser);

router.delete('/:id', deleteExistingUser);

export default router;