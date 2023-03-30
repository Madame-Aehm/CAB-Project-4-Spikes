import mongoose from 'mongoose';

const scoutSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  titan: { type: Boolean, required: true },
  gender: { type: String, required: true }
});

export const Scout = mongoose.model("scout", scoutSchema);