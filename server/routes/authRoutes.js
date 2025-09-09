import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);

router.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Auth service is running',
    timestamp: new Date().toISOString()
  });
});

export default router;