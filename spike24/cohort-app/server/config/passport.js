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
  try {
    const existingUser = await User.findById(jwt_payload.sub);
    existingUser ? done(null, existingUser) : done(null, false);
  } catch(error) {
    console.log(error)
    done(error, false)
  }
  // User.findById(jwt_payload.sub)
  //   .then((user) => done(null, user))
  //   .catch((error) => done(error, false));
})

export const passportConfig = () => {
  passport.use(strategy);
}

