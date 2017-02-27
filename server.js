require('dotenv').config(); // remove for production
var express = require('express');
var app = express();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash    = require('connect-flash');
var path = require('path');

require('./app_api/models/db.js')
require('./app_api/config/passport')(passport);
var routes = require('./app_api/routes/apiRoutes.js')
var googleRoutes = require('./app_api/routes/googleRoutes.js')

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes)
app.use('/', googleRoutes)
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'app_client')))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.listen(8000);
