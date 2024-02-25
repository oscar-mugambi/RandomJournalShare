import express from 'express';
import { loginLimiter } from '../middleware/loginLimiter';
import { createNewUser, login, logout, refresh } from '../controller/authController';
import { validateResource } from '../middleware/validateResource';
import { createUserSchema, loginSchema } from '../schema/userSchema';

const router = express.Router();

router.route('/register').post(validateResource(createUserSchema), loginLimiter, createNewUser);
router.route('/login').post(validateResource(loginSchema), loginLimiter, login);
router.route('/refresh').get(refresh);
router.route('/logout').post(logout);

export default router;
