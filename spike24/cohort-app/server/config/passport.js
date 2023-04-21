import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/users.js'
import * as dotenv from "dotenv";
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const strategy = new JwtStrategy(options, function(jwt_payload, done) {
  User.findById(jwt_payload.sub, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
})

export const passportConfig = () => {
  passport.use(strategy);
}

