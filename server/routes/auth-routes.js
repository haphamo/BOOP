const router = require("express").Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = db => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/",
    enableProof: true
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  ));
  
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  router.get('/auth/facebook', 
    passport.authenticate('facebook', { session: false }),
    function(req, res) {
      res.json({ id: req.user.id, username: req.user.username })
    }
  )
  
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('http://localhost:3000/')
    })
  
  return router;
}