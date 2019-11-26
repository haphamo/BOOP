const router = require("express").Router();
const passport = require('passport');

module.exports = db => {
  router.get('/auth/facebook', 
    passport.authenticate('facebook', { session: false }),
    function(req, res) {
      res.json({ id: req.user.id, username: req.user.username })
    }
  )
  
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/')
    })
  
  return router;
}