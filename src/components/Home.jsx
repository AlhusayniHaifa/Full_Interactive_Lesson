import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const courses = [
    {
      id: 'word-basics',
      title: 'Word Microsoft Basics',
      description: 'Learn the fundamentals of Microsoft Word',
      image: '/word-icon.svg',
      duration: '4 hours',
      level: 'Beginner'
    },
    {
      id: 'excel-beginners',
      title: 'Excel for Beginners',
      description: 'Master the basics of Excel spreadsheets',
      image: '/excel-icon.svg',
      duration: '6 hours',
      level: 'Beginner'
    },
    {
      id: 'computer-basics',
      title: 'Computer Basics & Windows',
      description: 'Essential computer skills and Windows fundamentals',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      duration: '3 hours',
      level: 'Beginner'
    },
    {
      id: 'powerpoint-essentials',
      title: 'PowerPoint Essentials',
      description: 'Create professional presentations with PowerPoint',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      duration: '3 hours',
      level: 'Beginner'
    },
    {
      id: 'internet-email-basics',
      title: 'Internet & Email Basics',
      description: 'Navigate the internet and manage email effectively',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      duration: '2 hours',
      level: 'Beginner'
    }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Smart Way - Tech</h1>
          <p className="hero-subtitle">Your gateway to free, high-quality education in technology and design</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className="course-price">{course.price}</div>
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <Link to={`/course/${course.id}`} className="course-link">
                    Start Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .home {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: white !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: bold;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .courses-section {
          padding: 4rem 2rem;
          background: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #333;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
          object-fit: contain;
          background: #f8f9fa;
          padding: 1rem;
        }

        .course-price {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--accent-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .course-content {
          padding: 1.5rem;
        }

        .course-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .course-description {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .course-link {
          display: inline-block;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .course-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-stats {
            gap: 2rem;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;