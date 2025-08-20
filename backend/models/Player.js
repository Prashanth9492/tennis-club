import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: String,
  house: {
    type: String,
    enum: ['agni', 'aakash', 'vayu', 'jal', 'prudhvi'],
    required: false
  },
  position: String,
  team: String,
  battingStyle: String,
  bowlingStyle: String,
  description: String,
  photoUrl: String,
  pinno: { type: String, required: true, unique: true }
});

export default mongoose.model('Player', PlayerSchema);
