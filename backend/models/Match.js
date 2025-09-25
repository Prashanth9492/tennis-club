import mongoose from 'mongoose';

// Tennis Point Schema for tracking individual points
const PointSchema = new mongoose.Schema({
  pointNumber: { type: Number, required: true },
  server: { type: String, required: true }, // Player name
  receiver: { type: String, required: true }, // Player name
  winner: { type: String, required: true }, // Who won the point
  pointType: { 
    type: String, 
    enum: ['ace', 'winner', 'forced_error', 'unforced_error', 'double_fault', 'net', 'out'],
    required: true
  },
  shotType: { 
    type: String, 
    enum: ['serve', 'forehand', 'backhand', 'volley', 'smash', 'lob', 'drop_shot'],
    required: false
  },
  courtPosition: { 
    type: String, 
    enum: ['deuce', 'ad'], // Which side of the court
    required: false
  },
  timestamp: { type: Date, default: Date.now }
});

// Tennis Game Schema
const GameSchema = new mongoose.Schema({
  gameNumber: { type: Number, required: true },
  server: { type: String, required: true },
  score: {
    player1: { type: String, default: '0' }, // 0, 15, 30, 40, A (advantage)
    player2: { type: String, default: '0' }
  },
  winner: { type: String }, // Who won the game
  points: [PointSchema],
  isCompleted: { type: Boolean, default: false }
});

// Tennis Set Schema
const SetSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  score: {
    player1: { type: Number, default: 0 }, // Games won
    player2: { type: Number, default: 0 }
  },
  tiebreak: {
    isPlayed: { type: Boolean, default: false },
    score: {
      player1: { type: Number, default: 0 },
      player2: { type: Number, default: 0 }
    }
  },
  winner: { type: String }, // Who won the set
  games: [GameSchema],
  isCompleted: { type: Boolean, default: false }
});

// Player Statistics for the match
const PlayerStatsSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  aces: { type: Number, default: 0 },
  doubleFaults: { type: Number, default: 0 },
  firstServePercentage: { type: Number, default: 0 },
  winners: { type: Number, default: 0 },
  unforcedErrors: { type: Number, default: 0 },
  breakPointsWon: { type: Number, default: 0 },
  breakPointsOffered: { type: Number, default: 0 },
  totalPointsWon: { type: Number, default: 0 }
});

const MatchSchema = new mongoose.Schema({
  matchId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  
  // Tennis fields
  player1: { type: String }, // Tennis player 1
  player2: { type: String }, // Tennis player 2
  player1Partner: { type: String }, // For doubles
  player2Partner: { type: String }, // For doubles
  court: { type: String }, // Tennis court
  
  // Cricket fields (backwards compatibility)
  team1: { type: String }, // Cricket team 1
  team2: { type: String }, // Cricket team 2
  
  // Common fields
  venue: { type: String, required: true },
  matchDate: { type: Date, required: true },
  matchType: { 
    type: String, 
    enum: ['Singles', 'Doubles', 'Mixed_Doubles', 'T20', 'ODI', 'Test'], 
    default: 'Singles' 
  },
  format: {
    bestOf: { type: Number, enum: [3, 5], default: 3 }, // Tennis: Best of 3 or 5 sets
    tiebreakAt: { type: Number, default: 6 }, // Tennis: Tiebreak at 6-6
    finalSetTiebreak: { type: Boolean, default: true }, // Tennis: Super tiebreak in final set
    overs: { type: Number }, // Cricket: Total overs
    innings: { type: Number, default: 2 } // Cricket: Number of innings
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'live', 'completed', 'retired', 'walkover', 'upcoming'], 
    default: 'scheduled' 
  },
  
  // Tennis specific fields
  currentSet: { type: Number, default: 1 },
  currentGame: { type: Number, default: 1 },
  currentServer: { type: String }, // Who is serving
  sets: [SetSchema],
  playerStats: [PlayerStatsSchema],
  result: {
    winner: { type: String }, // Player/Team name
    winBy: { type: String }, // "3-1", "3-0", "retirement", "walkover"
    finalScore: { type: String }, // "6-4, 6-2, 6-3"
    matchDuration: { type: String } // "2h 34m"
  },
  commentary: [{
    point: { type: String }, // "1-1, 30-15", etc.
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  isLive: { type: Boolean, default: false },
  
  // Cricket specific fields (backwards compatibility)
  cricketInnings: [{
    inningsNumber: { type: Number },
    battingTeam: { type: String },
    bowlingTeam: { type: String },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: [{
      overNumber: { type: Number, required: true },
      bowler: { type: String, required: true },
      balls: [{
        ballNumber: { type: Number, required: true },
        striker: { type: String, required: true },
        nonStriker: { type: String, required: true },
        bowler: { type: String, required: true },
        runs: { type: Number, default: 0 },
        isWicket: { type: Boolean, default: false },
        wicketType: { 
          type: String, 
          enum: ['caught', 'bowled', 'lbw', 'stumped', 'run_out', 'hit_wicket', 'caught_and_bowled']
        },
        fielder: { type: String },
        extras: {
          isWide: { type: Boolean, default: false },
          isNoBall: { type: Boolean, default: false },
          isBye: { type: Boolean, default: false },
          isLegBye: { type: Boolean, default: false }
        },
        timestamp: { type: Date, default: Date.now }
      }]
    }],
    currentOver: { type: Number, default: 0 },
    currentBall: { type: Number, default: 0 },
    extras: {
      wides: { type: Number, default: 0 },
      noBalls: { type: Number, default: 0 },
      byes: { type: Number, default: 0 },
      legByes: { type: Number, default: 0 }
    },
    isCompleted: { type: Boolean, default: false }
  }],
  tossWinner: { type: String },
  tossDecision: { type: String, enum: ['bat', 'bowl'] }
}, {
  timestamps: true
});

// Virtual fields for easy access
MatchSchema.virtual('currentScore').get(function() {
  if (this.sets && this.sets.length > 0) {
    const currentSet = this.sets[this.currentSet - 1];
    if (currentSet && currentSet.games.length > 0) {
      const currentGame = currentSet.games[currentSet.games.length - 1];
      return {
        set: this.currentSet,
        game: currentSet.games.length,
        score: currentGame.score
      };
    }
  }
  return { set: 1, game: 1, score: { player1: '0', player2: '0' } };
});

MatchSchema.virtual('setsScore').get(function() {
  if (this.sets && this.sets.length > 0) {
    return this.sets.map(set => ({
      player1: set.score.player1,
      player2: set.score.player2,
      tiebreak: set.tiebreak.isPlayed ? set.tiebreak.score : null
    }));
  }
  return [];
});

MatchSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Match', MatchSchema);
