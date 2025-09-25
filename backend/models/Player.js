import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Men_Singles', 'Women_Singles', 'Men_Doubles', 'Women_Doubles', 'Mixed_Doubles'],
    required: true 
  },
  // Tennis-specific statistics
  matches_played: { type: Number, default: 0 },
  matches_won: { type: Number, default: 0 },
  matches_lost: { type: Number, default: 0 },
  sets_won: { type: Number, default: 0 },
  sets_lost: { type: Number, default: 0 },
  games_won: { type: Number, default: 0 },
  games_lost: { type: Number, default: 0 },
  
  // Tournament performance
  titles_won: { type: Number, default: 0 },
  finals_reached: { type: Number, default: 0 },
  semifinals_reached: { type: Number, default: 0 },
  quarterfinals_reached: { type: Number, default: 0 },
  
  // Playing statistics
  aces: { type: Number, default: 0 },
  double_faults: { type: Number, default: 0 },
  winners: { type: Number, default: 0 },
  unforced_errors: { type: Number, default: 0 },
  break_points_won: { type: Number, default: 0 },
  break_points_saved: { type: Number, default: 0 },
  
  // Player information
  age: String,
  height: String,
  weight: String,
  plays: { 
    type: String, 
    enum: ['Right-handed', 'Left-handed'],
    default: 'Right-handed'
  },
  backhand: {
    type: String,
    enum: ['One-handed', 'Two-handed'],
    default: 'Two-handed'
  },
  coach: String,
  turned_pro: String,
  description: String,
  photoUrl: String,
  player_id: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

// Add virtual fields for calculations
PlayerSchema.virtual('win_percentage').get(function() {
  return this.matches_played > 0 ? ((this.matches_won / this.matches_played) * 100).toFixed(2) : 0;
});

PlayerSchema.virtual('sets_win_percentage').get(function() {
  const totalSets = this.sets_won + this.sets_lost;
  return totalSets > 0 ? ((this.sets_won / totalSets) * 100).toFixed(2) : 0;
});

PlayerSchema.virtual('games_win_percentage').get(function() {
  const totalGames = this.games_won + this.games_lost;
  return totalGames > 0 ? ((this.games_won / totalGames) * 100).toFixed(2) : 0;
});

PlayerSchema.virtual('break_points_conversion').get(function() {
  const totalBreakPoints = this.break_points_won + this.break_points_saved;
  return totalBreakPoints > 0 ? ((this.break_points_won / totalBreakPoints) * 100).toFixed(2) : 0;
});

PlayerSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Player', PlayerSchema);
