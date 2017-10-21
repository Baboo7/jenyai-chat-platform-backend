const config = {
  encryptionKey: process.env.ENCRYPTION_KEY || 'key',
  port: process.env.PORT || 8080,
  tmpPath: '/tmp'
};

module.exports = config;
