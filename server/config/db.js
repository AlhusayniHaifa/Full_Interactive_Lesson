import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let db = null;

const checkConnection = async () => {
  try {
    if (!db) {
      db = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'education',
        port: process.env.DB_PORT || 3306
      });
    }
    
    // Test the connection
    await db.execute('SELECT 1');
    console.log('✅ MySQL database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MySQL database connection failed:', error.message);
    throw error;
  }
};

const getDatabase = async () => {
  if (!db) {
    await checkConnection();
  }
  return db;
};

const initializeDatabase = async () => {
  try {
    await checkConnection();
    console.log('🔄 MySQL database initialized');
  } catch (error) {
    console.error('Failed to initialize MySQL database:', error.message);
    throw error;
  }
};

export { checkConnection, getDatabase, initializeDatabase };