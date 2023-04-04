import { User } from "../models/users.js";
import { encryptPassword } from "../utils/bcrypt.js";


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
  console.log("body:", req.body);
  console.log("file:", req.file);
  if (!req.body.email || !req.body.password || !req.body.username) return res.status(406).json({ error: "Please fill out all fields" })
  req.body.password = await encryptPassword(req.body.password);
  const newUser = new User({ ...req.body });
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

const userAvatar = async(req, res) => {

}

export { getUserById, createUser, updateUser, userAvatar }