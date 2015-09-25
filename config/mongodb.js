/**
 * Module dependencies required
 */
var Logger = require('../config/logger');
var logger = Logger.logger;
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
    logger.info('Conetandose al servidor de MongDB, base de datos: ' + DBName);

    var con = mongoose.connection;

    // show in logger connection status
    con.once('open', function () {
        logger.info('Conectado al servidor MongoDB correctamente!');
    });
}

// Export the function that initialize MongoDB
module.exports.setupMongoDB = setupMongoDB;