// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// لو بتستخدمي كوكيز خلف Proxy (Railway/Vercel)، خليه 1
app.set('trust proxy', 1);

/* ===================== CORS ===================== */
// عدّلي القائمة بإضافة دومين الفرونت بعد النشر (Vercel)

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const normalize = (url) => url.replace(/\/+$/, ''); // يشيل السلاش الأخير
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // Health/Postman
    const ok = allowedOrigins.map(normalize).includes(normalize(origin));
    return ok ? cb(null, true) : cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};


// لازم يكون قبل أي routes
app.use(cors(corsOptions));
// رد على طلبات preflight لكل المسارات
app.options('*', cors(corsOptions));
/* ================================================= */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// لوج بسيط للطلبات
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: 'MySQL',
    corsAllowed: allowedOrigins,
  });
});

// Error handler عام
app.use((err, req, res, next) => {
  console.error('Error:', err?.message || err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? (err?.message || err) : 'Something went wrong'
  });
});

// Bootstrap
const startServer = async () => {
  try {
    console.log('Starting server...');

    console.log('Loading modules...');
    const { checkConnection } = await import('./config/db.js');
    const { createAllTables } = await import('./utils/dbSchema.js');
    const { insertSampleData } = await import('./utils/sampleData.js');
    const authRoutes = (await import('./routes/authRoutes.js')).default;
    const courseRoutes = (await import('./routes/courseRoutes.js')).default;
    console.log('Modules loaded successfully');

    // routes (بعد تفعيل CORS)
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    console.log('Routes configured');

    // 404 handler - بعد الراوتات
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
      });
    });

    console.log('Initializing MySQL database...');
    await checkConnection();              // يتأكد من الاتصال
    console.log('Database connection established');

    console.log('Creating database tables...');
    await createAllTables();              // ينشئ الجداول لو ناقصة
    console.log('Database tables created');

    console.log('Inserting sample data...');
    await insertSampleData();             // يضيف بيانات تجريبية لو ناقصة
    console.log('Sample data inserted');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    console.error('Error stack:', error.stack);
    console.log('Server will continue with limited functionality');
  }

  console.log('Starting Express server...');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log('Using MySQL database');
    console.log('Server ready to accept requests!');
  });
};

startServer().catch(console.error);
