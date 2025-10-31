import { Router } from 'express';
import {
    listUsers,
    getOneUser,
    createNewUser,
    updateExistingUser,
    deleteExistingUser,
    login
} from '../controllers/userController.js';

const router = Router();

router.post('/login', login);
router.get('/', listUsers);
router.post('/', createNewUser);


router.get('/:id', getOneUser);
router.patch('/:id', updateExistingUser);
router.delete('/:id', deleteExistingUser);

export default router;