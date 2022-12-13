/* eslint-disable no-console */
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const User = require('../model/user');

// Generates hash using bCrypt
const createHash = (password) =>
  bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

module.exports = (passport) => {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, res, username, password, done) => {
        // eslint-disable-next-line no-undef
        findOrCreateUser = () => {
          // eslint-disable-next-line consistent-return
          User.findOne({ username: req.body.email }, (err, user) => {
            if (err) {
              return done(err);
            }

            if (user) {
              console.log(`User already exists with username: ${username}`);
              return done(null, false, res.send('User Already Exists'));
            }

            const newUser = new User();

            newUser.email = username;
            newUser.password = createHash(password);

            // eslint-disable-next-line no-shadow
            newUser.save((err) => {
              if (err) {
                console.log(`Error in Saving user: ${err}`);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          });
        };

        // eslint-disable-next-line no-undef
        process.nextTick(findOrCreateUser);
      }
    )
  );
};
