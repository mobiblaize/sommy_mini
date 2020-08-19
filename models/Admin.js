const Sequelize = require('sequelize');
const db = require('../config/database');

const Admin = db.define('admin', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    master: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Admin;