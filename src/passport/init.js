const signup = require('./signup');
const User = require('../model/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // login(passport);
  signup(passport);
};
