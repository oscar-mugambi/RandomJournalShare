import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.route('/').post();
router.route('/refresh').get();
router.route('/logout').post();

export default router;
