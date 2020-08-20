if (process.env.NODE_ENV !== 'production') {
    require('dotenv');
}

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOveride = require('method-override');
// Database
const db = require('./config/database');

//Test db
db.authenticate()
    .then(() => console.log('Database connected....'))
    .catch(err => console.log('Error' + err));

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOveride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

//Client routes
app.use('/', require('./routes/user'));

//admin routes
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));