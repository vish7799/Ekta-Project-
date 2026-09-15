const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const config = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorMiddleware');
const routes = require('./routes');

const app = express();

const normalizeOrigin = (origin) => String(origin || '').trim().replace(/\/$/, '');

const publicSiteUrl =
  process.env.PUBLIC_SITE_URL || 'http://localhost:3000';

// ----------------------------------------------------
// Security HTTP headers
// ----------------------------------------------------
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// ----------------------------------------------------
// CORS configuration
// ----------------------------------------------------
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (server-to-server, curl, health checks, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Development: allow configured localhost origins only
      if (
        config.env === 'development' &&
        config.corsOrigin.includes(origin)
      ) {
        return callback(null, true);
      }

      // Production: allow only explicitly configured origins
      if (config.corsOrigin.includes(normalizeOrigin(origin))) {
        return callback(null, true);
      }

      return callback(new Error('CORS policy violation.'));
    },

    credentials: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  })
);

// ----------------------------------------------------
// Logging
// ----------------------------------------------------
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ----------------------------------------------------
// API rate limiting
// ----------------------------------------------------
app.use('/api/', apiLimiter);

// ----------------------------------------------------
// Request body limits
// ----------------------------------------------------
app.use(
  express.json({
    limit: '1mb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '1mb',
  })
);

// ----------------------------------------------------
// NoSQL injection sanitization
// ----------------------------------------------------
app.use(mongoSanitize());

// ----------------------------------------------------
// Robots.txt
// ----------------------------------------------------
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');

  res.send(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /api/',
      `Sitemap: ${publicSiteUrl}/sitemap.xml`,
    ].join('\n')
  );
});

// ----------------------------------------------------
// Dynamic Sitemap.xml
// ----------------------------------------------------
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');

  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${publicSiteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${publicSiteUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${publicSiteUrl}/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${publicSiteUrl}/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${publicSiteUrl}/industries</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${publicSiteUrl}/clients</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${publicSiteUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

// ----------------------------------------------------
// Static uploaded media
// ----------------------------------------------------
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '../uploads'))
);

// ----------------------------------------------------
// API v1 routes
// ----------------------------------------------------
app.use('/api/v1', routes);

// ----------------------------------------------------
// 404 handler
// ----------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found on server.`,
  });
});

// ----------------------------------------------------
// Centralized error handler
// ----------------------------------------------------
app.use(errorHandler);

module.exports = app;