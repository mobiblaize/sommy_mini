const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Contact = require('../models/Contact');

router.get('/', (req, res) => res.render('index', { layout: 'landing'}));

router.get('/gallery', (req, res) => res.render('gallery'));

router.get('/master', (req, res) => res.render('master'));

router.get('/contact', (req, res) => res.render('contact'));

router.post('/order', (req, res) => {

    let { name, phone, email, location, pastry, size, description, date } = req.body;
    let errors =[];

    if (!name) {
        errors.push( {text: 'please add a name' });
    }
    if (!phone) {
        errors.push( {text: 'please add your phone number' });
    }
    if (!location) {
        errors.push( {text: 'please add a location' });
    }
    if (!pastry) {
        errors.push( {text: 'please select a pastry' });
    }
    if (!size) {
        errors.push( {text: 'please select a size' });
    }
    if (!date) {
        errors.push( {text: 'please add a delivery date' });
    }

    //Check for errors
    if (errors.length > 0) {
        res.render('index', { 
            layout: 'landing',
            errors, name, phone, email, location, pastry, size, description, date
        })
    } else {
        if (!email) email = 'None';
        if (!description) description = 'None';
        //Insert into table
        Order.create({
            name, phone, email, location, pastry, size, description, date, delivered: false
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
        }
})

router.post('/contact', (req, res) => {
    console.log(req.body);
    let { name, email, findUs, news, message } = req.body;
    let errors =[];

    if (!name) {
        errors.push( {text: 'please add a name' });
    }
    if (!email) {
        errors.push( {text: 'please add your email' });
    }
    if (!findUs) {
        errors.push( {text: 'please select a source' });
    }
    if (!message) {
        errors.push( {text: "you haven't entered your message" });
    }

    //Check for errors
    if (errors.length > 0) {
        res.render('contact', { 
            errors, name, email, findUs, news, message
        })
    } else {
        if (!news) news = false;
        //Insert into table
        Contact.create({
            name, email, findUs, news, message
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
        }
});


module.exports = router;