const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
const uuid = require('node-uuid');
const User = mongoose.model('User');

const cons = require('../../config/const');

class UserController {

  list(req, res) {
    let query = sanitize(req.query);

    User.find(query)
        .exec()
        .then(users => {
          return res.status(cons.http.SUCCESS).json(users);
        })
        .catch(err => {
          return res.status(cons.http.INTERNAL_SERVER_ERROR).json(err);
        });
  }

  post(req, res) {

    //TODO: check data before creating
    let user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = user.encryptPassword(req.body.password);
    user.type = req.body.type;
    user.token = uuid.v4();

    user.save()
        .then(response => res.status(cons.http.SUCCESS).json(response))
        .catch(err => res.status(cons.http.INTERNAL_SERVER_ERROR).json(err));
  }

}

module.exports = new UserController();
