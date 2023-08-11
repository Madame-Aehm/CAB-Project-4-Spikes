import mongoose from 'mongoose';

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, default: 'https://res.cloudinary.com/dpqiaisdz/image/upload/v1691743914/placeholder_hhfbex.png' },
  pets: [{ type: objectId, ref: "pet" }]
});

export const User = mongoose.model("user", userSchema);