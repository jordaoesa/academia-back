const mongoose = require('mongoose');
const cons = require('./const.js');

module.exports = function() {

    mongoose.connect(cons.db.uri, cons.db.options);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Connected in ' + cons.db.uri);
    });

    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Disconnected from ' + cons.db.uri);
    });

    mongoose.connection.on('error', function(erro) {
        console.log('Mongoose! Connection Error: ' + erro);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose! Disconnected by application termination');
            process.exit(0);
        });
    });
};
