const controller = require('../controllers/auth.controller');
const permission = require('../utils/permission.utils');

module.exports = function (app) {

  app.route('/auth/login')
      .post(controller.login);

  app.route('/auth/logout')
      .post(permission.isLoggedIn, controller.logout);
};
