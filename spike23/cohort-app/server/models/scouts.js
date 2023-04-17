import mongoose from 'mongoose';

const objectId = mongoose.Schema.Types.ObjectId;

const scoutSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, unique: true },
  titan: { type: Boolean, required: true },
  gender: { type: String, required: true },
  pets: [{ type: objectId, ref: 'pet', required: true }]
});

export const Scout = mongoose.model("scout", scoutSchema);