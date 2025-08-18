import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Match Schema
const matchSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true, default: 'upcoming' }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

async function updateTestMatches() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing matches
    await Match.deleteMany({});
    console.log('Cleared existing matches');

    // Add current test matches with proper dates
    const matches = [
      {
        team1: "AGNI",
        team2: "AAKASH", 
        date: new Date('2025-08-20'),
        time: "14:00",
        venue: "Fire Stadium",
        type: "League",
        status: "upcoming"
      },
      {
        team1: "VAYU",
        team2: "JAL", 
        date: new Date('2025-08-15'),
        time: "16:00",
        venue: "Wind Park",
        type: "League",
        status: "completed"
      },
      {
        team1: "PRUDHVI",
        team2: "AGNI", 
        date: new Date('2025-08-25'),
        time: "18:00",
        venue: "Earth Oval",
        type: "T20",
        status: "upcoming"
      }
    ];

    for (const matchData of matches) {
      const match = new Match(matchData);
      await match.save();
      console.log('Added match:', match.team1, 'vs', match.team2);
    }

    mongoose.connection.close();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateTestMatches();
