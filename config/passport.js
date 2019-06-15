const mongoose = require('mongoose');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = mongoose.model('User');

const cons = require('../config/const');

module.exports = function () {

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('user', new BearerStrategy(
      function (token, callback) {
        User.findOne({token: token}, function (err, user) {
          if (err) {
            return callback(err);
          }
          if (!user) {
            return callback(cons.errorDetails.UNAUTHORIZED_USER, false);
          }
          if (user.token_expiration_date < new Date()) {
            return callback(null, false);
          }

          let expirationDate = new Date();
          expirationDate.setMinutes(expirationDate.getMinutes() + cons.userSession.TIME);
          user.token_expiration_date = expirationDate;
          user.save()
              .then(() => {
                return callback(null, user);
              })
              .catch(err => {
                return callback(err, false);
              });
        }).read('secondaryPreferred');
      }));
};
