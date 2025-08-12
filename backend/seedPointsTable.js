
import mongoose from 'mongoose';
import PointsTable from './models/PointsTable.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const MONGODB_URI = process.env.MONGODB_URI;

const sampleData = [
  { team: 'Team A', matches: 5, wins: 4, losses: 1, draws: 0, points: 8, season: '2025' },
  { team: 'Team B', matches: 5, wins: 3, losses: 2, draws: 0, points: 6, season: '2025' },
  { team: 'Team C', matches: 5, wins: 2, losses: 3, draws: 0, points: 4, season: '2025' },
  { team: 'Team D', matches: 5, wins: 1, losses: 4, draws: 0, points: 2, season: '2025' },
  { team: 'Team A', matches: 5, wins: 3, losses: 2, draws: 0, points: 6, season: '2024' },
  { team: 'Team B', matches: 5, wins: 4, losses: 1, draws: 0, points: 8, season: '2024' },
  { team: 'Team C', matches: 5, wins: 1, losses: 4, draws: 0, points: 2, season: '2024' },
  { team: 'Team D', matches: 5, wins: 2, losses: 3, draws: 0, points: 4, season: '2024' },
];

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await PointsTable.deleteMany({});
  await PointsTable.insertMany(sampleData);
  console.log('Sample points table data seeded!');
  await mongoose.disconnect();
}

seed();
