import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet", required: true }]
}, { timestamps: true });

export const User = mongoose.model("user", userSchema);