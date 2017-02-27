var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',

  passport.authenticate('google', {
          successRedirect : '/',
          failureRedirect : '/auth/google'
  }));


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
