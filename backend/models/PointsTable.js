import mongoose from 'mongoose';

const PointsTableSchema = new mongoose.Schema({
  team: { type: String, required: true },
  matches: { type: Number, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  draws: { type: Number, default: 0 },
  points: { type: Number, required: true },
  season: { type: String, required: true }, // e.g., '2025', '2024'
}, { timestamps: true });

const PointsTable = mongoose.model('PointsTable', PointsTableSchema);
export default PointsTable;
