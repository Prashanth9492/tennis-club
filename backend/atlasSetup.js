#!/usr/bin/env node

/**
 * Complete Atlas Setup Guide & Test
 * Run this script to verify your Atlas connection
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🎾 TENNIS CLUB - MongoDB Atlas Setup & Test');
console.log('=============================================');
console.log('');

// Check environment variables
console.log('🔍 Environment Check:');
console.log(`   PORT: ${process.env.PORT || 'Not set'}`);
console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI;
  console.log(`   Connection: ${uri.substring(0, 50)}...${uri.substring(uri.length - 20)}`);
}
console.log('');

const testAtlasConnection = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env file');
    return false;
  }

  try {
    console.log('🔄 Testing Atlas connection...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // 15 second timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
    });
    
    console.log('✅ SUCCESS! Connected to MongoDB Atlas');
    console.log(`🗄️  Database: ${mongoose.connection.db.databaseName}`);
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📊 Collections found: ${collections.length}`);
    if (collections.length > 0) {
      console.log(`   Available: ${collections.map(c => c.name).join(', ')}`);
    }
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
    console.log('');
    
    if (error.message.includes('Could not connect to any servers')) {
      console.log('🔧 SOLUTION: IP Address Whitelist Issue');
      console.log('   STEP 1: Go to https://cloud.mongodb.com');
      console.log('   STEP 2: Select your project/cluster');
      console.log('   STEP 3: Click "Network Access" (left sidebar)');
      console.log('   STEP 4: Click "ADD IP ADDRESS"');
      console.log('   STEP 5: Choose "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)');
      console.log('   STEP 6: Click "Confirm" and wait 2-3 minutes');
      console.log('');
      console.log('   Or add your specific IP address for better security.');
      
    } else if (error.message.includes('authentication failed')) {
      console.log('🔐 SOLUTION: Authentication Issue');
      console.log('   STEP 1: Go to MongoDB Atlas Dashboard');
      console.log('   STEP 2: Click "Database Access" (left sidebar)');
      console.log('   STEP 3: Verify user "prashanth" exists');
      console.log('   STEP 4: Check password is "prasahanth@@"');
      console.log('   STEP 5: Ensure user has "Atlas Admin" or "Read/Write" role');
      
    } else {
      console.log('🔧 General troubleshooting:');
      console.log('   1. Check internet connection');
      console.log('   2. Verify cluster is running (not paused)');
      console.log('   3. Try from different network');
    }
    
    return false;
  }
};

// Main execution
const main = async () => {
  const success = await testAtlasConnection();
  
  console.log('');
  console.log('='.repeat(45));
  
  if (success) {
    console.log('🎉 ATLAS CONNECTION WORKING!');
    console.log('');
    console.log('Next Steps:');
    console.log('1. Run: npm run dev (to start backend)');
    console.log('2. Run: node seedAtlasDatabase.js (to add sample data)');
    console.log('3. Start frontend in another terminal');
    
  } else {
    console.log('❌ Atlas connection failed');
    console.log('Follow the solution steps above, then run this test again');
    console.log('');
    console.log('Quick fix: Allow 0.0.0.0/0 in Network Access');
  }
  
  process.exit(success ? 0 : 1);
};

main();