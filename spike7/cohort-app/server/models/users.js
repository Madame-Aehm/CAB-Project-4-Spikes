import mongoose from 'mongoose';

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, default: 'https://res.cloudinary.com/dpqiaisdz/image/upload/v1680605282/user_avatars/no-image-placeholder_z8wwzr.png' },
  pets: { type: objectId, ref: "pets" }
});

export const User = mongoose.model("user", userSchema);