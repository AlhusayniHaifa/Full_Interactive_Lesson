import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Scenario1 from './Scenario1';
import Scenario2 from './Scenario2';
import Scenario3 from './Scenario3';


const CourseDetail = () => {
  const { courseId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set([0, 1, 2]));

  
  const courseData = {
    'word-basics': {
      title: 'Word Microsoft Basics',
      description: 'Master the fundamentals of Microsoft Word with hands-on exercises and real-world examples.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop',
      instructor: 'Dr. Ahmed Hassan',
      duration: '4 hours',
      level: 'Beginner',
      lessons: [
        {
          id: 0,
          title: 'انشاء مستند جديد باستخدام وورد',
          duration: '15 min',
          type: 'video',
          content: 'Welcome to Microsoft Word! In this lesson, we\'ll explore the interface and basic features.'
        },
        {
          id: 1,
          title: 'انشاء جدول باستخدام وورد',
          duration: '20 min',
          type: 'interactive',
          content: 'Learn how to create, save, and format your first Word document.'
        },
        {
          id: 2,
          title: 'الكتابه داخل الجدول باستخدام وورد',
          duration: '25 min',
          type: 'video',
          content: 'Master text formatting, fonts, colors, and paragraph styles.'
        },
        {
          id: 3,
          title: 'Working with Images and Tables',
          duration: '30 min',
          type: 'interactive',
          content: 'Insert and format images, create tables, and manage layouts.'
        },
        {
          id: 4,
          title: 'Headers, Footers, and Page Setup',
          duration: '20 min',
          type: 'video',
          content: 'Configure page settings, add headers and footers.'
        }
      ]
    },
    'excel-beginners': {
      title: 'Excel for Beginners',
      description: 'Learn Excel from scratch with practical examples and exercises.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      instructor: 'Sarah Johnson',
      duration: '6 hours',
      level: 'Beginner',
      lessons: [
        {
          id: 0,
          title: 'Excel Interface Overview',
          duration: '18 min',
          type: 'video',
          content: 'Get familiar with Excel\'s interface, ribbons, and basic navigation.'
        },
        {
          id: 1,
          title: 'Working with Cells and Data',
          duration: '25 min',
          type: 'interactive',
          content: 'Learn to enter, edit, and format data in Excel cells.'
        },
        {
          id: 2,
          title: 'Basic Formulas and Functions',
          duration: '35 min',
          type: 'video',
          content: 'Master SUM, AVERAGE, COUNT, and other essential functions.'
        }
      ]
    },
    'computer-basics': {
      title: 'Computer Basics & Windows',
      description: 'Learn essential computer skills and Windows fundamentals for everyday computing.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      instructor: 'Michael Chen',
      duration: '3 hours',
      level: 'Beginner',
      lessons: [
        {
          id: 0,
          title: 'Understanding Computer Hardware',
          duration: '20 min',
          type: 'video',
          content: 'Learn about computer components: CPU, RAM, storage, and peripherals.'
        },
        {
          id: 1,
          title: 'Windows Desktop and Navigation',
          duration: '25 min',
          type: 'interactive',
          content: 'Master the Windows desktop, taskbar, start menu, and file explorer.'
        },
        {
          id: 2,
          title: 'File Management Basics',
          duration: '30 min',
          type: 'video',
          content: 'Create, organize, copy, move, and delete files and folders.'
        },
        {
          id: 3,
          title: 'System Settings and Control Panel',
          duration: '25 min',
          type: 'interactive',
          content: 'Configure system settings, manage user accounts, and customize Windows.'
        }
      ]
    },
    'powerpoint-essentials': {
      title: 'PowerPoint Essentials',
      description: 'Create professional presentations with Microsoft PowerPoint.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
      instructor: 'Lisa Rodriguez',
      duration: '3 hours',
      level: 'Beginner',
      lessons: [
        {
          id: 0,
          title: 'PowerPoint Interface Overview',
          duration: '15 min',
          type: 'video',
          content: 'Get familiar with PowerPoint\'s interface, ribbons, and slide panel.'
        },
        {
          id: 1,
          title: 'Creating Your First Presentation',
          duration: '25 min',
          type: 'interactive',
          content: 'Create slides, add text, and apply basic formatting.'
        },
        {
          id: 2,
          title: 'Working with Images and Graphics',
          duration: '30 min',
          type: 'video',
          content: 'Insert images, shapes, icons, and create visual elements.'
        },
        {
          id: 3,
          title: 'Animations and Transitions',
          duration: '25 min',
          type: 'interactive',
          content: 'Add animations to objects and transitions between slides.'
        },
        {
          id: 4,
          title: 'Presenting and Sharing',
          duration: '20 min',
          type: 'video',
          content: 'Present your slideshow and share presentations effectively.'
        }
      ]
    },
    'internet-email-basics': {
      title: 'Internet & Email Basics',
      description: 'Navigate the internet safely and manage email effectively.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      instructor: 'David Park',
      duration: '2 hours',
      level: 'Beginner',
      lessons: [
        {
          id: 0,
          title: 'Internet Basics and Web Browsers',
          duration: '20 min',
          type: 'video',
          content: 'Understand the internet, web browsers, and basic navigation.'
        },
        {
          id: 1,
          title: 'Safe Browsing and Security',
          duration: '25 min',
          type: 'interactive',
          content: 'Learn about online safety, passwords, and avoiding scams.'
        },
        {
          id: 2,
          title: 'Email Setup and Management',
          duration: '30 min',
          type: 'video',
          content: 'Set up email accounts, compose, send, and organize emails.'
        },
        {
          id: 3,
          title: 'Email Etiquette and Best Practices',
          duration: '15 min',
          type: 'interactive',
          content: 'Professional email communication and organization tips.'
        }
      ]
    }
  };

  const course = courseData[courseId] || courseData['word-basics'];
  const progress = Math.round((completedLessons.size / course.lessons.length) * 100);

  const markLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };
