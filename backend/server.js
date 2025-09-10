// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import mongoose from 'mongoose';

// Routes
import authRoutes from './src/routes/authRoutes.js';
import noticeRoutes from './src/routes/noticeRoutes.js';
import departmentRoutes from './src/routes/departmentRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import facultyRoutes from './src/routes/facultyRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import resultRoutes from './src/routes/resultRoutes.js';
import alumniRoutes from './src/routes/alumniRoutes.js';

import { errorHandler, notFound } from './src/middleware/error.js';

const app = express();

// ---------- Middleware ----------
app.use(helmet());

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://college-website-fron-final.vercel.app',
  'https://college-website-fron-final-eo7jvu2hl.vercel.app'
];
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked for origin: ' + origin), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Content-Length'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
// @ts-ignore
app.use(xss());
app.use(morgan('dev'));

// ---------- Rate Limit ----------
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
  handler: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(429).json({ message: 'Too many requests' });
  },
});
app.use('/api/auth', authLimiter);

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/alumni', alumniRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---------- Error Handlers ----------
app.use(notFound);
app.use(errorHandler);

// ---------- DB + Server ----------
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_website';

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    const server = app.listen(PORT, () => {
      console.log(`🚀 API running on http://localhost:${PORT}/api`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      server.close(() => {
        console.log(`Server closed after ${signal}`);
        process.exit(0);
      });
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.once('SIGUSR2', () => {
      server.close(() => process.kill(process.pid, 'SIGUSR2'));
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();
