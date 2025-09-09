import { getDatabase } from '../config/db.js';

/** GET /api/courses */
export const getAllCourses = async (req, res) => {
  try {
    const db = await getDatabase();
    if (!db) throw new Error('Database connection failed');

    const [courses] = await db.execute(`
      SELECT 
        c.id, c.title, c.description, c.created_at, c.updated_at,
        COUNT(DISTINCT l.id) as lesson_count,
        COUNT(DISTINCT q.id) as quiz_count
      FROM courses c
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN quizzes q ON c.id = q.course_id
      GROUP BY c.id, c.title, c.description, c.created_at, c.updated_at
      ORDER BY c.created_at DESC
    `);

    res.status(200).json({
      success: true,
      data: { courses: courses ?? [] }
    });
  } catch (error) {
    console.error('getAllCourses error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch courses', error: error.message });
  }
};

/** GET /api/courses/:id */
export const getCourseById = async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT 
         c.id, c.title, c.description, c.created_at, c.updated_at,
         COUNT(DISTINCT l.id) as lesson_count,
         COUNT(DISTINCT q.id) as quiz_count
       FROM courses c
       LEFT JOIN lessons l ON c.id = l.course_id
       LEFT JOIN quizzes q ON c.id = q.course_id
       WHERE c.id = ?
       GROUP BY c.id, c.title, c.description, c.created_at, c.updated_at`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('getCourseById error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch course', error: error.message });
  }
};

/** GET /api/courses/lessons/:id */
export const getLessonById = async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT l.*, c.title AS course_title
       FROM lessons l
       LEFT JOIN courses c ON c.id = l.course_id
       WHERE l.id = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('getLessonById error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch lesson', error: error.message });
  }
};

/** GET /api/courses/:courseId/progress */
export const getUserProgress = async (req, res) => {
  try {
    const db = await getDatabase();
    const { courseId } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const [rows] = await db.execute(
      `SELECT * FROM user_progress WHERE user_id = ? AND course_id = ?`,
      [userId, courseId]
    );

    res.status(200).json({ success: true, data: rows ?? [] });
  } catch (error) {
    console.error('getUserProgress error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch progress', error: error.message });
  }
};

/** GET /api/courses/quiz/:id */
export const getQuizById = async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;

    const [quizRows] = await db.execute(`SELECT * FROM quizzes WHERE id = ?`, [id]);
    if (!quizRows || quizRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    const [items] = await db.execute(
      `SELECT qq.id AS question_id, qq.quiz_id, qq.question_text,
              qo.id AS option_id, qo.option_text, qo.is_correct
       FROM quiz_questions qq
       LEFT JOIN quiz_options qo ON qo.question_id = qq.id
       WHERE qq.quiz_id = ?
       ORDER BY qq.id, qo.id`,
      [id]
    );

    res.status(200).json({ success: true, data: { quiz: quizRows[0], items: items ?? [] } });
  } catch (error) {
    console.error('getQuizById error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch quiz', error: error.message });
  }
};

/** POST /api/courses/quiz/:id/submit */
export const submitQuizAnswers = async (req, res) => {
  try {
    const db = await getDatabase();
    const userId = req.user?.id;
    const { id } = req.params;
    const { answers } = req.body;

    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'answers are required' });
    }

    const [correctRows] = await db.execute(
      `SELECT qq.id AS question_id, qo.id AS correct_option_id
       FROM quiz_questions qq
       JOIN quiz_options qo ON qo.question_id = qq.id AND qo.is_correct = 1
       WHERE qq.quiz_id = ?`,
      [id]
    );

    const correctMap = new Map(correctRows.map(r => [String(r.question_id), String(r.correct_option_id)]));

    let score = 0;
    for (const ans of answers) {
      if (correctMap.get(String(ans.questionId)) === String(ans.optionId)) score++;
    }

    res.status(200).json({ success: true, data: { score, total: correctMap.size } });
  } catch (error) {
    console.error('submitQuizAnswers error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit quiz', error: error.message });
  }
};
