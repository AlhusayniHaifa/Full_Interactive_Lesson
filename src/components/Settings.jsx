import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    email: 'student@arabicmail.com',
    password: '',
    newPassword: '',
    confirmPassword: '',
    language: 'arabic',
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    privacy: {
      profileVisible: true,
      showProgress: true,
      allowMessages: false
    }
  });

  const [activeTab, setActiveTab] = useState('account');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = (section) => {
    // Simulate saving settings
    setMessage(`تم حفظ إعدادات ${section} بنجاح!`);
    setMessageType('success');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handlePasswordChange = () => {
    if (!settings.password || !settings.newPassword || !settings.confirmPassword) {
      setMessage('يرجى ملء جميع حقول كلمة المرور');
      setMessageType('error');
      return;
    }

    if (settings.newPassword !== settings.confirmPassword) {
      setMessage('كلمة المرور الجديدة غير متطابقة');
      setMessageType('error');
      return;
    }

    if (settings.newPassword.length < 6) {
      setMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setMessageType('error');
      return;
    }

    handleSave('كلمة المرور');
    setSettings(prev => ({
      ...prev,
      password: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const tabs = [
    { id: 'account', label: 'الحساب', icon: '👤' },
    { id: 'preferences', label: 'التفضيلات', icon: '⚙️' },
    { id: 'notifications', label: 'الإشعارات', icon: '🔔' },
    { id: 'privacy', label: 'الخصوصية', icon: '🔒' }
  ];

  return (
    <div className="settings">
      <div className="settings-container">
        <div className="settings-header">
          <h1>الإعدادات</h1>
          <p>قم بتخصيص تجربتك التعليمية</p>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="settings-content">
          <div className="settings-sidebar">
            <div className="tabs-list">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-main">
            {activeTab === 'account' && (
              <div className="settings-section">
                <h2>إعدادات الحساب</h2>
                
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>

                <div className="password-section">
                  <h3>تغيير كلمة المرور</h3>
                  
                  <div className="form-group">
                    <label>كلمة المرور الحالية</label>
                    <input
                      type="password"
                      name="password"
                      value={settings.password}
                      onChange={handleInputChange}
                      placeholder="أدخل كلمة المرور الحالية"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={settings.newPassword}
                      onChange={handleInputChange}
                      placeholder="أدخل كلمة المرور الجديدة"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>تأكيد كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={settings.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                    />
                  </div>
                  
                  <button onClick={handlePasswordChange} className="save-btn">
                    تحديث كلمة المرور
                  </button>
                </div>

                <button onClick={() => handleSave('الحساب')} className="save-btn">
                  حفظ إعدادات الحساب
                </button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="settings-section">
                <h2>التفضيلات</h2>
                
                <div className="form-group">
                  <label>اللغة</label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleInputChange}
                  >
                    <option value="arabic">العربية</option>
                    <option value="english">English</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>المظهر</label>
                  <select
                    name="theme"
                    value={settings.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">فاتح</option>
                    <option value="dark">داكن</option>
                    <option value="auto">تلقائي</option>
                  </select>
                </div>

                <div className="theme-preview">
                  <h4>معاينة المظهر</h4>
                  <div className={`preview-card ${settings.theme}`}>
                    <div className="preview-header">عنوان تجريبي</div>
                    <div className="preview-content">
                      <p>هذا نص تجريبي لمعاينة المظهر المختار</p>
                      <button className="preview-btn">زر تجريبي</button>
                    </div>
                  </div>
                </div>

                <button onClick={() => handleSave('التفضيلات')} className="save-btn">
                  حفظ التفضيلات
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>إعدادات الإشعارات</h2>
                
                <div className="notification-group">
                  <h3>أنواع الإشعارات</h3>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="notifications.email"
                        checked={settings.notifications.email}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        📧 إشعارات البريد الإلكتروني
                      </span>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="notifications.push"
                        checked={settings.notifications.push}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        🔔 الإشعارات المنبثقة
                      </span>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="notifications.sms"
                        checked={settings.notifications.sms}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        📱 رسائل SMS
                      </span>
                    </label>
                  </div>
                </div>

                <button onClick={() => handleSave('الإشعارات')} className="save-btn">
                  حفظ إعدادات الإشعارات
                </button>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h2>إعدادات الخصوصية</h2>
                
                <div className="privacy-group">
                  <h3>إعدادات الملف الشخصي</h3>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="privacy.profileVisible"
                        checked={settings.privacy.profileVisible}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        👁️ إظهار الملف الشخصي للآخرين
                      </span>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="privacy.showProgress"
                        checked={settings.privacy.showProgress}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        📊 إظهار تقدم التعلم
                      </span>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="privacy.allowMessages"
                        checked={settings.privacy.allowMessages}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        💬 السماح بالرسائل من المستخدمين الآخرين
                      </span>
                    </label>
                  </div>
                </div>

                <button onClick={() => handleSave('الخصوصية')} className="save-btn">
                  حفظ إعدادات الخصوصية
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .settings {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 2rem;
          direction: rtl;
        }

        .settings-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .settings-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .settings-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .settings-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 500;
        }

        .message.success {
          background: #e8f5e8;
          color: #2e7d32;
          border: 1px solid #4caf50;
        }

        .message.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #f44336;
        }

        .settings-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .settings-sidebar {
          background: var(--background-color);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.15);
          height: fit-content;
          position: sticky;
          top: 2rem;
          border: 1px solid rgba(124, 58, 237, 0.1);
        }

        .tabs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(124, 58, 237, 0.05);
          border: 1px solid rgba(124, 58, 237, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: right;
          width: 100%;
          color: var(--text-color);
          font-weight: 500;
        }

        .tab-btn:hover {
          background: rgba(124, 58, 237, 0.1);
          border-color: rgba(124, 58, 237, 0.2);
          transform: translateY(-1px);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          border-color: var(--primary-color);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .tab-icon {
          font-size: 1.2rem;
        }

        .tab-label {
          font-weight: 500;
        }

        .settings-main {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .settings-section h2 {
          color: #333;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }

        .settings-section h3 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
          font-weight: 600;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .password-section {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 12px;
          margin: 2rem 0;
        }

        .password-section h3 {
          margin-top: 0;
        }

        .theme-preview {
          margin: 2rem 0;
        }

        .theme-preview h4 {
          color: #333;
          margin-bottom: 1rem;
        }

        .preview-card {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .preview-card.light {
          background: white;
          color: #333;
        }

        .preview-card.dark {
          background: #333;
          color: white;
          border-color: #555;
        }

        .preview-header {
          padding: 1rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          font-weight: 600;
        }

        .preview-content {
          padding: 1.5rem;
        }

        .preview-content p {
          margin-bottom: 1rem;
        }

        .preview-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .notification-group,
        .privacy-group {
          margin-bottom: 2rem;
        }

        .checkbox-group {
          margin-bottom: 1rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .checkbox-label:hover {
          background: #e3f2fd;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .checkbox-text {
          font-weight: 500;
          color: #333;
        }

        .save-btn {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        @media (max-width: 1024px) {
          .settings-content {
            grid-template-columns: 1fr;
          }

          .settings-sidebar {
            position: static;
          }

          .tabs-list {
            flex-direction: row;
            overflow-x: auto;
          }

          .tab-btn {
            min-width: 150px;
          }
        }

        @media (max-width: 768px) {
          .settings {
            padding: 1rem;
          }

          .settings-main {
            padding: 1rem;
          }

          .password-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;