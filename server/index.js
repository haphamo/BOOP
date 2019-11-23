// load .env data into process.env
require('dotenv').config();

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
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Routes
app.use("/api/users", usersRoutes(db));
app.use("/api/pets", petsRoutes(db));

// Use CORS and File Upload modules here
// app.use(cors());
// app.use(fileUpload());

// Sample route
app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});




