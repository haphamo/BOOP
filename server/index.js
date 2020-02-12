// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require('express');
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors'); 
const app = express();
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const config = require('../configuration/config');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const fileUpload = require('express-fileupload'); 

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Routes
const usersRoutes = require("./routes/users");
const petsRoutes = require("./routes/pets");
// const authRoutes = require("./routes/auth-routes");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ["WOOF"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Parse cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(pino);

// Routes
app.use("/api/users", usersRoutes(db));
app.use("/api/pets", petsRoutes(db));
// app.use("/api/auth", authRoutes(db));

// Initialize Passport
app.use(passport.initialize());
// Deserialize cookie from the browser
app.use(passport.session());

// Use CORS and File Upload modules here
app.use(cors({
  origin: "http://localhost:3000/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204
}))
// app.use(fileUpload());

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/",
//   profileFields: ['id', 'displayName','email'],
//   enableProof: true
// },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     })
//   }
// ))

// passport.serializeUser(function(user, cb) {
//   cb(null, user)
// })

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj)
// })

// Register, Login and Logout Routes
// Create a new user
// POST /register
app.post("/register", (req, res) => {

  // Check if the user exists in the the database, if not create a new user
  db.query(`SELECT email FROM users WHERE email = $1`, [req.body.registerEmail])
  .then(data => {
    if(data.rows.length > 0) {
      res.json({
        message: "Email already exists!",
        
      })
    } else {
      db.query(
        `INSERT INTO users (first_name, last_name, email, password, city, post_code, profile_photo)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        , [req.body.registerFirstName, 
           req.body.registerLastName, 
           req.body.registerEmail, 
           req.body.registerPassword, 
           req.body.city, 
           req.body.post_code, 
           req.body.profile_photo])
        .then(data => {
          // set cookie
          let newUser = data.rows[0]
          req.session.user_id = newUser.id
         res.json({
          loggedIn: true, 
          userId: newUser.id,
         })
         
      })
    }
  })
  .catch(err => {
    console.error(err)
  })
})

// POST /login
// Will implement bcrypt later
app.post("/login", (req, res) => {  
    db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    .then(data => {
    if(data.rows.length) {
      let existingUser = data.rows[0]
      if(req.body.password === existingUser.password) {
        req.session.user_id = existingUser.id
        res.json({
          loggedIn: true, 
          userId: existingUser.id
        })
      } else {
        res.json({
          loggedIn: false
        })
      }
    }
  })
})

// POST /logout
app.post("/logout", (req, res) => {
  req.session = null
  res.json({
    loggedOut: true
  })
})

// Route for authenticating with Facebook 
// In auth-routes.js - will test to see if it works from there before deleting
// Session cookie is not being recognized in the log in
// app.get('/auth/facebook', 
//   passport.authenticate('facebook'),
//   function(req, res) {
//     console.log("What is the request?", req)
//     console.log("What is the response?", res)
//     res.json({ 
//       loggedIn: true,
//       id: req.session.user_id, 
//       username: req.user.username 
//     })
//   }
// )

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/',
//                                       failureRedirect: '/login' }))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})






