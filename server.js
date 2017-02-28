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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(cookieParser());

require('./app_api/models/db.js')
require('./app_api/config/passport')(passport);
var routes = require('./app_api/routes/apiRoutes.js')
var oAuthRoutes = require('./app_api/routes/oAuthRoutes.js')

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes)
app.use('/', oAuthRoutes)
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'app_client')))


app.listen(8000);
