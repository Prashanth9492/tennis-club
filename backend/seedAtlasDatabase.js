import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import your models
import Player from './models/Player.js';
import Match from './models/Match.js';
import Team from './models/Team.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const sampleTennisData = {
  teams: [
    { name: 'AGNI-A', houseName: 'AGNI', division: 'A', captain: 'Rajesh Kumar', totalPlayers: 8 },
    { name: 'AGNI-B', houseName: 'AGNI', division: 'B', captain: 'Suresh Patel', totalPlayers: 8 },
    { name: 'VAYU-A', houseName: 'VAYU', division: 'A', captain: 'Vikram Singh', totalPlayers: 8 },
    { name: 'VAYU-B', houseName: 'VAYU', division: 'B', captain: 'Arjun Reddy', totalPlayers: 8 },
    { name: 'JAL-A', houseName: 'JAL', division: 'A', captain: 'Kiran Kumar', totalPlayers: 8 },
    { name: 'JAL-B', houseName: 'JAL', division: 'B', captain: 'Deepak Shah', totalPlayers: 8 },
    { name: 'PRUDHVI-A', houseName: 'PRUDHVI', division: 'A', captain: 'Manoj Gupta', totalPlayers: 8 },
    { name: 'PRUDHVI-B', houseName: 'PRUDHVI', division: 'B', captain: 'Rohit Sharma', totalPlayers: 8 },
    { name: 'AAKASH-A', houseName: 'AAKASH', division: 'A', captain: 'Anil Krishna', totalPlayers: 8 },
    { name: 'AAKASH-B', houseName: 'AAKASH', division: 'B', captain: 'Sanjay Nair', totalPlayers: 8 }
  ],
  
  players: [
    // AGNI Team Players
    { name: 'Rajesh Kumar', team: 'AGNI-A', pinno: 'AG001', matches_played: 12, matches_won: 9, matches_lost: 3, sets_won: 18, sets_lost: 9, games_won: 108, games_lost: 65, win_percentage: 75.0, current_ranking: 1, playingStyle: 'Aggressive Baseline', dominantHand: 'Right' },
    { name: 'Amit Sharma', team: 'AGNI-A', pinno: 'AG002', matches_played: 10, matches_won: 7, matches_lost: 3, sets_won: 15, sets_lost: 8, games_won: 92, games_lost: 58, win_percentage: 70.0, current_ranking: 3, playingStyle: 'All Court', dominantHand: 'Right' },
    { name: 'Priya Nair', team: 'AGNI-A', pinno: 'AG003', matches_played: 11, matches_won: 8, matches_lost: 3, sets_won: 16, sets_lost: 7, games_won: 98, games_lost: 52, win_percentage: 72.7, current_ranking: 2, playingStyle: 'Serve & Volley', dominantHand: 'Left' },
    { name: 'Suresh Patel', team: 'AGNI-B', pinno: 'AG004', matches_played: 9, matches_won: 6, matches_lost: 3, sets_won: 13, sets_lost: 8, games_won: 82, games_lost: 61, win_percentage: 66.7, current_ranking: 5, playingStyle: 'Defensive', dominantHand: 'Right' },
    
    // VAYU Team Players
    { name: 'Vikram Singh', team: 'VAYU-A', pinno: 'VY001', matches_played: 11, matches_won: 8, matches_lost: 3, sets_won: 17, sets_lost: 7, games_won: 101, games_lost: 48, win_percentage: 72.7, current_ranking: 4, playingStyle: 'Power Baseline', dominantHand: 'Right' },
    { name: 'Neha Gupta', team: 'VAYU-A', pinno: 'VY002', matches_played: 10, matches_won: 6, matches_lost: 4, sets_won: 13, sets_lost: 10, games_won: 85, games_lost: 72, win_percentage: 60.0, current_ranking: 7, playingStyle: 'Counter Puncher', dominantHand: 'Left' },
    { name: 'Arjun Reddy', team: 'VAYU-B', pinno: 'VY003', matches_played: 8, matches_won: 5, matches_lost: 3, sets_won: 11, sets_lost: 8, games_won: 74, games_lost: 59, win_percentage: 62.5, current_ranking: 8, playingStyle: 'All Court', dominantHand: 'Right' },
    { name: 'Kavya Iyer', team: 'VAYU-B', pinno: 'VY004', matches_played: 9, matches_won: 5, matches_lost: 4, sets_won: 12, sets_lost: 9, games_won: 78, games_lost: 68, win_percentage: 55.6, current_ranking: 10, playingStyle: 'Baseline', dominantHand: 'Right' },
    
    // JAL Team Players
    { name: 'Kiran Kumar', team: 'JAL-A', pinno: 'JL001', matches_played: 10, matches_won: 7, matches_lost: 3, sets_won: 15, sets_lost: 7, games_won: 94, games_lost: 51, win_percentage: 70.0, current_ranking: 6, playingStyle: 'Serve & Volley', dominantHand: 'Right' },
    { name: 'Deepak Shah', team: 'JAL-B', pinno: 'JL002', matches_played: 9, matches_won: 5, matches_lost: 4, sets_won: 11, sets_lost: 10, games_won: 76, games_lost: 73, win_percentage: 55.6, current_ranking: 9, playingStyle: 'Defensive', dominantHand: 'Left' },
    
    // PRUDHVI Team Players
    { name: 'Manoj Gupta', team: 'PRUDHVI-A', pinno: 'PR001', matches_played: 8, matches_won: 4, matches_lost: 4, sets_won: 9, sets_lost: 10, games_won: 65, games_lost: 72, win_percentage: 50.0, current_ranking: 12, playingStyle: 'All Court', dominantHand: 'Right' },
    { name: 'Rohit Sharma', team: 'PRUDHVI-B', pinno: 'PR002', matches_played: 7, matches_won: 3, matches_lost: 4, sets_won: 8, sets_lost: 9, games_won: 58, games_lost: 64, win_percentage: 42.9, current_ranking: 14, playingStyle: 'Aggressive', dominantHand: 'Right' },
    
    // AAKASH Team Players  
    { name: 'Anil Krishna', team: 'AAKASH-A', pinno: 'AK001', matches_played: 9, matches_won: 5, matches_lost: 4, sets_won: 12, sets_lost: 9, games_won: 79, games_lost: 66, win_percentage: 55.6, current_ranking: 11, playingStyle: 'Baseline', dominantHand: 'Left' },
    { name: 'Sanjay Nair', team: 'AAKASH-B', pinno: 'AK002', matches_played: 8, matches_won: 4, matches_lost: 4, sets_won: 10, sets_lost: 8, games_won: 68, games_lost: 62, win_percentage: 50.0, current_ranking: 13, playingStyle: 'Counter Puncher', dominantHand: 'Right' }
  ],
  
  matches: [
    {
      matchId: 'TM001',
      title: 'Rajesh Kumar vs Priya Nair',
      player1: 'Rajesh Kumar',
      player2: 'Priya Nair',
      team1: 'AGNI-A',
      team2: 'AGNI-A',
      court: 'Court 1',
      venue: 'Main Tennis Complex',
      matchDate: new Date('2024-01-15'),
      matchType: 'Singles',
      status: 'completed',
      result: {
        winner: 'Rajesh Kumar',
        finalScore: '6-4, 7-5',
        winBy: '2-0',
        matchDuration: '1h 45m'
      }
    },
    {
      matchId: 'TM002',
      title: 'Vikram Singh vs Kiran Kumar',
      player1: 'Vikram Singh',
      player2: 'Kiran Kumar',
      team1: 'VAYU-A',
      team2: 'JAL-A',
      court: 'Court 2',
      venue: 'Main Tennis Complex',
      matchDate: new Date('2024-01-16'),
      matchType: 'Singles',
      status: 'completed',
      result: {
        winner: 'Vikram Singh',
        finalScore: '6-3, 4-6, 6-2',
        winBy: '2-1',
        matchDuration: '2h 20m'
      }
    },
    {
      matchId: 'TM003',
      title: 'Amit Sharma & Neha Gupta vs Arjun Reddy & Kavya Iyer',
      player1: 'Amit Sharma',
      player2: 'Arjun Reddy',
      player1Partner: 'Neha Gupta',
      player2Partner: 'Kavya Iyer',
      team1: 'Mixed',
      team2: 'VAYU-B',
      court: 'Court 3',
      venue: 'Main Tennis Complex',
      matchDate: new Date('2024-01-17'),
      matchType: 'Doubles',
      status: 'completed',
      result: {
        winner: 'Amit Sharma',
        finalScore: '6-2, 6-4',
        winBy: '2-0',
        matchDuration: '1h 30m'
      }
    }
  ]
};

const seedAtlasDatabase = async () => {
  try {
    console.log('🌱 Seeding MongoDB Atlas with tennis data...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Team.deleteMany({});
    await Player.deleteMany({});
    await Match.deleteMany({});
    
    // Insert teams
    console.log('🏆 Inserting teams...');
    await Team.insertMany(sampleTennisData.teams);
    console.log(`✅ Inserted ${sampleTennisData.teams.length} teams`);
    
    // Insert players
    console.log('👥 Inserting players...');
    await Player.insertMany(sampleTennisData.players);
    console.log(`✅ Inserted ${sampleTennisData.players.length} players`);
    
    // Insert matches
    console.log('🎾 Inserting matches...');
    await Match.insertMany(sampleTennisData.matches);
    console.log(`✅ Inserted ${sampleTennisData.matches.length} matches`);
    
    console.log('🎉 Atlas database seeded successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Teams: ${sampleTennisData.teams.length}`);
    console.log(`   Players: ${sampleTennisData.players.length}`);
    console.log(`   Matches: ${sampleTennisData.matches.length}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    
    if (error.message.includes('Could not connect to any servers')) {
      console.log('');
      console.log('🔧 Atlas connection failed. Please:');
      console.log('   1. Whitelist your IP address in MongoDB Atlas');
      console.log('   2. Verify your credentials in .env file');
      console.log('   3. Check your internet connection');
    }
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

// Run seeding
seedAtlasDatabase();