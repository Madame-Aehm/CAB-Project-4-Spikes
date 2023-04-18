import { User } from "../models/users.js";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { signToken } from "../utils/jwt.js";


const getUserById = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const createUser = async(req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) return res.status(406).json({ error: "Please fill out all fields" })
  const encryptedPassword = await encryptPassword(req.body.password);
  const uploadedImage = await imageUpload(req.file, "user_avatars");
  const newUser = new User({ 
    email: req.body.email,
    password: encryptedPassword,
    username: req.body.username,
    avatar: uploadedImage
   });
  try {
    const result = await newUser.save();
    res.status(200).json(result)
  } catch(e) {
    console.log(e)
    e.code === 11000 ? res.status(406).json({ error: "That email is already registered" }) 
    : res.status(500).json({ error: "Unknown error occured", ...e })
  }
}

const updateUser = async(req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const logIn = async(req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const verified = await verifyPassword(req.body.password, existingUser.password);
      if (verified) {
        // res.status(200).json(existingUser)
        const token = signToken(existingUser);
        res.status(200).json(token)
      } else {
        res.status(401).json({ error: "Password doesn't match" })
      }
    } else {
      res.status(404).json({ error: "User not found" })
    }
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

export { getUserById, createUser, updateUser, logIn }