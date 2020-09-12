const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Contact = require('../models/Contact');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const passport = require('passport');
const initialilizePassport = require('../config/passport-config');

initialilizePassport(passport);

// router.get('/', (req, res) => res.render('admin', { layout: 'alpha', name: req.user.name}));
router.get('/', checkAuthenticated, (req, res) => {
    res.render('admin', { layout: 'alpha', name: req.user.name, title: 'Back Office'})
} );

router.get('/login', checkNotAuthenticated, (req, res) => res.render('login', { layout: false}));

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}))

router.delete('/logout', checkAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/admin/login');
})

router.get('/register', checkAuthenticated, (req, res) => res.render('registerAdmin', { layout: false}));

router.post('/register', checkAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            master: false
        })
        .then(() => res.redirect('/admin/login'))
        .catch(err => console.log(err));
    } catch {
        res.redirect('/admin/register')
    }
});

//Get order list
router.get('/orders', checkAuthenticated, (req, res) => 
    Order.findAll()
        .then(orders => {
            res.render('orders', { layout: 'alpha', orders, title: 'Orders'});
        })
        .catch(err => console.log(err)));

//Get Message list
router.get('/messages', checkAuthenticated, (req, res) => 
    Contact.findAll()
        .then(contacts => res.render('messages', { layout: 'alpha', contacts, title: 'Messages' }))
        .catch(err => console.log(err)));

router.get('/orders/search', checkAuthenticated, (req, res) => {
    let { term } = req.query;

    Order.findAll({ where: { name: { [Op.like]: '%' + term + '%'}}})
        .then(orders => res.render('orders', { layout: 'alpha', orders, term }))
        .catch(err =>console.log(err));
})

router.get('/messages/search', checkAuthenticated, (req, res) => {
    let { term } = req.query;

    Contact.findAll({ where: { name: { [Op.like]: '%' + term + '%'}}})
        .then(contacts => res.render('messages', { layout: 'alpha', contacts, term }))
        .catch(err =>console.log(err));
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/admin/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next()
}

module.exports = router;