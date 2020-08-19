const Sequelize = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('sommy_mini', 'postgres', 'webapp', {
  host: 'localhost',
  dialect: 'postgres'
});