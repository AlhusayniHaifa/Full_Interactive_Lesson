import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const enrolledCourses = [
    {
      id: 'word-basics',
      title: 'Word Microsoft Basics',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop',
      progress: 85,
      status: 'In Progress',
      lessons: 12,
      completedLessons: 10,
      duration: '4 hours'
    },
    {
      id: 'excel-beginners',
      title: 'Excel for Beginners',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
      progress: 100,
      status: 'Completed',
      lessons: 15,
      completedLessons: 15,
      duration: '6 hours'
    },
    {
      id: 'computer-basics',
      title: 'Computer Basics & Windows',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      progress: 30,
      status: 'In Progress',
      lessons: 10,
      completedLessons: 3,
      duration: '3 hours'
    },
    {
      id: 'powerpoint-essentials',
      title: 'PowerPoint Essentials',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      progress: 0,
      status: 'Not Started',
      lessons: 8,
      completedLessons: 0,
      duration: '3 hours'
    },
    {
      id: 'internet-email-basics',
      title: 'Internet & Email Basics',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      progress: 60,
      status: 'In Progress',
      lessons: 6,
      completedLessons: 4,
      duration: '2 hours'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'var(--accent-color)';
      case 'In Progress':
        return '#ff9800';
      default:
        return '#666';
    }
  };

  return (
    <div className="courses">
      <div className="courses-container">
        <div className="courses-header">
          <h1>My Courses</h1>
          <p>Continue your learning journey</p>
        </div>

        <div className="courses-stats">
          <div className="stat">
            <span className="stat-number">{enrolledCourses.length}</span>
            <span className="stat-label">Enrolled Courses</span>
          </div>
          <div className="stat">
            <span className="stat-number">{enrolledCourses.filter(c => c.status === 'Completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">{enrolledCourses.filter(c => c.status === 'In Progress').length}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="courses-grid">
          {enrolledCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-status" style={{backgroundColor: getStatusColor(course.status)}}>
                  {course.status}
                </div>
              </div>
              
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                
                <div className="course-info">
                  <div className="info-item">
                    <span className="info-icon">📚</span>
                    <span>{course.completedLessons}/{course.lessons} lessons</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span className="progress-percentage">{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${course.progress}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="course-actions">
                  <Link to={`/course/${course.id}`} className="continue-btn">
                    {course.status === 'Completed' ? 'Review Course' : 'Continue Learning'}
                  </Link>
                  {course.status === 'Completed' && (
                    <button className="certificate-btn">
                      📜 Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .courses {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
        }

        .courses-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .courses-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .courses-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .courses-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .courses-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          padding: 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--primary-color);
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .course-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }

        .course-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .course-status {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .course-content {
          padding: 1.5rem;
        }

        .course-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .course-info {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }

        .info-icon {
          font-size: 1rem;
        }

        .progress-section {
          margin-bottom: 1.5rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }

        .progress-percentage {
          font-weight: bold;
          color: #1976d2;
        }

        .progress-bar {
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
          transition: width 0.3s ease;
        }

        .course-actions {
          display: flex;
          gap: 1rem;
        }

        .continue-btn {
          flex: 1;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .continue-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .certificate-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .certificate-btn:hover {
          background: #45a049;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .courses {
            padding: 1rem;
          }

          .courses-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .course-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Courses;