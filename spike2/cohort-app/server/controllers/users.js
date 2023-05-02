import { User } from "../models/users.js";

const test = (req, res) => {
  res.status(200).json('route connection established')
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e })
  }
}

const searchSingleUser = async (req, res) => {
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

export { test, getAllUsers, searchSingleUser }