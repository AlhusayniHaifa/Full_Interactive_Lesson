import express from 'express';
import { 
  getAllCourses, 
  getCourseById, 
  getLessonById, 
  getUserProgress,
  getQuizById,
  submitQuizAnswers 
} from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ثابت أولاً
router.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Course service is running',
    timestamp: new Date().toISOString()
  });
});

// مسارات محددة قبل catch-all
router.get('/lessons/:id', getLessonById);
router.get('/quiz/:id', getQuizById);
router.post('/quiz/:id/submit', authenticateToken, submitQuizAnswers);
router.get('/:courseId/progress', authenticateToken, getUserProgress);

// العامة في الأخير
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

export default router;
