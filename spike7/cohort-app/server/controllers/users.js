import conn from "../models/connection.js";
import { Pet } from "../models/pets.js";
import { User } from "../models/users.js";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { generateToken } from "../utils/jwt.js";

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

const getUserById = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch(e) {
    console.log(e);
    res.status(500).send({ error: e.message });
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
      // res.status(404).json({ error: "No user found" })
      throw { error: "No user was found :(" }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
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
  const changes = { ...req.body };
  if (req.file) {
    const uploadedImage = await imageUpload(req.file, "user_avatars");
    changes.avatar = uploadedImage;
  }
  if (req.password) {
    const encryptedPassword = await encryptPassword(req.body.password);
    changes.password = encryptedPassword;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, changes, { new: true });
    res.status(200).json(updatedUser);
  } catch(e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
}

const logIn = async(req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const verified = await verifyPassword(req.body.password, existingUser.password);
      if (verified) {
        const token = generateToken(existingUser);
        res.status(200).json({ 
          verified: true,
          token: token,
          user: {
            _id: existingUser._id,
            email: existingUser.email,
            avatar: existingUser.avatar,
            username: existingUser.username,
            pets: existingUser.pets
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
    res.status(500).send({ error: e.message });
  }
}

const getProfile = async(req, res) => {
  const activeUser = {
    _id: req.user._id,
    email: req.user.email,
    username: req.user.username,
    avatar: req.user.avatar,
    pets: req.user.pets
  }
  res.send(activeUser);
}

const tradePets = async(req, res) => {
  const { reqUserId, offerUserId, reqPetId, offerPetId } = req.body;
  if (!reqUserId || !offerUserId || !reqPetId || !offerPetId) return res.status(500).json({ error: "One or more required property is missing" });
  try {
    const reqPet = await Pet.findById(reqPetId);
    const offerPet = await Pet.findById(offerPetId);
    const reqPetValid = reqPet.owner.equals(reqUserId);
    const offerPetValid = offerPet.owner.equals(offerUserId);
    if (!offerPetValid || !reqPetValid) return res.status(500).json({ error: "Conflict in trade" });
    const session = await conn.startSession();
    try {
      session.startTransaction();
      await User.findByIdAndUpdate(reqUserId, {
        $push: { pets: offerPetId },
      }, { session: session });
      console.log("1");
      await User.findByIdAndUpdate(reqUserId, {
        $pull: { pets: reqPetId }
      }, { session: session });
      console.log("2");
      await User.findByIdAndUpdate(offerUserId, {
        $push: { pets: reqPetId },
      }, { session: session });
      console.log("3");
      await User.findByIdAndUpdat(offerUserId, {
        $pull: { pets: offerPetId }
      }, { session: session });
      console.log("4");
      await Pet.findByIdAndUpdate(reqPetId, {
        owner: offerUserId
      }, { session: session });
      console.log("5");
      await Pet.findByIdAndUpdate(offerPetId, {
        owner: reqUserId
      }, { session: session });
      console.log("6");
      await session.commitTransaction();
      res.status(200).json("Success!")
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      res.status(500).json({ error: "Trade failed" })
    } finally {
      session.endSession();
      console.log("session ended")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Trade failed" })
  }
}

export { test, getAllUsers, getUserByEmail, getUserById, registerUser, updateUser, logIn, getProfile, tradePets }