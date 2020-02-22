const router = require('express').Router();


router.get('/profile', (req, res, next) => {
    //console.log(req.user);
    if (req.user) {
        console.log('Logged');
        next();
    } else {
        res.redirect('/auth/login')
    }
}, (req, res) => {
    res.render('profile', {
        title: 'profile',
        user: req.user
    });
    //console.log(req.user);
})



module.exports = router;