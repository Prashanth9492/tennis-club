import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Player from './models/Player.js';
import Tournament from './models/Team.js';
import Match from './models/Match.js';
import Ranking from './models/PointsTable.js';

dotenv.config();

// Sample tennis players
const tennisPlayers = [
  {
    name: "Rajesh Kumar",
    category: "Men_Singles",
    matches_played: 15,
    matches_won: 12,
    matches_lost: 3,
    sets_won: 28,
    sets_lost: 12,
    games_won: 180,
    games_lost: 95,
    titles_won: 2,
    finals_reached: 3,
    semifinals_reached: 5,
    aces: 45,
    double_faults: 12,
    winners: 120,
    unforced_errors: 35,
    age: "21",
    height: "6'1\"",
    weight: "75kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Suresh Menon",
    turned_pro: "2022",
    description: "Aggressive baseline player with powerful forehand",
    player_id: "TENNIS001"
  },
  {
    name: "Priya Sharma",
    category: "Women_Singles",
    matches_played: 18,
    matches_won: 14,
    matches_lost: 4,
    sets_won: 32,
    sets_lost: 15,
    games_won: 205,
    games_lost: 110,
    titles_won: 3,
    finals_reached: 4,
    semifinals_reached: 6,
    aces: 35,
    double_faults: 8,
    winners: 95,
    unforced_errors: 28,
    age: "20",
    height: "5'6\"",
    weight: "58kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Maria Rodriguez",
    turned_pro: "2023",
    description: "All-court player with excellent court coverage",
    player_id: "TENNIS002"
  },
  {
    name: "Arjun Patel",
    category: "Men_Singles",
    matches_played: 12,
    matches_won: 8,
    matches_lost: 4,
    sets_won: 19,
    sets_lost: 14,
    games_won: 145,
    games_lost: 125,
    titles_won: 1,
    finals_reached: 2,
    semifinals_reached: 3,
    aces: 28,
    double_faults: 15,
    winners: 75,
    unforced_errors: 42,
    age: "22",
    height: "5'11\"",
    weight: "72kg",
    plays: "Left-handed",
    backhand: "One-handed",
    coach: "David Wilson",
    turned_pro: "2022",
    description: "Serve and volley specialist with great net skills",
    player_id: "TENNIS003"
  },
  {
    name: "Sneha Reddy",
    category: "Women_Singles",
    matches_played: 16,
    matches_won: 11,
    matches_lost: 5,
    sets_won: 25,
    sets_lost: 18,
    games_won: 175,
    games_lost: 140,
    titles_won: 1,
    finals_reached: 3,
    semifinals_reached: 4,
    aces: 22,
    double_faults: 10,
    winners: 88,
    unforced_errors: 31,
    age: "19",
    height: "5'7\"",
    weight: "60kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Elena Kozlova",
    turned_pro: "2023",
    description: "Defensive counter-puncher with exceptional movement",
    player_id: "TENNIS004"
  }
];

// Sample tournaments
const tennisTournaments = [
  {
    name: "SRKREC Open Singles Championship",
    category: "Men_Singles",
    organizer: "SRKREC Tennis Committee",
    venue: "SRKREC Tennis Courts",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-20"),
    format: "Single_Elimination",
    surface: "Hard",
    prize_money: "₹50,000",
    max_participants: 32,
    current_participants: 28,
    status: "registration_open",
    description: "Annual men's singles championship featuring the best college tennis players"
  },
  {
    name: "Women's College Tennis Cup",
    category: "Women_Singles",
    organizer: "SRKREC Tennis Committee",
    venue: "SRKREC Tennis Courts",
    startDate: new Date("2024-04-10"),
    endDate: new Date("2024-04-15"),
    format: "Single_Elimination",
    surface: "Hard",
    prize_money: "₹40,000",
    max_participants: 24,
    current_participants: 22,
    status: "registration_open",
    description: "Premier women's singles tournament showcasing emerging talent"
  },
  {
    name: "Doubles Masters Tournament",
    category: "Men_Doubles",
    organizer: "SRKREC Tennis Committee",
    venue: "SRKREC Tennis Courts",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-05"),
    format: "Round_Robin",
    surface: "Hard",
    prize_money: "₹60,000",
    max_participants: 16,
    current_participants: 14,
    status: "upcoming",
    description: "Elite doubles competition featuring top pairs"
  }
];

// Sample rankings
const tennisRankings = [
  {
    player: "Rajesh Kumar",
    category: "Men_Singles",
    current_ranking: 1,
    previous_ranking: 2,
    ranking_points: 1250,
    tournaments_played: 15,
    best_result: "Winner",
    season: "2024",
    highest_ranking: 1,
    highest_ranking_date: new Date("2024-01-15")
  },
  {
    player: "Priya Sharma",
    category: "Women_Singles",
    current_ranking: 1,
    previous_ranking: 1,
    ranking_points: 1180,
    tournaments_played: 18,
    best_result: "Winner",
    season: "2024",
    highest_ranking: 1,
    highest_ranking_date: new Date("2023-12-01")
  },
  {
    player: "Arjun Patel",
    category: "Men_Singles",
    current_ranking: 3,
    previous_ranking: 4,
    ranking_points: 950,
    tournaments_played: 12,
    best_result: "Finalist",
    season: "2024",
    highest_ranking: 3,
    highest_ranking_date: new Date("2024-02-10")
  },
  {
    player: "Sneha Reddy",
    category: "Women_Singles",
    current_ranking: 2,
    previous_ranking: 3,
    ranking_points: 1050,
    tournaments_played: 16,
    best_result: "Winner",
    season: "2024",
    highest_ranking: 2,
    highest_ranking_date: new Date("2024-01-20")
  }
];

async function seedTennisData() {
  try {
    // Connect to MongoDB - using the tennis database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college_tennis');
    console.log('Connected to MongoDB - Tennis Database');

    // Clear existing data
    await Player.deleteMany({});
    await Tournament.deleteMany({});
    await Ranking.deleteMany({});
    console.log('Cleared existing tennis data');

    // Insert tennis players
    await Player.insertMany(tennisPlayers);
    console.log('Tennis players seeded successfully');

    // Insert tournaments
    await Tournament.insertMany(tennisTournaments);
    console.log('Tennis tournaments seeded successfully');

    // Insert rankings
    await Ranking.insertMany(tennisRankings);
    console.log('Tennis rankings seeded successfully');

    console.log('All tennis data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tennis data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedTennisData();