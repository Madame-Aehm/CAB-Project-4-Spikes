import mongoose from 'mongoose';

const objectId = mongoose.Schema.Types.ObjectId;

const petSchema = new mongoose.Schema({
  animal: { type: String, required: true },
  name: { type: String, required: true },
  desexed: { type: Boolean, required: true },
  age: { type: Number, required: true },
  owner: { type: objectId, ref: 'scout', required: true },
  owner_info: {
    _id: { type: objectId, ref: "user", required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true }
  }
});

export const Pet = mongoose.model("pet", petSchema);