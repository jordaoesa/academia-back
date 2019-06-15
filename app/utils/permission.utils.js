const passport = require('passport');
const cons = require('../../config/const');

module.exports =  {
  isLoggedIn: passport.authenticate('user', { session: false }),

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
