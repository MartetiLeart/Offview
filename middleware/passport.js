const User = require(`../model/User`);
const passport = require();
const { Strategy, ExtractJwt } = require(`passport-jwt`);
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return done(null, user.getUserInfo);
    } catch (err) {
      done(null, false);
    }
  })
);
