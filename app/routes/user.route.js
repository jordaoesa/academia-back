const controller = require('../controllers/user.controller');
const permission = require('../utils/permission.utils');

module.exports = function (app) {

  app.route('/users')
      .get(permission.isLoggedIn, controller.list)
      .post(permission.isLoggedIn, controller.post);
};
