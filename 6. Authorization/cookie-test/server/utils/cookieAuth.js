import jwt from "jsonwebtoken";
import { UserModel } from "./models.js"

const cookieAuth = async (req, res, next) => {
  console.log("cookie: ", req.cookies);
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Access denied: No token provided." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.sub);
    req.user = user;
    next();
  } catch (e) {
    console.log("error", e);
    res.clearCookie("token").status(500).send({ error: e.message });
  }
};

export default cookieAuth