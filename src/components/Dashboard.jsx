import React from 'react';

const Dashboard = () => {
  const userEmail = localStorage.getItem('userEmail');
  
  const stats = [
    {
      title: 'الدورات المسجلة',
      value: '957',
      icon: '📚',
      color: '#1976d2'
    },
    {
      title: 'الدورات المكتملة',
      value: '951',
      icon: '✅',
      color: '#4caf50'
    },
    {
      title: 'نسبة التقدم',
      value: '85%',
      icon: '📈',
      color: '#ff9800'
    },
    {
      title: 'الشهادات المحصلة',
      value: '12',
      icon: '🏆',
      color: '#9c27b0'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      message: 'تم إكمال درس "مقدمة في الوورد" بنجاح',
      time: 'منذ ساعتين',
      type: 'completion'
    },
    {
      id: 2,
      message: 'تم التسجيل في دورة "Excel المتقدم"',
      time: 'منذ 4 ساعات',
      type: 'enrollment'
    },
    {
      id: 3,
      message: 'تم الحصول على شهادة "أساسيات البرمجة"',
      time: 'أمس',
      type: 'certificate'
    },
    {
      id: 4,
      message: 'تم بدء دورة "تصميم الجرافيك"',
      time: 'منذ يومين',
      type: 'start'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>مرحباً بك في لوحة الطالب!</h1>
          <p>مرحباً {userEmail}، نتمنى لك يوماً دراسياً مثمراً</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{'--card-color': stat.color}}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="recent-activities">
            <h2>الأنشطة الأخيرة</h2>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'completion' && '✅'}
                    {activity.type === 'enrollment' && '📝'}
                    {activity.type === 'certificate' && '🏆'}
                    {activity.type === 'start' && '🚀'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>إجراءات سريعة</h2>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">📚</span>
                <span>تصفح الدورات</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span>عرض التقدم</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">🏆</span>
                <span>الشهادات</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">⚙️</span>
                <span>الإعدادات</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
          direction: rtl;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
          border-left: 4px solid var(--card-color);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }

        .stat-icon {
          font-size: 3rem;
          opacity: 0.8;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--card-color);
          margin: 0;
        }

        .stat-title {
          color: #666;
          font-size: 1rem;
          margin: 0.5rem 0 0 0;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .recent-activities,
        .quick-actions {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .recent-activities h2,
        .quick-actions h2 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .activity-item:hover {
          background: #e3f2fd;
        }

        .activity-icon {
          font-size: 1.5rem;
        }

        .activity-content {
          flex: 1;
        }

        .activity-message {
          margin: 0;
          color: #333;
          font-weight: 500;
        }

        .activity-time {
          color: #666;
          font-size: 0.9rem;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }

        .action-icon {
          font-size: 1.5rem;
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;