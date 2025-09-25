import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔍 Testing MongoDB connection...');
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);
console.log('Connection string preview:', process.env.MONGODB_URI?.substring(0, 50) + '...');

// Test MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, { 
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('🗄️  Database name:', mongoose.connection.db.databaseName);
    
    // List all collections
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log('📂 Available collections:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Check matches collection specifically
    return mongoose.connection.db.collection('matches').countDocuments();
  })
  .then((count) => {
    console.log(`🎾 Matches collection document count: ${count}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('🔧 Common issues:');
    console.log('   1. IP Address not whitelisted in MongoDB Atlas');
    console.log('   2. Wrong database credentials');
    console.log('   3. Network connectivity issues');
    console.log('   4. Database name mismatch');
    process.exit(1);
  });