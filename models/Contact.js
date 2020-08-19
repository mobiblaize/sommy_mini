const Sequelize = require('sequelize');
const db = require('../config/database');

const Contact = db.define('contact', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    findUs: {
        type: Sequelize.STRING
    },
    news: {
        type: Sequelize.BOOLEAN
    },
    message: {
        type: Sequelize.STRING
    },
});

module.exports = Contact;