import { User } from "../models/users.js";
import { encryptPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";

const test = (req, res) => {
  res.status(200).json('route connection established')
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().populate("pets");
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e })
  }
}

const getUserByEmail = async (req, res) => {
  // console.log(req.params);
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          username: user.username
        }
      })
    } else {
      res.status(404).json({ error: "No user found" })
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}

const getUserById = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const registerUser = async(req, res) => {
  console.log(req.body)
  console.log(req.file)
  // if (!req.body.email|| !req.body.password || !req.body.username) return res.status(406).json({ error: "Please fill out all fields" })
  // const newUser = new User({
  //   ...req.body
  // });
  // try {
  //   const result = await newUser.save();
  //   res.status(200).json(result)
  // } catch(e) {
  //   console.log(e)
  //   e.code === 11000 ? res.status(406).json({ error: "That email is already registered" }) 
  //   : res.status(500).json({ error: "Unknown error occured", ...e })
  // }
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

export { getUserById, createUser, updateUser, test, getAllUsers, getUserByEmail, registerUser }