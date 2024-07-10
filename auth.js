const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    //authentication logic

    try {
      console.log("Received Credentials:", USERNAME, PASSWORD);
      const user = await Person.findOne({ username: USERNAME });

      if (!user) {
        return done(null, false, { message: "incorrect username:" });
      }

      const isPasswordMatch = await user.comparePassword(PASSWORD);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password: " });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
