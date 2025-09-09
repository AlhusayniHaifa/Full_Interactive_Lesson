import React, { useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'أحمد محمد',
    email: 'student@arabicmail.com',
    country: 'المملكة العربية السعودية',
    level: 'ثانوي',
    joinDate: '2024-01-15',
    phone: '+966 50 123 4567',
    bio: 'طالب متحمس لتعلم التكنولوجيا والبرمجة'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const achievements = [
    {
      title: 'أول دورة مكتملة',
      description: 'أكمل دورة Word Microsoft Basics',
      date: '2024-02-01',
      icon: '🏆'
    },
    {
      title: 'متعلم نشط',
      description: 'سجل في 5 دورات في شهر واحد',
      date: '2024-02-15',
      icon: '📚'
    },
    {
      title: 'خبير Excel',
      description: 'أكمل دورة Excel for Beginners بامتياز',
      date: '2024-03-01',
      icon: '📊'
    }
  ];

  const stats = [
    { label: 'الدورات المكتملة', value: '12', icon: '✅' },
    { label: 'ساعات التعلم', value: '48', icon: '⏱️' },
    { label: 'الشهادات', value: '8', icon: '🏆' },
    { label: 'النقاط', value: '2,450', icon: '⭐' }
  ];

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-text">{userInfo.name.charAt(0)}</span>
            </div>
          </div>
          <div className="profile-info">
            <h1>{userInfo.name}</h1>
            <p className="profile-email">{userInfo.email}</p>
            <p className="profile-location">📍 {userInfo.country}</p>
            <p className="profile-level">🎓 {userInfo.level}</p>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={handleEdit} className="edit-btn">
                ✏️ تعديل الملف الشخصي
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  💾 حفظ
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  ❌ إلغاء
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="profile-details">
              <h2>المعلومات الشخصية</h2>
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>الدولة</label>
                    <input
                      type="text"
                      name="country"
                      value={editForm.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>المستوى التعليمي</label>
                    <select
                      name="level"
                      value={editForm.level}
                      onChange={handleChange}
                    >
                      <option value="ابتدائي">ابتدائي</option>
                      <option value="متوسط">متوسط</option>
                      <option value="ثانوي">ثانوي</option>
                      <option value="جامعي">جامعي</option>
                      <option value="دراسات عليا">دراسات عليا</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>نبذة شخصية</label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-item">
                    <span className="info-label">الاسم:</span>
                    <span className="info-value">{userInfo.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">البريد الإلكتروني:</span>
                    <span className="info-value">{userInfo.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">الدولة:</span>
                    <span className="info-value">{userInfo.country}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">المستوى التعليمي:</span>
                    <span className="info-value">{userInfo.level}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">رقم الهاتف:</span>
                    <span className="info-value">{userInfo.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">تاريخ الانضمام:</span>
                    <span className="info-value">{new Date(userInfo.joinDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="info-item bio">
                    <span className="info-label">نبذة شخصية:</span>
                    <span className="info-value">{userInfo.bio}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="achievements-section">
              <h2>الإنجازات</h2>
              <div className="achievements-list">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                      <span className="achievement-date">
                        {new Date(achievement.date).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-sidebar">
            <div className="stats-card">
              <h3>إحصائيات التعلم</h3>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="progress-card">
              <h3>التقدم الحالي</h3>
              <div className="progress-item">
                <div className="progress-header">
                  <span>Python Programming</span>
                  <span>45%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '45%'}}></div>
                </div>
              </div>
              <div className="progress-item">
                <div className="progress-header">
                  <span>Graphic Design</span>
                  <span>20%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '20%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
          direction: rtl;
        }

        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-header {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 2rem;
          align-items: center;
        }

        .profile-avatar {
          display: flex;
          justify-content: center;
        }

        .avatar-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(25, 118, 210, 0.3);
        }

        .avatar-text {
          color: white;
          font-size: 3rem;
          font-weight: bold;
        }

        .profile-info h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .profile-email {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .profile-location,
        .profile-level {
          color: #666;
          margin-bottom: 0.25rem;
        }

        .edit-btn {
          background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }

        .edit-actions {
          display: flex;
          gap: 1rem;
        }

        .save-btn {
          background: #4caf50;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .cancel-btn {
          background: #f44336;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .profile-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .profile-details,
        .achievements-section,
        .stats-card,
        .progress-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .profile-details h2,
        .achievements-section h2,
        .stats-card h3,
        .progress-card h3 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .info-display {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-item {
          display: flex;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .info-item.bio {
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-label {
          font-weight: 600;
          color: #333;
          min-width: 150px;
        }

        .info-value {
          color: #666;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #1976d2;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .achievement-item:hover {
          background: #e3f2fd;
          transform: translateX(-4px);
        }

        .achievement-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .achievement-content h3 {
          color: #333;
          margin-bottom: 0.5rem;
        }

        .achievement-content p {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .achievement-date {
          color: #999;
          font-size: 0.9rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .stat-icon {
          font-size: 1.5rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1976d2;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .progress-item {
          margin-bottom: 1.5rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: #666;
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

        @media (max-width: 1024px) {
          .profile-content {
            grid-template-columns: 1fr;
          }

          .profile-header {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .profile {
            padding: 1rem;
          }

          .profile-header {
            padding: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;