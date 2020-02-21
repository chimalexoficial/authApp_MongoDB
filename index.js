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

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, './views/layouts/')
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('home', {title:'AuthAPP'})
});

app.listen(port, function () {
    console.log('Escuchando en el puerto ' + port);
});

app.use('/auth',appAuth);
app.use(profile);