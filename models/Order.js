const Sequelize = require('sequelize');
const db = require('../config/database');

const Order = db.define('orders', {
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    pastry: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    delivered: {
        type: Sequelize.BOOLEAN
    },
});

module.exports = Order;