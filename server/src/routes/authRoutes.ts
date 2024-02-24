import express from 'express';
import { Request, Response } from 'express';
import { loginLimiter } from '../middleware/loginLimiter';
import { login, logout, refresh } from '../controller/authController';
import { validateResource } from '../middleware/validateResource';
import { loginSchema } from '../schema/userSchema';

const router = express.Router();

router.route('/login').post(validateResource(loginSchema), loginLimiter, login);
router.route('/refresh').get(refresh);
router.route('/logout').post(logout);

export default router;
