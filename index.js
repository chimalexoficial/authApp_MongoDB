//express
const express = require('express');
let app = express();
const port = 3000;
const router = require('express').Router();
let appAuth = require('./routes/auth.route');
let profile = require('./routes/profile.route');

//handlebars
let hbs = require('express-handlebars');
const path = require('path');

//passport
require('./config/passport-setup');
const passport = require('passport');

//cookies
const cookieSession = require('cookie-session');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}))

//inicializar passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',appAuth);
app.use(profile);



app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, './views/layouts/')
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('home', {title:'AuthAPP'})
});
/*
app.get('/profile', function (req, res) {
    res.render('profile', {title:'AuthAPP'})
});*/


app.listen(port, function () {
    console.log('Escuchando en el puerto ' + port);
});



