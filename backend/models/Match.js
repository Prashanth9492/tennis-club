import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  date: String,
  venue: String,
  type: String,
  status: String
});

export default mongoose.model('Match', MatchSchema);
