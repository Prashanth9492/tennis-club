import mongoose from 'mongoose';

const PointByPointSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  setNumber: { type: Number, required: true },
  gameNumber: { type: Number, required: true },
  pointNumber: { type: Number, required: true },
  server: { type: String, required: true },
  receiver: { type: String, required: true },
  serve_speed: { type: Number }, // in mph or km/h
  serve_type: {
    type: String,
    enum: ['first_serve', 'second_serve']
  },
  serve_placement: {
    type: String,
    enum: ['wide', 'body', 'T'] // serve placement
  },
  return_quality: {
    type: String,
    enum: ['excellent', 'good', 'poor', 'missed']
  },
  rally_length: { type: Number, default: 1 }, // Number of shots in the rally
  point_winner: { type: String, required: true },
  point_type: { 
    type: String, 
    enum: ['ace', 'service_winner', 'return_winner', 'winner', 'forced_error', 'unforced_error', 'double_fault'],
    required: true
  },
  shot_that_won: { 
    type: String, 
    enum: ['serve', 'forehand', 'backhand', 'volley', 'smash', 'lob', 'drop_shot', 'slice', 'topspin']
  },
  court_position: { 
    type: String, 
    enum: ['deuce_court', 'ad_court']
  },
  game_score_before: {
    server: { type: String }, // "0", "15", "30", "40", "A"
    receiver: { type: String }
  },
  game_score_after: {
    server: { type: String },
    receiver: { type: String }
  },
  set_score: {
    player1_games: { type: Number },
    player2_games: { type: Number }
  },
  is_break_point: { type: Boolean, default: false },
  is_set_point: { type: Boolean, default: false },
  is_match_point: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for efficient querying
PointByPointSchema.index({ matchId: 1, setNumber: 1, gameNumber: 1, pointNumber: 1 });

export default mongoose.model('PointByPoint', PointByPointSchema);