import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Match from './models/Match.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const tennisMatches = [
  {
    matchId: 'TM001',
    title: 'Rajesh Kumar vs Amit Sharma',
    player1: 'Rajesh Kumar',
    player2: 'Amit Sharma',
    court: 'Court 1',
    venue: 'Central Tennis Court',
    matchDate: new Date('2025-01-15T09:00:00Z'),
    matchType: 'Singles',
    status: 'upcoming',
    format: {
      bestOf: 3,
      tiebreakAt: 6,
      finalSetTiebreak: true
    },
    sets: [],
    isLive: false,
    currentSet: 1,
    currentGame: 1,
    playerStats: []
  },
  {
    matchId: 'TM002',
    title: 'Priya Patel vs Sneha Reddy',
    player1: 'Priya Patel',
    player2: 'Sneha Reddy',
    court: 'Court 2',
    venue: 'Sky Tennis Academy',
    matchDate: new Date('2025-01-15T11:00:00Z'),
    matchType: 'Singles',
    status: 'live',
    format: {
      bestOf: 3,
      tiebreakAt: 6,
      finalSetTiebreak: true
    },
    sets: [
      {
        setNumber: 1,
        winner: 'Priya Patel',
        games: [],
        isCompleted: true
      },
      {
        setNumber: 2,
        games: [],
        isCompleted: false
      }
    ],
    setsScore: [
      { player1: 6, player2: 4 },
      { player1: 3, player2: 2 }
    ],
    isLive: true,
    currentSet: 2,
    currentGame: 4,
    playerStats: [
      {
        playerName: 'Priya Patel',
        aces: 5,
        doubleFaults: 2,
        winners: 12,
        unforcedErrors: 8
      },
      {
        playerName: 'Sneha Reddy',
        aces: 3,
        doubleFaults: 4,
        winners: 8,
        unforcedErrors: 12
      }
    ]
  },
  {
    matchId: 'TM003',
    title: 'Karan & Arjun vs Dev & Rohit',
    player1: 'Karan',
    player2: 'Dev',
    player1Partner: 'Arjun',
    player2Partner: 'Rohit',
    court: 'Center Court',
    venue: 'Wind Court Complex',
    matchDate: new Date('2025-01-16T16:00:00Z'),
    matchType: 'Doubles',
    status: 'completed',
    format: {
      bestOf: 3,
      tiebreakAt: 6,
      finalSetTiebreak: true
    },
    sets: [
      {
        setNumber: 1,
        winner: 'Karan & Arjun',
        games: [],
        isCompleted: true
      },
      {
        setNumber: 2,
        winner: 'Dev & Rohit',
        games: [],
        isCompleted: true
      },
      {
        setNumber: 3,
        winner: 'Karan & Arjun',
        games: [],
        isCompleted: true
      }
    ],
    setsScore: [
      { player1: 6, player2: 4 },
      { player1: 3, player2: 6 },
      { player1: 6, player2: 2 }
    ],
    result: {
      winner: 'Karan & Arjun',
      winBy: '2-1',
      finalScore: '6-4, 3-6, 6-2',
      matchDuration: '2h 15m'
    },
    isLive: false,
    currentSet: 1,
    currentGame: 1,
    playerStats: []
  }
];

async function seedTennisData() {
  try {
    // Try to connect to local MongoDB first
    await mongoose.connect('mongodb://localhost:27017/college_tennis');
    console.log('✅ Connected to local MongoDB');
    
    // Clear existing matches
    await Match.deleteMany({ matchType: { $in: ['Singles', 'Doubles', 'Mixed_Doubles'] } });
    console.log('🧹 Cleared existing tennis matches');
    
    // Insert new tennis matches
    const insertedMatches = await Match.insertMany(tennisMatches);
    console.log(`✅ Successfully inserted ${insertedMatches.length} tennis matches`);
    
    // Verify insertion
    const count = await Match.countDocuments({ matchType: { $in: ['Singles', 'Doubles', 'Mixed_Doubles'] } });
    console.log(`📊 Total tennis matches in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding tennis data:', error.message);
    console.log('💡 Make sure MongoDB is running locally or fix Atlas connection');
    process.exit(1);
  }
}

seedTennisData();