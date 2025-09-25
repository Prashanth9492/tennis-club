import mongoose from 'mongoose';

const LiveMatchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true },
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  player1Partner: { type: String }, // For doubles
  player2Partner: { type: String }, // For doubles
  
  // Current match status
  status: { 
    type: String, 
    enum: ['warmup', 'in_progress', 'rain_delay', 'medical_timeout', 'changeover', 'set_break', 'completed'],
    default: 'warmup'
  },
  
  // Current score
  current_set: { type: Number, default: 1 },
  current_game: { type: Number, default: 1 },
  current_server: { type: String },
  
  // Set scores
  sets: [{
    set_number: { type: Number },
    player1_games: { type: Number, default: 0 },
    player2_games: { type: Number, default: 0 },
    tiebreak: {
      is_tiebreak: { type: Boolean, default: false },
      player1_points: { type: Number, default: 0 },
      player2_points: { type: Number, default: 0 }
    },
    is_completed: { type: Boolean, default: false }
  }],
  
  // Current game score
  current_game_score: {
    player1: { type: String, default: '0' }, // 0, 15, 30, 40, A
    player2: { type: String, default: '0' }
  },
  
  // Match statistics (live)
  live_stats: {
    player1: {
      aces: { type: Number, default: 0 },
      double_faults: { type: Number, default: 0 },
      first_serve_percentage: { type: Number, default: 0 },
      winners: { type: Number, default: 0 },
      unforced_errors: { type: Number, default: 0 }
    },
    player2: {
      aces: { type: Number, default: 0 },
      double_faults: { type: Number, default: 0 },
      first_serve_percentage: { type: Number, default: 0 },
      winners: { type: Number, default: 0 },
      unforced_errors: { type: Number, default: 0 }
    }
  },
  
  // Match info
  court: { type: String },
  tournament: { type: String },
  round: { type: String }, // "First Round", "Quarterfinal", etc.
  match_format: {
    best_of: { type: Number, default: 3 },
    tiebreak_sets: { type: Boolean, default: true }
  },
  
  // Timing
  start_time: { type: Date },
  last_point_time: { type: Date },
  match_duration: { type: String }, // "1h 23m"
  
  // Live updates
  last_point: {
    winner: { type: String },
    type: { type: String },
    description: { type: String }
  },
  
  viewers: { type: Number, default: 0 },
  is_featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Virtual for current set score display
LiveMatchSchema.virtual('current_set_score').get(function() {
  if (this.sets && this.sets.length > 0) {
    const currentSet = this.sets[this.current_set - 1];
    if (currentSet) {
      return `${currentSet.player1_games}-${currentSet.player2_games}`;
    }
  }
  return '0-0';
});

LiveMatchSchema.set('toJSON', { virtuals: true });

export default mongoose.model('LiveMatch', LiveMatchSchema);