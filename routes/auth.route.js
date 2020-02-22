const router = require('express').Router();
//passport
require('../config/passport-setup');
const passport = require('passport');




router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/google/redirect', passport.authenticate('google'), (req,res)=> {
    //console.log(req.query.code);
    //res.send('google/redirect')
    res.redirect('/profile')
})

router.get('/logout', function (req, res) {
    req.logout(); // remove all session data 
   // req.session.destroy();
    res.redirect('/');

})

module.exports = router;