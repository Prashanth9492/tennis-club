import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Match from './models/Match.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://prashanth:prashanth@cluster0.mfzzd.mongodb.net/collegetennis?retryWrites=true&w=majority';

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
    playerStats: [],
    isLive: false
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
    currentSet: 2,
    currentGame: 4,
    sets: [
      {
        setNumber: 1,
        score: { player1: 6, player2: 4 },
        winner: 'Priya Patel',
        isCompleted: true,
        games: []
      },
      {
        setNumber: 2,
        score: { player1: 3, player2: 2 },
        isCompleted: false,
        games: []
      }
    ],
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
    ],
    isLive: true
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
        score: { player1: 6, player2: 4 },
        winner: 'Karan & Arjun',
        isCompleted: true,
        games: []
      },
      {
        setNumber: 2,
        score: { player1: 3, player2: 6 },
        winner: 'Dev & Rohit',
        isCompleted: true,
        games: []
      },
      {
        setNumber: 3,
        score: { player1: 6, player2: 2 },
        winner: 'Karan & Arjun',
        isCompleted: true,
        games: []
      }
    ],
    result: {
      winner: 'Karan & Arjun',
      winBy: '2-1',
      finalScore: '6-4, 3-6, 6-2',
      matchDuration: '2h 15m'
    },
    playerStats: [],
    isLive: false
  },
  {
    matchId: 'TM004',
    title: 'Maya & Alex vs Ravi & Sita',
    player1: 'Maya',
    player2: 'Ravi',
    player1Partner: 'Alex',
    player2Partner: 'Sita',
    court: 'Court 3',
    venue: 'Waterfront Tennis Club',
    matchDate: new Date('2025-01-17T14:30:00Z'),
    matchType: 'Mixed_Doubles',
    status: 'upcoming',
    format: {
      bestOf: 3,
      tiebreakAt: 6,
      finalSetTiebreak: true
    },
    sets: [],
    playerStats: [],
    isLive: false
  },
  {
    matchId: 'TM005',
    title: 'Vikram Singh vs Rahul Verma',
    player1: 'Vikram Singh',
    player2: 'Rahul Verma',
    court: 'Court 4',
    venue: 'Earth Tennis Center',
    matchDate: new Date('2025-01-18T10:00:00Z'),
    matchType: 'Singles',
    status: 'scheduled',
    format: {
      bestOf: 5,
      tiebreakAt: 6,
      finalSetTiebreak: true
    },
    sets: [],
    playerStats: [],
    isLive: false
  }
];

const seedTennisMatches = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing tennis matches
    console.log('Clearing existing tennis matches...');
    await Match.deleteMany({ matchType: { $in: ['Singles', 'Doubles', 'Mixed_Doubles'] } });

    // Insert new tennis matches
    console.log('Inserting tennis matches...');
    const insertedMatches = await Match.insertMany(tennisMatches);
    console.log(`Successfully inserted ${insertedMatches.length} tennis matches`);

    // Display inserted matches
    insertedMatches.forEach(match => {
      console.log(`- ${match.title} (${match.status}) - ${match.venue}`);
    });

    console.log('Tennis matches seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding tennis matches:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeder
seedTennisMatches();