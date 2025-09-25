import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';




import teamsRouter from './routes/teams.js';
import playersRouter from './routes/players.js';
import matchesRouter from './routes/matches.js';
import newsRouter from './routes/news.js';
import galleryRouter from './routes/gallery.js';
import pointsTableRouter from './routes/pointsTable.js';
import authRouter from './routes/auth.js';
import highlightsRouter from './routes/highlights.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to look for .env file in the backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log('🔍 Environment variables check:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI defined:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);

const app = express(); // ✅ initialize app first
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('joinMatch', (matchId) => {
    socket.join(`match_${matchId}`);
    console.log(`Client ${socket.id} joined match ${matchId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Add the route after app is defined
app.get('/', (req, res) => {
  res.send('API is running');
});

// Debug endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date() });
});

// For file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes


app.use('/api/auth', authRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/news', newsRouter);
app.use('/api/galleries', galleryRouter);
app.use('/api/points-table', pointsTableRouter);
app.use('/api/highlights', highlightsRouter);

const PORT = process.env.PORT || 5000;

// Start server regardless of MongoDB connection status
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔄 Socket.IO enabled for real-time updates`);
});

// Connect to MongoDB with improved settings for Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
      serverSelectionTimeoutMS: 30000, // 30 second timeout for initial connection
      socketTimeoutMS: 75000, // 75 second timeout for socket inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain a minimum of 2 socket connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    });
    console.log('✅ Connected to MongoDB Atlas');
    console.log('🗄️  Database: tennis_championship');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection failed:', err.message);
    console.log('🔧 Troubleshooting steps:');
    console.log('   1. Check if your IP address is whitelisted in MongoDB Atlas');
    console.log('   2. Verify your MongoDB credentials');
    console.log('   3. Check your internet connection');
    console.log('   4. Try adding 0.0.0.0/0 to IP whitelist temporarily');
    
    // Try local MongoDB as fallback
    try {
      await mongoose.connect('mongodb://localhost:27017/college_tennis');
      console.log('✅ Connected to local MongoDB as fallback');
      console.log('🗄️  Database: college_tennis (local)');
    } catch (localErr) {
      console.error('❌ Local MongoDB also failed:', localErr.message);
      console.log('⚠️  Server running without database connection');
      console.log('📝 Note: Some features may not work without database');
      console.log('💡 Install MongoDB locally or fix Atlas IP whitelist');
    }
  }
};

// Initialize database connection
connectDB();
