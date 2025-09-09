import { getDatabase } from '../config/db.js';
import bcryptjs from 'bcryptjs';

const insertSampleData = async () => {
  try {
    const db = await getDatabase();
    
    console.log('🔄 Inserting sample data...');
    
    // Check if data already exists
    const [userRows] = await db.execute('SELECT COUNT(*) as count FROM app_users');
    if (userRows[0].count > 0) {
      console.log('📊 Sample data already exists, skipping insertion');
      return;
    }

    // Insert sample users
    const users = [
      {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        password: 'password123'
      },
      {
        first_name: 'Mike',
        last_name: 'Johnson',
        username: 'mikejohnson',
        email: 'mike@example.com',
        password: 'password123'
      }
    ];

    for (const user of users) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      await db.execute(
        'INSERT INTO app_users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)',
        [user.first_name, user.last_name, user.username, user.email, hashedPassword]
      );
    }
    console.log('✅ Sample users inserted');

    // Insert sample courses
    const courses = [
      {
        title: 'JavaScript Fundamentals',
        description: 'Learn the basics of JavaScript programming language',
        difficulty_level: 'Beginner',
        duration_hours: 20,
        image_url: '/images/javascript-course.jpg'
      },
      {
        title: 'React Development',
        description: 'Build modern web applications with React',
        difficulty_level: 'Intermediate',
        duration_hours: 30,
        image_url: '/images/react-course.jpg'
      },
      {
        title: 'Node.js Backend',
        description: 'Create server-side applications with Node.js',
        difficulty_level: 'Intermediate',
        duration_hours: 25,
        image_url: '/images/nodejs-course.jpg'
      },
      {
        title: 'Database Design',
        description: 'Learn database design principles and SQL',
        difficulty_level: 'Beginner',
        duration_hours: 15,
        image_url: '/images/database-course.jpg'
      }
    ];

    for (const course of courses) {
      await db.execute(
        'INSERT INTO courses (title, description, difficulty_level, duration_hours, image_url) VALUES (?, ?, ?, ?, ?)',
        [course.title, course.description, course.difficulty_level, course.duration_hours, course.image_url]
      );
    }
    console.log('✅ Sample courses inserted');

    // Insert sample lessons
    const lessons = [
      {
        course_id: 1,
        title: 'Introduction to JavaScript',
        content: 'Learn what JavaScript is and how to get started',
        lesson_order: 1,
        duration_minutes: 45,
        video_url: '/videos/js-intro.mp4'
      },
      {
        course_id: 1,
        title: 'Variables and Data Types',
        content: 'Understanding JavaScript variables and data types',
        lesson_order: 2,
        duration_minutes: 60,
        video_url: '/videos/js-variables.mp4'
      },
      {
        course_id: 2,
        title: 'React Components',
        content: 'Learn how to create and use React components',
        lesson_order: 1,
        duration_minutes: 50,
        video_url: '/videos/react-components.mp4'
      }
    ];

    for (const lesson of lessons) {
      await db.execute(
        'INSERT INTO lessons (course_id, title, content, lesson_order, duration_minutes, video_url) VALUES (?, ?, ?, ?, ?, ?)',
        [lesson.course_id, lesson.title, lesson.content, lesson.lesson_order, lesson.duration_minutes, lesson.video_url]
      );
    }
    console.log('✅ Sample lessons inserted');

    // Insert sample quizzes
    const quizzes = [
      {
        course_id: 1,
        title: 'JavaScript Basics Quiz',
        description: 'Test your knowledge of JavaScript fundamentals',
        total_questions: 3,
        time_limit_minutes: 15
      },
      {
        course_id: 2,
        title: 'React Components Quiz',
        description: 'Quiz about React components and JSX',
        total_questions: 2,
        time_limit_minutes: 10
      }
    ];

    for (const quiz of quizzes) {
      await db.execute(
        'INSERT INTO quizzes (course_id, title, description, total_questions, time_limit_minutes) VALUES (?, ?, ?, ?, ?)',
        [quiz.course_id, quiz.title, quiz.description, quiz.total_questions, quiz.time_limit_minutes]
      );
    }
    console.log('✅ Sample quizzes inserted');

    console.log('✅ All sample data inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error.message);
    throw error;
  }
};

export { insertSampleData };