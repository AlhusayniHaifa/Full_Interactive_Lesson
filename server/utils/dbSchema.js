import { getDatabase } from '../config/db.js';

// User table (MySQL compatible)
const userTableQuery = `
  CREATE TABLE IF NOT EXISTS app_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

// Posts table (MySQL compatible)
const postsTableQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE
  );
`;

// Courses table (MySQL compatible)
const coursesTableQuery = `
  CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    duration_hours INT DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

// Lessons table (MySQL compatible)
const lessonsTableQuery = `
  CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    lesson_order INT NOT NULL,
    duration_minutes INT DEFAULT 0,
    video_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  );
`;

// Quizzes table (MySQL compatible)
const quizzesTableQuery = `
  CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    total_questions INT DEFAULT 0,
    time_limit_minutes INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  );
`;

// Quiz Questions table (MySQL compatible)
const quizQuestionsTableQuery = `
  CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'true_false', 'short_answer') DEFAULT 'multiple_choice',
    options TEXT,
    correct_answer TEXT NOT NULL,
    points INT DEFAULT 1,
    question_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
  );
`;

// Quiz Answers table (MySQL compatible)
const quizAnswersTableQuery = `
  CREATE TABLE IF NOT EXISTS quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    question_id INT NOT NULL,
    user_answer TEXT,
    is_correct BOOLEAN DEFAULT FALSE,
    points_earned INT DEFAULT 0,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_question (user_id, question_id)
  );
`;

// User Progress table (MySQL compatible)
const userProgressTableQuery = `
  CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    lesson_id INT,
    quiz_id INT,
    progress_type ENUM('lesson_completed', 'quiz_completed', 'course_started', 'course_completed') NOT NULL,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    score INT DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE SET NULL
  );
`;

const createTable = async (tableName, query) => {
  try {
    const db = await getDatabase();
    await db.execute(query);
    console.log(`✅ Table '${tableName}' created successfully`);
  } catch (error) {
    console.error(`❌ Error creating ${tableName} table:`, error.message);
    throw error;
  }
};

const createAllTables = async () => {
  try {
    console.log('🔄 Creating database tables...');
    
    // Create tables in order (respecting foreign key dependencies)
    await createTable('app_users', userTableQuery);
    await createTable('posts', postsTableQuery);
    await createTable('courses', coursesTableQuery);
    await createTable('lessons', lessonsTableQuery);
    await createTable('quizzes', quizzesTableQuery);
    await createTable('quiz_questions', quizQuestionsTableQuery);
    await createTable('quiz_answers', quizAnswersTableQuery);
    await createTable('user_progress', userProgressTableQuery);
    
    console.log('✅ All tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
};

export { createTable, createAllTables };