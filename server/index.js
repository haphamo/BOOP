// Web server config
const PORT = process.env.PORT || 3001;
const express = require('express');
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const cors = require('cors'); 
// const fileUpload = require('express-fileupload'); 

const app = express();

// const db = require("./db");

// const users = require("./routes/users");
// const pets = require("./routes/pets");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Routes
// app.use("/api/users", usersRoutes(db));
// app.use("/api/pets", userPetsRoutes(db));

// Use CORS and File Upload modules here
// app.use(cors());
// app.use(fileUpload());

// Sample route
app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// GET the uploaded images from Uploadcare
app.get('https://ucarecdn.com/:uuid/', (req, res) => {
  console.log("What is req body?", req.body)
  type: POST
  result:

})

// POST to /users/pets/id/images
app.post('/api/users/pets/id/images', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});




