if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  require('dotenv').config({path:__dirname+'/../.env'})
}
const Sequelize = require('sequelize');

module.exports =  new Sequelize(process.env.DATABASE_URL);