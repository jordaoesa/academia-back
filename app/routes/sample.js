const controller = require('../controllers/sample');

module.exports = function (app) {

    app.route('/sample')
        .get(controller.list)
        .post(controller.post);
};
