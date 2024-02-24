import express from 'express';
import { createNewUser, deleteUser, getAllUsers } from '../controller/userController';
import { validateResource } from '../middleware/validateResource';
import { createUserSchema, deleteUserSchema } from '../schema/userSchema';
import { verifyJWT } from '../middleware/verifyJWT';
const router = express.Router();

router.use(verifyJWT);

router
  .route('/')
  .get(getAllUsers)
  .post(validateResource(createUserSchema), createNewUser)
  .delete(validateResource(deleteUserSchema), deleteUser);

export default router;
