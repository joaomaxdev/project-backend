const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

const sequelize = new Sequelize(config);

async function createDatabase() {
  try {
    await sequelize.query('CREATE DATABASE IF NOT EXISTS project_root');
    await sequelize.query('CREATE DATABASE IF NOT EXISTS project_root_test');
    await sequelize.query('CREATE DATABASE IF NOT EXISTS project_root_production');
    console.log('Databases created successfully');
  } catch (error) {
    console.error('Unable to create databases:', error);
  } finally {
    await sequelize.close();
  }
}

createDatabase();
