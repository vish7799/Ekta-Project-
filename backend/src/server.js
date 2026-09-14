const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/db');

let server;

// Do not accept traffic until the database is ready.
connectDB().then(() => {
  server = app.listen(config.port, () => {
    console.log(`==================================================`);
    console.log(`EKTA ELECTRICAL WORKS - REST API Server Running`);
    console.log(`Environment: ${config.env}`);
    console.log(`Port:        ${config.port}`);
    console.log(`Health Check: http://localhost:${config.port}/api/v1/health`);
    console.log(`==================================================`);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection Error]: ${err.message}`);
  if (config.env === 'production') {
    server.close(() => process.exit(1));
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`[Uncaught Exception Error]: ${err.message}`);
  if (config.env === 'production') {
    process.exit(1);
  }
});

// Graceful shutdown on SIGTERM / SIGINT
const gracefulShutdown = (signal) => {
  console.log(`[Server] ${signal} signal received. Closing HTTP server...`);
  server.close(() => {
    console.log('[Server] HTTP server closed cleanly.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
