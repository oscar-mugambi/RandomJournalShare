import express from 'express';
import { deleteUser, getAllUsers } from '../controller/userController';
import { validateResource } from '../middleware/validateResource';
import { deleteUserSchema } from '../schema/userSchema';
import { verifyJWT } from '../middleware/verifyJWT';
const router = express.Router();

router.use(verifyJWT);

router.route('/').get(getAllUsers);

router.route('/users/:userId').delete(validateResource(deleteUserSchema), deleteUser);

export default router;
