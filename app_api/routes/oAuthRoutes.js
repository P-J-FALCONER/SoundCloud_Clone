var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/#!/topchart',
    failureRedirect: '/#!'
  })
)

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#!/topchart',
    failureRedirect: '/#!'
  })
)

router.post('/register', passport.authenticate('local-signup'), function(req, res){
  return res.json(req.user)
})


router.post('/login', passport.authenticate('local-login'), function(req, res){
  return res.json(req.user)
})

// function isLoggedIn(req, res, next) {
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }

module.exports = router;
