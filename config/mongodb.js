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
var mongoose = require('mongoose');

/**
 * setupMongoDB
 *
 * @description Configures and initiates the connection with the NoSQL MongoDB database
 *
 * @param {string}      DBName      Name of the database to connect
 */
function setupMongoDB (DBName){
    //Connect to database
    mongoose.connect('mongodb://localhost:27017/' + DBName);
    logger.info('Connecting to MongoDB server, database: ' + DBName);

    var con = mongoose.connection;

    // show in logger connection status
    con.once('open', function () {
        logger.info('Connected to MongoDB successfully!');
    });
}

// Export the function that initialize MongoDB
module.exports.setupMongoDB = setupMongoDB;