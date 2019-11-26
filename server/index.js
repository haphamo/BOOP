// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors'); 
// const fileUpload = require('express-fileupload'); 

const app = express();

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
}));
// app.use(fileUpload());

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

// Define routes
// Move to auth-routes.js later
app.get('/auth/facebook', 
  passport.authenticate('facebook', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  }
  );

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});




