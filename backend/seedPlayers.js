import mongoose from 'mongoose';
import Player from './models/Player.js';
import dotenv from 'dotenv';

dotenv.config();

const samplePlayers = [
  {
    name: "Chintu Kumar",
    team: "AAKASH",
    matches: 11,
    innings: 21,
    runs: 726,
    highest_score: 111,
    hundreds: 1,
    fifties: 4,
    fours: 49,
    sixes: 25,
    balls_faced: 491,
    outs: 10,
    age: "21",
    position: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    description: "Aggressive opening batsman",
    photoUrl: "/images/chintu.jpg",
    pinno: "AAKASH001"
  },
  {
    name: "Rajesh Singh",
    team: "AGNI",
    matches: 15,
    innings: 24,
    runs: 892,
    highest_score: 97,
    hundreds: 0,
    fifties: 6,
    fours: 68,
    sixes: 32,
    balls_faced: 612,
    outs: 14,
    age: "22",
    position: "All-rounder",
    battingStyle: "Left-handed",
    bowlingStyle: "Left-arm spin",
    description: "Versatile all-rounder",
    photoUrl: "/images/rajesh.jpg",
    pinno: "AGNI001"
  },
  {
    name: "Priya Sharma",
    team: "VAYU",
    matches: 8,
    innings: 12,
    runs: 345,
    highest_score: 78,
    hundreds: 0,
    fifties: 2,
    fours: 28,
    sixes: 8,
    balls_faced: 256,
    outs: 7,
    age: "20",
    position: "Wicket-keeper",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    description: "Reliable wicket-keeper batsman",
    photoUrl: "/images/priya.jpg",
    pinno: "VAYU001"
  },
  {
    name: "Arjun Patel",
    team: "JAL",
    matches: 13,
    innings: 18,
    runs: 567,
    highest_score: 85,
    hundreds: 0,
    fifties: 3,
    fours: 42,
    sixes: 18,
    balls_faced: 398,
    outs: 12,
    age: "21",
    position: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    description: "Fast bowler with batting skills",
    photoUrl: "/images/arjun.jpg",
    pinno: "JAL001"
  },
  {
    name: "Sneha Reddy",
    team: "PRUDHVI",
    matches: 10,
    innings: 16,
    runs: 423,
    highest_score: 62,
    hundreds: 0,
    fifties: 1,
    fours: 31,
    sixes: 12,
    balls_faced: 289,
    outs: 9,
    age: "19",
    position: "Batsman",
    battingStyle: "Left-handed",
    bowlingStyle: "Right-arm spin",
    description: "Promising young talent",
    photoUrl: "/images/sneha.jpg",
    pinno: "PRUDHVI001"
  }
];

const seedPlayers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing players
    await Player.deleteMany({});
    console.log('Cleared existing players');

    // Create new players
    const players = await Player.create(samplePlayers);
    console.log(`Created ${players.length} players`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding players:', error);
    process.exit(1);
  }
};

seedPlayers();
