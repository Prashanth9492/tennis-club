import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coach: String,
  captain: String,
  homeGround: String,
  description: String,
  logoUrl: String
});

export default mongoose.model('Team', TeamSchema);
