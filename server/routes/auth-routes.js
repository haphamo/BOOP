const router = require("express").Router();
const passport = require('passport');

// /auth/facebook — authenticate via passport twitter
// /auth/login/success — returns login success response with user information
// /auth/login/failed — returns login failed message
// /auth/logout — logout and redirects to client home page
// /auth/facebook/redirect — redirect to home page if login succeeded or to /auth/login/failed if failed

module.exports = db => {
  // Authenticate with Facebook
  router.get('/auth/facebook', 
    passport.authenticate('facebook', { session: false }),
    function(req, res) {
      res.json({ id: req.user.id, username: req.user.username })
    }
  )
  // Redirect to the dashboard after logging in
  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/',
                                      failureRedirect: '/auth/login/failed' }));
}