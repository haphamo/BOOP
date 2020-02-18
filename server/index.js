// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require('express');
const passport = require('passport');
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors'); 
const app = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Routes
const usersRoutes = require("./routes/users");
const petsRoutes = require("./routes/pets");

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})






