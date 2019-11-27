const router = require("express").Router();
const passport = require('passport');

// /auth/facebook — authenticate via passport fb
// /auth/login/success — returns login success response with user information
// /auth/login/failed — returns login failed message
// /auth/logout — logout and redirects to client home page
// /auth/facebook/redirect — redirect to home page if login succeeded or to /auth/login/failed if failed

// Still need to save the user info into the database

module.exports = db => {
  // When login is successful, retrieve user info
  router.get("/login/success", (req, res) => {
    if(req.user) {
      res.json({
        success: true,
        message: 'User has been authenticated',
        user: req.user,
        cookies: req.cookies
      })
    }
  })

  // When login failed, send a failed message
  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: 'User failed to authenticate.'
    })
  })

  // When user logs out, redirect to homepage
  router.get("/logout", (req, res) => {
    req.logout()
    res.redirect('http://localhost:3000/')
  })
  
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