const renderSimulator = (lesson) => {
  switch (lesson.id) {
    case 0:
      return <WordVideoSimulator1 lesson={lesson} />;
    case 1:
      return <WordVideoSimulator2 lesson={lesson} />;
    case 2:
      return <WordVideoSimulator3 lesson={lesson} />;
    case 3:
      return <WordInterfaceExplorer lesson={lesson} />;  
    default:
      return <div>Simulator not found</div>;
  }
};

  const WordVideoSimulator1 = () => (
    <div className="simulator">
      <div className="simulator-header">
        <h4>📹 Interavtive Lesson 1: {course.lessons[currentLesson].title}</h4>
        <Scenario1 />
        <br />
      </div>
      
    </div>
  );

  const WordVideoSimulator2 = () => (
    <div className="simulator">
      <div className="simulator-header">
        <h4>🖥️ Interactive Lesson 2: {course.lessons[currentLesson].title}</h4>
        <Scenario2 />
        <br />
      </div>
    </div>
  );
  const WordVideoSimulator3 = () => (
    <div className="simulator">
      <div className="simulator-header">
        <h4>🖥️ Interactive Lesson 3: {course.lessons[currentLesson].title}</h4>
        <Scenario3 />
        <br />
      </div>
    </div>
  );
  const WordInterfaceExplorer = () => (
    <div className="simulator">
      <div className="simulator-header">
        <h4>🖥️ Interactive Lesson 4: {course.lessons[currentLesson].title}</h4>
      </div>
      <div className="interface-mockup">
        <div className="word-ribbon">
          <div className="ribbon-tab active">Home</div>
          <div className="ribbon-tab">Insert</div>
          <div className="ribbon-tab">Layout</div>
          <div className="ribbon-tab">References</div>
        </div>
        <div className="word-toolbar">
          <button className="tool-btn">📄</button>
          <button className="tool-btn">💾</button>
          <button className="tool-btn">✂️</button>
          <button className="tool-btn">📋</button>
          <button className="tool-btn">🔤</button>
        </div>
        <div className="document-area">
          <p>Click on the tools above to explore Word's interface!</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="course-detail">
      <div className="course-header">
        <div className="course-header-content">
          <div className="breadcrumb">
            <Link to="/courses">My Courses</Link> / {course.title}
          </div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <span className="meta-icon">👨‍🏫</span>
              <span>{course.instructor}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{course.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📊</span>
              <span>{course.level}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📈</span>
              <span>{progress}% Complete</span>
            </div>
          </div>
        </div>
        <div className="course-image">
          <img src={course.image} alt={course.title} />
        </div>
      </div>

      <div className="course-content">
        <div className="lessons-sidebar">
          <h3>Course Content</h3>
          <div className="lessons-list">
            {course.lessons.map((lesson, index) => (
              <div 
                key={lesson.id} 
                className={`lesson-item ${
                  currentLesson === index ? 'active' : ''
                } ${
                  completedLessons.has(lesson.id) ? 'completed' : ''
                }`}
                onClick={() => setCurrentLesson(index)}
              >
                <div className="lesson-status">
                  {completedLessons.has(lesson.id) ? '✅' : 
                   lesson.type === 'video' ? '📹' : '🖥️'}
                </div>
                <div className="lesson-info">
                  <h4>{lesson.title}</h4>
                  <span className="lesson-duration">{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lesson-content">
          <div className="lesson-header">
            <h2>{course.lessons[currentLesson].title}</h2>
            <span className="lesson-type">
              {course.lessons[currentLesson].type === 'video' ? '📹 Video' : '🖥️ Interactive'}
            </span>
          </div>
          
          <div className="lesson-body">
             <p>{course.lessons[currentLesson].content}</p>
                {renderSimulator(course.lessons[currentLesson])}
          </div>

          
          <div className="lesson-navigation">
            <button 
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
              className="nav-btn prev-btn"
            >
              ← Previous
            </button>
            <button 
              onClick={() => setCurrentLesson(Math.min(course.lessons.length - 1, currentLesson + 1))}
              disabled={currentLesson === course.lessons.length - 1}
              className="nav-btn next-btn"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .course-detail {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .course-header {
          background: white;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .breadcrumb {
          color: #666;
          margin-bottom: 1rem;
        }

        .breadcrumb a {
          color: var(--primary-color);
          text-decoration: none;
        }

        .course-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .course-header p {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .course-meta {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
        }

        .meta-icon {
          font-size: 1.2rem;
        }

        .course-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .course-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .course-content {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .lessons-sidebar {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .lessons-sidebar h3 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .lessons-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lesson-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lesson-item:hover {
          background: #f0f7ff;
        }

        .lesson-item.active {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
        }

        .lesson-item.completed {
          background: #e8f5e8;
        }

        .lesson-item.completed.active {
          background: linear-gradient(135deg, var(--accent-color) 0%, #8bc34a 100%);
        }

        .lesson-status {
          font-size: 1.2rem;
        }

        .lesson-info h4 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .lesson-duration {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .lesson-content {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .lesson-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .lesson-header h2 {
          color: #333;
          margin: 0;
        }

        .lesson-type {
          background: #f3e8ff;
          color: var(--primary-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .lesson-body {
          margin-bottom: 2rem;
        }

        .lesson-body p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .simulator {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 2rem;
          margin: 2rem 0;
        }

        .simulator-header h4 {
          color: #333;
          margin-bottom: 1rem;
        }

        .video-placeholder {
          background: #000;
          color: white;
          height: 300px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .play-button {
          font-size: 4rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        .interface-mockup {
          border: 2px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .word-ribbon {
          background: #f0f0f0;
          display: flex;
          border-bottom: 1px solid #ddd;
        }

        .ribbon-tab {
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-right: 1px solid #ddd;
        }

        .ribbon-tab.active {
          background: white;
          border-bottom: 2px solid var(--primary-color);
        }

        .word-toolbar {
          background: #fafafa;
          padding: 0.5rem;
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid #ddd;
        }

        .tool-btn {
          background: white;
          border: 1px solid #ddd;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .tool-btn:hover {
          background: #e3f2fd;
        }

        .document-area {
          background: white;
          padding: 2rem;
          min-height: 200px;
          color: #333;
        }

        .simulator-controls {
          text-align: center;
        }

        .complete-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .complete-btn:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .lesson-navigation {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .nav-btn {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .course-header {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .course-content {
            grid-template-columns: 1fr;
          }

          .lessons-sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .course-header {
            padding: 2rem 1rem;
          }

          .course-content {
            padding: 1rem;
          }

          .lesson-content {
            padding: 1rem;
          }

          .course-meta {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;