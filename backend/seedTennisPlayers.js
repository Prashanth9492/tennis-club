import mongoose from 'mongoose';
import Player from './models/Player.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Try Atlas first, then fallback to local
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas for seeding');
  } catch (atlasError) {
    console.log('⚠️  Atlas connection failed, trying local MongoDB...');
    try {
      await mongoose.connect('mongodb://localhost:27017/tennis_club');
      console.log('✅ Connected to local MongoDB for seeding');
    } catch (localError) {
      console.error('❌ Both Atlas and local MongoDB connections failed:', localError);
      process.exit(1);
    }
  }
};

const tennisSeedData = [
  // Men's Singles Players
  {
    name: "Rajesh Kumar",
    player_id: "BTC001",
    category: "Men_Singles",
    age: "24",
    height: "6'1\"",
    weight: "75 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Suresh Patel",
    turned_pro: "2020",
    description: "Aggressive baseline player with powerful forehand and consistent serve.",
    matches_played: 45,
    matches_won: 32,
    matches_lost: 13,
    sets_won: 78,
    sets_lost: 43,
    games_won: 485,
    games_lost: 321,
    titles_won: 5,
    finals_reached: 8,
    semifinals_reached: 12,
    quarterfinals_reached: 18,
    aces: 245,
    double_faults: 87,
    winners: 432,
    unforced_errors: 198,
    break_points_won: 89,
    break_points_saved: 67
  },
  {
    name: "Vikram Singh",
    player_id: "BTC002",
    category: "Men_Singles",
    age: "26",
    height: "5'11\"",
    weight: "72 kg",
    plays: "Left-handed",
    backhand: "One-handed",
    coach: "Ramesh Gupta",
    turned_pro: "2018",
    description: "Serve and volley specialist with excellent net play and tactical awareness.",
    matches_played: 52,
    matches_won: 31,
    matches_lost: 21,
    sets_won: 82,
    sets_lost: 59,
    games_won: 521,
    games_lost: 398,
    titles_won: 3,
    finals_reached: 6,
    semifinals_reached: 10,
    quarterfinals_reached: 15,
    aces: 312,
    double_faults: 76,
    winners: 389,
    unforced_errors: 167,
    break_points_won: 78,
    break_points_saved: 92
  },
  {
    name: "Arjun Reddy",
    player_id: "BTC003",
    category: "Men_Singles",
    age: "22",
    height: "6'0\"",
    weight: "74 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Krishna Murthy",
    turned_pro: "2022",
    description: "Young and promising player with exceptional court coverage and mental toughness.",
    matches_played: 38,
    matches_won: 28,
    matches_lost: 10,
    sets_won: 65,
    sets_lost: 32,
    games_won: 412,
    games_lost: 275,
    titles_won: 4,
    finals_reached: 7,
    semifinals_reached: 11,
    quarterfinals_reached: 16,
    aces: 198,
    double_faults: 54,
    winners: 356,
    unforced_errors: 145,
    break_points_won: 95,
    break_points_saved: 71
  },

  // Women's Singles Players
  {
    name: "Priya Sharma",
    player_id: "BTC004",
    category: "Women_Singles",
    age: "23",
    height: "5'7\"",
    weight: "58 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Sunita Devi",
    turned_pro: "2021",
    description: "Consistent baseline player with excellent defensive skills and court positioning.",
    matches_played: 41,
    matches_won: 29,
    matches_lost: 12,
    sets_won: 71,
    sets_lost: 38,
    games_won: 456,
    games_lost: 298,
    titles_won: 6,
    finals_reached: 9,
    semifinals_reached: 13,
    quarterfinals_reached: 19,
    aces: 167,
    double_faults: 43,
    winners: 298,
    unforced_errors: 134,
    break_points_won: 87,
    break_points_saved: 79
  },
  {
    name: "Anitha Rao",
    player_id: "BTC005",
    category: "Women_Singles",
    age: "25",
    height: "5'6\"",
    weight: "56 kg",
    plays: "Left-handed",
    backhand: "One-handed",
    coach: "Lakshmi Prasad",
    turned_pro: "2019",
    description: "Aggressive player with powerful groundstrokes and excellent return game.",
    matches_played: 47,
    matches_won: 33,
    matches_lost: 14,
    sets_won: 79,
    sets_lost: 45,
    games_won: 487,
    games_lost: 334,
    titles_won: 7,
    finals_reached: 11,
    semifinals_reached: 15,
    quarterfinals_reached: 21,
    aces: 234,
    double_faults: 67,
    winners: 412,
    unforced_errors: 189,
    break_points_won: 102,
    break_points_saved: 84
  },
  {
    name: "Sneha Patel",
    player_id: "BTC006",
    category: "Women_Singles",
    age: "21",
    height: "5'8\"",
    weight: "59 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Radha Krishna",
    turned_pro: "2023",
    description: "Rising star with exceptional speed and agility, known for clutch performances.",
    matches_played: 35,
    matches_won: 26,
    matches_lost: 9,
    sets_won: 58,
    sets_lost: 29,
    games_won: 378,
    games_lost: 234,
    titles_won: 3,
    finals_reached: 5,
    semifinals_reached: 8,
    quarterfinals_reached: 12,
    aces: 145,
    double_faults: 38,
    winners: 287,
    unforced_errors: 98,
    break_points_won: 76,
    break_points_saved: 65
  },

  // Men's Doubles Players
  {
    name: "Ravi Krishnan",
    player_id: "BTC007",
    category: "Men_Doubles",
    age: "27",
    height: "6'2\"",
    weight: "78 kg",
    plays: "Right-handed",
    backhand: "One-handed",
    coach: "Mohan Das",
    turned_pro: "2017",
    description: "Excellent net player with strong volleys and tactical doubles awareness.",
    matches_played: 44,
    matches_won: 31,
    matches_lost: 13,
    sets_won: 74,
    sets_lost: 41,
    games_won: 467,
    games_lost: 312,
    titles_won: 8,
    finals_reached: 12,
    semifinals_reached: 16,
    quarterfinals_reached: 22,
    aces: 289,
    double_faults: 72,
    winners: 345,
    unforced_errors: 156,
    break_points_won: 94,
    break_points_saved: 88
  },
  {
    name: "Suresh Babu",
    player_id: "BTC008",
    category: "Men_Doubles",
    age: "29",
    height: "5'10\"",
    weight: "73 kg",
    plays: "Left-handed",
    backhand: "Two-handed",
    coach: "Venkat Rao",
    turned_pro: "2016",
    description: "Versatile doubles player with excellent communication and court coverage.",
    matches_played: 48,
    matches_won: 34,
    matches_lost: 14,
    sets_won: 81,
    sets_lost: 47,
    games_won: 512,
    games_lost: 356,
    titles_won: 9,
    finals_reached: 13,
    semifinals_reached: 18,
    quarterfinals_reached: 24,
    aces: 267,
    double_faults: 85,
    winners: 398,
    unforced_errors: 178,
    break_points_won: 89,
    break_points_saved: 96
  },

  // Women's Doubles Players
  {
    name: "Kavitha Menon",
    player_id: "BTC009",
    category: "Women_Doubles",
    age: "24",
    height: "5'5\"",
    weight: "55 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Sridevi Nair",
    turned_pro: "2020",
    description: "Quick reflexes at net with excellent doubles positioning and shot placement.",
    matches_played: 42,
    matches_won: 30,
    matches_lost: 12,
    sets_won: 72,
    sets_lost: 39,
    games_won: 445,
    games_lost: 287,
    titles_won: 6,
    finals_reached: 10,
    semifinals_reached: 14,
    quarterfinals_reached: 20,
    aces: 189,
    double_faults: 51,
    winners: 312,
    unforced_errors: 128,
    break_points_won: 82,
    break_points_saved: 73
  },
  {
    name: "Deepika Joshi",
    player_id: "BTC010",
    category: "Women_Doubles",
    age: "26",
    height: "5'7\"",
    weight: "57 kg",
    plays: "Left-handed",
    backhand: "One-handed",
    coach: "Padma Reddy",
    turned_pro: "2018",
    description: "Strategic player with powerful serve and excellent doubles chemistry.",
    matches_played: 45,
    matches_won: 32,
    matches_lost: 13,
    sets_won: 76,
    sets_lost: 42,
    games_won: 478,
    games_lost: 321,
    titles_won: 7,
    finals_reached: 11,
    semifinals_reached: 15,
    quarterfinals_reached: 21,
    aces: 223,
    double_faults: 64,
    winners: 356,
    unforced_errors: 149,
    break_points_won: 91,
    break_points_saved: 79
  },

  // Mixed Doubles Players
  {
    name: "Arun Kumar",
    player_id: "BTC011",
    category: "Mixed_Doubles",
    age: "28",
    height: "6'1\"",
    weight: "76 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Gopala Krishna",
    turned_pro: "2017",
    description: "Adaptable player excelling in mixed doubles with great partnership skills.",
    matches_played: 39,
    matches_won: 27,
    matches_lost: 12,
    sets_won: 64,
    sets_lost: 38,
    games_won: 412,
    games_lost: 289,
    titles_won: 5,
    finals_reached: 8,
    semifinals_reached: 12,
    quarterfinals_reached: 17,
    aces: 201,
    double_faults: 58,
    winners: 298,
    unforced_errors: 132,
    break_points_won: 76,
    break_points_saved: 68
  },
  {
    name: "Meera Iyer",
    player_id: "BTC012",
    category: "Mixed_Doubles",
    age: "25",
    height: "5'6\"",
    weight: "56 kg",
    plays: "Right-handed",
    backhand: "Two-handed",
    coach: "Usha Kiran",
    turned_pro: "2019",
    description: "Versatile mixed doubles specialist with excellent court awareness and adaptability.",
    matches_played: 41,
    matches_won: 29,
    matches_lost: 12,
    sets_won: 68,
    sets_lost: 37,
    games_won: 432,
    games_lost: 278,
    titles_won: 6,
    finals_reached: 9,
    semifinals_reached: 13,
    quarterfinals_reached: 18,
    aces: 167,
    double_faults: 45,
    winners: 287,
    unforced_errors: 119,
    break_points_won: 84,
    break_points_saved: 71
  }
];

const seedTennisPlayers = async () => {
  try {
    await connectDB();
    
    // Clear existing players
    await Player.deleteMany({});
    console.log('🗑️  Cleared existing players');
    
    // Insert tennis players
    await Player.insertMany(tennisSeedData);
    console.log(`✅ Successfully seeded ${tennisSeedData.length} tennis players`);
    
    // Display summary
    const categories = await Player.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgWinPercentage: { $avg: { $multiply: [{ $divide: ['$matches_won', '$matches_played'] }, 100] } }
        }
      }
    ]);
    
    console.log('\n📊 Seeded Players Summary:');
    categories.forEach(cat => {
      console.log(`   ${cat._id.replace('_', ' ')}: ${cat.count} players (Avg Win Rate: ${cat.avgWinPercentage.toFixed(1)}%)`);
    });
    
    console.log('\n🎾 Bhimavaram Tennis Club database is ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding tennis players:', error);
    process.exit(1);
  }
};

seedTennisPlayers();