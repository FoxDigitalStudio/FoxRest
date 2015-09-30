/**
 * Copyright (c) 2015-present, Fox Digital Studio SAS.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var ejs = require('ejs');
var logger = require('./config/logger').logger;

// Choose the environment of work
var environment = 'devLocal';
// Loading global a configuration
var config = require('./config/globals.json')[environment];
//
logger.info('Choose the work environment: ' + environment);

// Current version
logger.info('API version: ' + config.version);