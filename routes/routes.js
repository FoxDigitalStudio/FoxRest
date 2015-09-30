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
var logger = require('../config/logger').logger;
var moment = require('moment');

/**
 * setupRouter
 *
 * @description Configure all routes on express router
 *
 * @param   {express.Router}      router      The variable router used by the server
 */
function setupRouter (router){

    // logger for all request will first hits this middleware
    router.use(function (req, res, next) {
        var now = moment(new Date());

        var date = now.format("DD-MM-YYYY HH:mm");
        logger.info('%s %s %s', req.method, req.url, date);
        next();
    });


    /**
     *  Declare all routes
     */
    var userRoutes = require('./users');

    /**
     *  Document:  ANSWERS.JS
     *  Define routes where they are stored endpoints
     */
    //====================================================================


}

// Export the function that initialize all routes
module.exports.setupRouter = setupRouter;