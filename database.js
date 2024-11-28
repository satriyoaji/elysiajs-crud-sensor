require('dotenv').config();

console.log({
    driver: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});

module.exports = {
  dev: {
    // driver: process.env.DB_DRIVER || 'pg',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'default_database',
    username: process.env.DB_USER || 'default_user',
    password: process.env.DB_PASS || 'default_password',
  },
//   production: {
//     // driver: process.env.DB_DRIVER || 'pg',
//     host: process.env.DB_HOST || 'localhost',
//     port: parseInt(process.env.DB_PORT, 10) || 5432,
//     database: process.env.DB_NAME || 'default_database',
//     username: process.env.DB_USER || 'default_user',
//     password: process.env.DB_PASS || 'default_password',
//     ssl: {
//       rejectUnauthorized: false, // For production use if required
//     },
//   },
};
