import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB Atlas connection...');
    console.log('Connection String (partial):', process.env.MONGODB_URI?.substring(0, 50) + '...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('🗄️  Database: tennis_championship');
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('Could not connect to any servers')) {
      console.log('');
      console.log('🔧 IP Whitelist Issue - Please:');
      console.log('   1. Go to MongoDB Atlas Dashboard');
      console.log('   2. Network Access → Add IP Address');
      console.log('   3. Add your current IP or 0.0.0.0/0');
      console.log('   4. Wait 2-3 minutes and try again');
    } else if (error.message.includes('authentication failed')) {
      console.log('');
      console.log('🔐 Authentication Issue - Please:');
      console.log('   1. Check username/password in connection string');
      console.log('   2. Verify user exists in Database Access');
      console.log('   3. Ensure user has proper permissions');
    }
  }
  
  process.exit();
};

console.log('🎾 Tennis Club - Atlas Connection Test');
console.log('=====================================');
testConnection();