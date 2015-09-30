/**
 * Copyright (c) 2015-present, Fox Digital Studio SAS.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Load required packages
 */
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var ejs = require('ejs');
var logger = require('./config/logger').logger;
var routes = require('./routes/routes');

// Choose the environment of work
var environment = 'devLocal';
// Loading global a configuration
var config = require('./config/globals.json')[environment];
//
logger.info('Choose the work environment: ' + environment);

// Current API version
logger.info('API version: ' + config.version);

// Configures and initiates the connection with the NoSQL MongoDB database
var mongoDB = require('./config/mongodb');
mongoDB.setupMongoDB(config.nosqlDB);

// Create our express application
var app = express();

// Set view engine to jade
app.set('view engine', 'ejs');

// Using body-parser in our application
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
    extended: true
}));

//logger.debug("Overriding 'Express' logger");
// TODO: Solucionar este mensaje: morgan deprecated morgan(options): use morgan("default", options) instead
// TODO: Solucionar este mensaje: morgan deprecated default format: use combined format
//app.use(require('morgan')({ "stream": logger.stream }));

// Use express session support since OAuth2orize requires it
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '1f u c4n r34d th1s u r34lly n33d t0 g37 4 l1f3'
}));

// Set header 'X-Powered-By'
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Fox Digital Studio SAS');
    next();
});
logger.info('API powered by: Fox Digital Studio SAS');

// Use the passport package in our application
app.use(passport.initialize());

// Path to our public directory
app.use(express.static(__dirname + '/public'));

//ROUTER
//Create our Express router
var router  = express.Router();

// Setup all routes on express router
routes.setupRouter(router);

// Use our environment defined port or value on our config file /config/environment.json
var port = process.env.PORT || config.port;

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use(config.version, router);

// Start the server
app.listen(port);
logger.info('API running on http://localhost:' + port + config.version + '/');

// pending tasks outside the scope of the development of the API
// TODO: crear front-end para oauth2
// TODO: agregar un redirect para los clientes autorizados
// TODO: corregir en /views/authorize/dialog Linea 40, el enlace fijo de redirect
