module.exports = function (app) {

    const controller = app.app.controllers.sample;

    app.route('/sample')
        .get(controller.list)
        .post(controller.post);
};
