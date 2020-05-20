const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const userRepo = require('../../service/user');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtractor = function(req) {
  if (req && req.cookies) return req.cookies._token;
};

const opts = {
  jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY
};

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await userRepo.findByName(username.toLowerCase());
      if (!user) { return done(null, false); }
      const isEqual = await userRepo.passwordsAreEqual(user.password, password);
      if (!isEqual) { return done(null, false); }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new JWTStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await userRepo.findById(jwt_payload.userId);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
}));

module.exports = passport;