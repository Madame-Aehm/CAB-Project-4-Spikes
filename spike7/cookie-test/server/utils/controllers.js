import { generateToken } from "./jwt.js";
import { UserModel } from "./models.js"
import 'dotenv/config'

const env = process.env.NODE_ENV === "production" ? true : false;

export const login = async(req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "no user" });
    if (user.password !== req.body.password) return res.status(401).json({ error: "password falsch" });
    const token = generateToken(user);
    res.status(200)
    .header('Access-Control-Allow-Credentials', true)
    .cookie("token", token, { withCredentials: true, httpOnly: env, secure: env })
    .json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "problem" });
  }
}

export const register = async(req, res) => {
  try {
    const newUser = await UserModel.create({ email: req.body.email, password: req.body.password });
    const token = generateToken(newUser);
    const oneDay = 1000 * 60 * 60 * 24;
    res.status(200)
      .header('Access-Control-Allow-Credentials', true)
      .cookie("token", token, { withCredentials: true, httpOnly: env, secure: env })
      .json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "problem" });
  }
}

export const getActiveUser = async(req, res) => {
  res.status(200).json(req.user);
}