// This script seeds two admin users from environment variables if they don't exist.
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMINS = [
  {
    username: process.env.ADMIN1_USERNAME,
    password: process.env.ADMIN1_PASSWORD,
  },
  {
    username: process.env.ADMIN2_USERNAME,
    password: process.env.ADMIN2_PASSWORD,
  },
];

async function seedAdmins() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  for (const admin of ADMINS) {
    if (!admin.username || !admin.password) continue;
    const exists = await User.findOne({ username: admin.username });
    if (!exists) {
      await User.create({ ...admin, role: 'admin' });
      console.log(`Admin user created: ${admin.username}`);
    } else {
      console.log(`Admin user already exists: ${admin.username}`);
    }
  }
  await mongoose.disconnect();
}

seedAdmins().then(() => process.exit());
