const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await Admin.findOne({ where: { email } });
        if (user === null) {
            console.log("couldn't find it");
            return done(null, false, { message: 'No user with that email'});
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("correct password");
                return done(null, user)
            } else {
                console.log("Incorrect password");
                return done(null, false, { message: 'Incorrect password'});
            }
        } catch (e) {
            return done(e);
        }
    }
    passport.use(new LocalStrategy( { usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await Admin.findByPk(id)
        done(null, user)
     });
}

module.exports = initialize;