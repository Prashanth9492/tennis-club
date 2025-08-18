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

async function addTestMatch() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Add a test match with team names that match our static teams
    const testMatch = new Match({
      team1: "AGNI",
      team2: "AAKASH", 
      date: new Date('2024-01-20'),
      time: "14:00",
      venue: "Fire Stadium",
      type: "League",
      status: "upcoming"
    });

    await testMatch.save();
    console.log('Test match added:', testMatch);

    // Add another test match
    const testMatch2 = new Match({
      team1: "VAYU",
      team2: "JAL", 
      date: new Date('2024-01-15'),
      time: "16:00",
      venue: "Wind Park",
      type: "League",
      status: "completed"
    });

    await testMatch2.save();
    console.log('Test match 2 added:', testMatch2);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

addTestMatch();
