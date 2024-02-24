import express from 'express';
import path from 'path';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'hey there' });
});

export default router;
