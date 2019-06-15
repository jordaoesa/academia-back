const mongoose = require('mongoose');
const User = mongoose.model('User');

const cons = require('../../config/const');

class AuthController {

  login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    return User.findOne({username: username})
        .exec()
        .then(user => {
          if (user) {
            console.log(JSON.stringify(user))

            if (!user.isValidPassword(password)) {
              res.status(cons.http.FORBIDDEN).json(cons.errorDetails.WRONG_USER_PASSWORD);
            }

            let expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + cons.userSession.TIME);
            user.token_expiration_date = expirationDate;
            user.save();

            res.status(cons.http.SUCCESS).json(user);
          } else {
            res.status(cons.http.NOT_FOUND).json(cons.http.USER_NOT_FOUND);
          }
        })
        .catch(err => {
          res.status(cons.http.INTERNAL_SERVER_ERROR).json(err)
        });
  }

  logout(req, res) {
    return User.findByIdAndUpdate(req.user._id, {token_expiration_date: new Date()}, {new: true})
        .exec()
        .then(user => {
          res.status(cons.http.SUCCESS).json(cons.successDetails.USER_SIGN_OUT_SUCCESS);
        })
        .catch(err => {
          res.status(cons.http.INTERNAL_SERVER_ERROR).end();
        });

  }

}

module.exports = new AuthController();
