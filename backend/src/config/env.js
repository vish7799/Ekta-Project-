const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const isProduction = process.env.NODE_ENV === 'production';

const normalizeOrigin = (origin) => String(origin || '').trim().replace(/\/$/, '');

const configuredCorsOrigins = [
  ...(process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : []),
  process.env.PUBLIC_SITE_URL,
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].map(normalizeOrigin).filter(Boolean);

if (
  isProduction &&
  (!process.env.MONGODB_URI ||
    !process.env.JWT_SECRET ||
    process.env.JWT_SECRET.length < 32)
) {
  throw new Error(
    'Production requires MONGODB_URI and a JWT_SECRET with at least 32 characters.'
  );
}

const config = {
  env: process.env.NODE_ENV || 'development',

  port: parseInt(process.env.PORT || '5000', 10),

  // MongoDB
  mongoUri:
    process.env.MONGODB_URI ||
    (isProduction
      ? ''
      : 'mongodb://127.0.0.1:27017/ekta_electricals'),

  // JWT
  jwtSecret:
    process.env.JWT_SECRET ||
    (isProduction
      ? ''
      : 'fallback_development_secret_key_change_in_prod'),

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // CORS
  corsOrigin: configuredCorsOrigins.length > 0
    ? configuredCorsOrigins
    : isProduction
      ? []
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:5173',
          'http://localhost:5174',
          'http://127.0.0.1:3000',
          'http://127.0.0.1:3001',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:5174',
        ],

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(
      process.env.RATE_LIMIT_WINDOW_MS || '900000',
      10
    ),

    max: parseInt(
      process.env.RATE_LIMIT_MAX_REQUESTS || '100',
      10
    ),

    authMax: parseInt(
      process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || '5',
      10
    ),
  },

  // File uploads
  uploads: {
    maxSizeBytes: parseInt(
      process.env.MAX_FILE_SIZE_BYTES || '209715200',
      10
    ),

    allowedTypes: process.env.ALLOWED_FILE_TYPES
      ? process.env.ALLOWED_FILE_TYPES
          .split(',')
          .map((type) => type.trim())
          .filter(Boolean)
      : [
          'image/jpeg',
          'image/png',
          'image/webp',
          'application/pdf',
        ],

    uploadDir: path.resolve(
      __dirname,
      '../../uploads'
    ),
  },

  // Email
  mail: {
    host: process.env.SMTP_HOST || '',

    port: parseInt(
      process.env.SMTP_PORT || '587',
      10
    ),

    secure: process.env.SMTP_SECURE === 'true',

    user: process.env.SMTP_USER || '',

    password: process.env.SMTP_PASSWORD || '',

    from:
      process.env.MAIL_FROM ||
      process.env.SMTP_USER ||
      '',

    companyRecipient:
      process.env.ENQUIRY_NOTIFICATION_EMAIL ||
      'Ektaa.electrical@gmail.com',

    sendCustomerAcknowledgement:
      process.env.SEND_CUSTOMER_ACKNOWLEDGEMENT === 'true',
  },
};

module.exports = config;