// Sample data insert script for MongoDB
import mongoose from "mongoose";
import Team from "./models/Team.js";
import Player from "./models/Player.js";
import Match from "./models/Match.js";
import News from "./models/News.js";
import Gallery from "./models/Gallery.js";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(MONGODB_URI);

  // Clear existing data
  await Team.deleteMany({});
  await Player.deleteMany({});
  await Match.deleteMany({});
  await News.deleteMany({});
  await Gallery.deleteMany({});

  // Insert sample teams
  const teams = await Team.insertMany([
    { name: "Lions", coach: "John Doe", captain: "Sam Smith", homeGround: "Main Stadium", description: "The Lions are fierce competitors." },
    { name: "Tigers", coach: "Jane Roe", captain: "Alex Brown", homeGround: "City Arena", description: "The Tigers are known for their agility." }
  ]);

  // Insert sample players
  await Player.insertMany([
    { name: "Sam Smith", age: 25, position: "batsman", team: teams[0].name, battingStyle: "right-handed", bowlingStyle: "spin", description: "Opening batsman." },
    { name: "Alex Brown", age: 27, position: "bowler", team: teams[1].name, battingStyle: "left-handed", bowlingStyle: "fast", description: "Fast bowler." }
  ]);

  // Insert sample matches
  await Match.insertMany([
    { team1: teams[0].name, team2: teams[1].name, date: new Date(), venue: "Main Stadium", type: "League", status: "Scheduled" }
  ]);

  // Insert sample news
  await News.insertMany([
    { title: "Season Kickoff!", content: "The new season starts with a bang!", category: "General", featured: true }
  ]);

  // Insert sample gallery
  await Gallery.insertMany([
    { title: "Opening Ceremony", description: "Photos from the opening ceremony.", category: "Events", images: [] }
  ]);

  console.log("Sample data inserted.");
  await mongoose.disconnect();
}

seed().catch(console.error);
