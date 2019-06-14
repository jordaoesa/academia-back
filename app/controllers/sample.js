const sanitize = require('mongo-sanitize');

module.exports = function (app) {

    const Sample = app.app.models.sample;

    let controller = {};

    controller.list = function(req, res) {
        let query = sanitize(req.query);

        Sample.find({}).lean(true).exec(function(err, resultQuery){
            if (err) {
                console.log("err: " + err);
                return res.status(500).json(err);
            } else {
                return res.status(200).json(resultQuery);
            }
        });
    };

    controller.post = function(req, res) {
        new Sample(req.body)
            .save()
            .then(response => res.status(200).json(response))
            .catch(err => res.status(500).json(err));
    };

    return controller;
};
