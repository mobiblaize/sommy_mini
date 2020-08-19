const Sequelize = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('dbaqga9bmg3nro', 'cjsfjqwemjzpjp', 'c37ab60bea34ccf0fa476464a5ab8ff7071d465e91f113e045f5b5eb209c1e7e', {
  host: 'ec2-35-175-155-248.compute-1.amazonaws.com',
  dialect: 'postgres'
});