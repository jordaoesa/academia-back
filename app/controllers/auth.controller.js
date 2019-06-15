const mongoose = require('mongoose');
const User = mongoose.model('User');

const cons = require('../../config/const');

class AuthController {

  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username: username})
        .exec()
        .then(user => {
          if (user) {
            if (!user.isValidPassword(password)) {
              return res.status(cons.http.FORBIDDEN).send(cons.errorDetails.WRONG_USERNAME_PASSWORD);
            }

            let expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + cons.userSession.TIME);
            user.token_expiration_date = expirationDate;
            user.save();

            res.set('authorization', `${user.token}`);
            res.status(cons.http.SUCCESS).send({username: user.username, name: user.name, type: user.type});
          } else {
            return res.status(cons.http.NOT_FOUND).send(cons.errorDetails.WRONG_USERNAME_PASSWORD);
          }
        })
        .catch(err => {
          return res.status(cons.http.INTERNAL_SERVER_ERROR).send(err);
        });
  }

  logout(req, res) {
    return User.findByIdAndUpdate(req.user._id, {token_expiration_date: new Date()}, {new: true})
        .exec()
        .then(user => {
          res.status(cons.http.SUCCESS).send(cons.successDetails.USER_SIGN_OUT_SUCCESS);
        })
        .catch(err => {
          res.status(cons.http.INTERNAL_SERVER_ERROR).end();
        });

  }

}

module.exports = new AuthController();
