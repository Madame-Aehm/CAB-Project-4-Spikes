import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    sub: user._id,
  }
  const options = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options)
  return token
}