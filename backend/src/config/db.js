const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  if (!config.mongoUri) {
    console.error('[Database Error] MONGODB_URI is not configured.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(config.mongoUri, {
      autoIndex: config.env === 'development',
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(
      `[Database] MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`
    );

    return conn;
  } catch (error) {
    console.error(
      `[Database Error] MongoDB connection failed: ${error.message}`
    );

    console.error(
      '[Database Error] Backend cannot continue without the configured MongoDB database.'
    );

    process.exit(1);
  }
};

module.exports = connectDB;