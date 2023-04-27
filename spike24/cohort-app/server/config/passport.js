import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/users.js'
import * as dotenv from "dotenv";
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const strategy = new JwtStrategy(options, async(jwt_payload, done) => {
  User.findById(jwt_payload.sub)
    .then((user) => {
      console.log(user);
      done(null, user)
    })
    .catch((error) => {
      console.log(error);
      done(error, false)
    });
})

export const passportConfig = () => {
  passport.use(strategy);
}

