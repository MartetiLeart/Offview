const passport = require("passport");
const { baseSchema } = require(`../model/user`);
const { Strategy, ExtractJwt } = require(`passport-jwt`);
require("dotenv").config();

const opts = {
  secretOrKey: process.env.APP_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      let user = await baseSchema
        .findById(id, function (err, base) {
          if (!base) {
            console.log(err);
          }
          return base;
        })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
      if (!user) {
        throw new Error("User not found");
      }
      return done(null, user.getUserInfo());
    } catch (err) {
      done(null, false);
    }
  })
);
