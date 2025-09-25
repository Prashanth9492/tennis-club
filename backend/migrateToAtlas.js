import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import your models
import Player from './models/Player.js';
import Match from './models/Match.js';
import Team from './models/Team.js';
import News from './models/News.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const migrateToAtlas = async () => {
  try {
    console.log('🔄 Starting migration from local MongoDB to Atlas...');
    
    // Connect to local MongoDB first
    const localConnection = await mongoose.createConnection('mongodb://localhost:27017/college_tennis');
    console.log('✅ Connected to local MongoDB');
    
    // Get all data from local database
    const localPlayers = await localConnection.model('Player', Player.schema).find({});
    const localMatches = await localConnection.model('Match', Match.schema).find({});
    const localTeams = await localConnection.model('Team', Team.schema).find({});
    const localNews = await localConnection.model('News', News.schema).find({});
    
    console.log(`📊 Found data in local database:`);
    console.log(`   Players: ${localPlayers.length}`);
    console.log(`   Matches: ${localMatches.length}`);
    console.log(`   Teams: ${localTeams.length}`);
    console.log(`   News: ${localNews.length}`);
    
    // Close local connection
    await localConnection.close();
    
    if (localPlayers.length === 0 && localMatches.length === 0 && localTeams.length === 0 && localNews.length === 0) {
      console.log('📝 No data found in local database. Migration not needed.');
      return;
    }
    
    // Connect to Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing Atlas data (optional)
    console.log('🗑️  Clearing existing Atlas data...');
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Team.deleteMany({});
    await News.deleteMany({});
    
    // Insert data into Atlas
    if (localPlayers.length > 0) {
      await Player.insertMany(localPlayers);
      console.log(`✅ Migrated ${localPlayers.length} players`);
    }
    
    if (localMatches.length > 0) {
      await Match.insertMany(localMatches);
      console.log(`✅ Migrated ${localMatches.length} matches`);
    }
    
    if (localTeams.length > 0) {
      await Team.insertMany(localTeams);
      console.log(`✅ Migrated ${localTeams.length} teams`);
    }
    
    if (localNews.length > 0) {
      await News.insertMany(localNews);
      console.log(`✅ Migrated ${localNews.length} news items`);
    }
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.message.includes('Could not connect to any servers')) {
      console.log('');
      console.log('🔧 Atlas connection failed. Please:');
      console.log('   1. Whitelist your IP address in MongoDB Atlas');
      console.log('   2. Verify your credentials');
      console.log('   3. Check your internet connection');
    }
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

// Run migration
migrateToAtlas();