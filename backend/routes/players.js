import express from 'express';
import multer from 'multer';
import Player from '../models/Player.js';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET all players
router.get('/', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// POST create player
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, age, house, position, team, battingStyle, bowlingStyle, description } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const player = new Player({ name, age, house, position, team, battingStyle, bowlingStyle, description, photoUrl });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
