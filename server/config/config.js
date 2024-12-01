require('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: process.env.DB_BASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: `${process.env.DB_BASE}_test`,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: `${process.env.DB_BASE}_prod`,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};
