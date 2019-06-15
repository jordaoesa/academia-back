const passport = require('passport');
const cons = require('../../config/const');

module.exports =  {
  isLoggedIn: passport.authenticate('user', { session: false }),

  isLogged: function(req, res, next) {
    passport.authenticate('user', {session: false}, function(err, user, info) {
      if (err) { return res.status(cons.http.UNAUTHORIZED).send(cons.errorDetails.UNAUTHORIZED_USER); }
      if (!user) { return res.status(cons.http.UNAUTHORIZED).send(cons.errorDetails.WRONG_USERNAME_PASSWORD); }

      //success
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return next();
      });

    })(req, res, next)
  },

  //TODO: to use with different user types
  roleAuthorization: function(roles){
    return function(req, res, next) {
      if(roles.indexOf(req.user.type) > -1) {
        return next();
      }
      return res.status(cons.http.UNAUTHORIZED).send(cons.errorDetails.UNAUTHORIZED_USER);
    }
  }

};
