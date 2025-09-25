import mongoose from 'mongoose';

const RankingSchema = new mongoose.Schema({
  player: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Men_Singles', 'Women_Singles', 'Men_Doubles', 'Women_Doubles', 'Mixed_Doubles'],
    required: true 
  },
  current_ranking: { type: Number, required: true },
  previous_ranking: { type: Number },
  ranking_points: { type: Number, required: true },
  tournaments_played: { type: Number, default: 0 },
  best_result: { type: String }, // e.g., "Winner", "Finalist", "Semifinalist"
  season: { type: String, required: true }, // e.g., '2025', '2024'
  weeks_at_current_ranking: { type: Number, default: 1 },
  highest_ranking: { type: Number },
  highest_ranking_date: { type: Date }
}, { timestamps: true });

// Virtual field for ranking movement
RankingSchema.virtual('ranking_change').get(function() {
  if (this.previous_ranking && this.current_ranking) {
    return this.previous_ranking - this.current_ranking; // Positive means improvement
  }
  return 0;
});

RankingSchema.set('toJSON', { virtuals: true });

const Ranking = mongoose.model('Ranking', RankingSchema);
export default Ranking;
