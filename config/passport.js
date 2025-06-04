const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../mudole/user");

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "User not found" });
            }

            // isMatch
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (isMatch) {
                done(null, user);
              } else {
                done(null, false, { message: "Wrong password" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}

module.exports = initialize;
