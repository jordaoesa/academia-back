const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = function() {
    const app = express();

    app.set('port', process.env.PORT || 3000);

    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(helmet());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    consign({verbose: false})
        .include('app/models')
        .then('app/controllers')
        .then('app/routes')
        .into(app);

    return app;
};
