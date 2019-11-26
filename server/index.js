// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require('express');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const cors = require('cors'); 
// const fileUpload = require('express-fileupload'); 

const app = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const usersRoutes = require("./routes/users");
const petsRoutes = require("./routes/pets");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Routes
app.use("/api/users", usersRoutes(db));
app.use("/api/pets", petsRoutes(db));

// Use CORS and File Upload modules here
app.use(cors());
// app.use(fileUpload());

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: "http://localhost:3000/auth"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate(function(err, user) {
//     if (err) { return done(err); }
//     done(null, user);
//   });
//   }
// ));

// Define routes

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});




