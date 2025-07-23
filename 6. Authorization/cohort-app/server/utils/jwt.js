import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    sub: user._id,
    email: user.email,
    avatar: user.avatar
  }
  const options = {
    expiresIn: "7d",
  };
  const secretOrPrivateKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretOrPrivateKey, options)
  return token
}