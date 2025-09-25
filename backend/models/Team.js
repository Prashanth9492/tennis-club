import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Men_Singles', 'Women_Singles', 'Men_Doubles', 'Women_Doubles', 'Mixed_Doubles'],
    required: true 
  },
  organizer: String,
  venue: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  format: {
    type: String,
    enum: ['Single_Elimination', 'Double_Elimination', 'Round_Robin', 'Swiss_System'],
    default: 'Single_Elimination'
  },
  surface: {
    type: String,
    enum: ['Hard', 'Clay', 'Grass', 'Indoor_Hard', 'Carpet'],
    default: 'Hard'
  },
  prize_money: String,
  max_participants: { type: Number, default: 32 },
  current_participants: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['upcoming', 'registration_open', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  description: String,
  logoUrl: String,
  rules: String
}, {
  timestamps: true
});

export default mongoose.model('Tournament', TournamentSchema);
