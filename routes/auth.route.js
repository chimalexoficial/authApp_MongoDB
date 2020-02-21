const router = require('express').Router();
//passport
require('../config/passport-setup');
const passport = require('passport');


router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/google/redirect', passport.authenticate('google'), (req,res,next)=> {
    //console.log(req.query.code);
    //res.send('google/redirect')

    res.redirect('/profile')
})

router.get('/logout', function (req, res) {
    res.send('logout')
})

router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

module.exports = router;