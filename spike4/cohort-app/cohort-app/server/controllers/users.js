// import conn from "../config/conn.js";
import conn from "../index.js";
import { Pet } from "../models/pets.js";
import { User } from "../models/users.js";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
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
  if (!req.body.email|| !req.body.password || !req.body.username) return res.status(406).json({ error: "Please fill out all fields" });
  const uploadedImage = await imageUpload(req.file, "user_avatars");
  const encryptedPassword = await encryptPassword(req.body.password);
  const newUser = new User({
    ...req.body,
    password: encryptedPassword,
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

const updateUserAndPet = async(req, res) => {
  const session = await conn.startSession();
  session.startTransaction();
  try {
    const newAvatar = await imageUpload(req.file, "user_avatars");
    const userToUpdate = await User.findByIdAndUpdate(req.params.userID, { ...req.body, avatar: newAvatar }, { new: true });
    if (!userToUpdate) return res.status(404).json({ error: "No user found" });
    const usersPets = await Pet.find({ "owner_info._id": req.params.userID })
    // if (newAvatar) {
    for (let i = 0; i < usersPets.length; i++) {
      if (newAvatar) usersPets[i].owner_info = { ...usersPets[i].owner_info, ...req.body, avatar: newAvatar };
      else usersPets[i].owner_info = { ...usersPets[i].owner_info, ...req.body };
      await usersPets[i].save({ session });
    }
    await session.commitTransaction();
    res.status(200).json("Did the thing..")
  } catch (e){
    console.log(e);
    await session.abortTransaction();
    res.status(500).json({ error: "Something went wrong..." })
  } finally {
    session.endSession();
  }
}

const logIn = async(req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const verified = await verifyPassword(req.body.password, existingUser.password);
      if (verified) {
        res.status(200).json({ 
          verified: true,
          user: {
            email: existingUser.email,
            avatar: existingUser.avatar,
            username: existingUser.username
          }
        })
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

export { getUserById, updateUser, updateUserAndPet, test, getAllUsers, getUserByEmail, registerUser, logIn }