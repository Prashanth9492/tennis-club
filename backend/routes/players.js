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
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const players = await Player.find(filter).sort({ createdAt: -1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET players by category
router.get('/category/:category', async (req, res) => {
  try {
    const players = await Player.find({ category: req.params.category }).sort({ wins: -1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create player
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log('Received player data:', req.body); // Debug log
    const playerData = { ...req.body };
    
    // Parse numeric fields for tennis stats
    const numericFields = [
      'matches_played', 'matches_won', 'matches_lost', 'sets_won', 'sets_lost',
      'games_won', 'games_lost', 'titles_won', 'finals_reached', 'semifinals_reached',
      'quarterfinals_reached', 'aces', 'double_faults', 'winners', 'unforced_errors',
      'break_points_won', 'break_points_saved'
    ];
    numericFields.forEach(field => {
      if (playerData[field] !== undefined && playerData[field] !== '') {
        playerData[field] = parseInt(playerData[field]);
      }
    });

    if (req.file) {
      playerData.photoUrl = `/uploads/${req.file.filename}`;
    }

    console.log('Processed player data:', playerData); // Debug log
    const player = new Player(playerData);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    console.error('Error creating player:', err); // Debug log
    res.status(400).json({ message: err.message, details: err.errors });
  }
});

// PUT update player
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    console.log('Updating player with data:', req.body); // Debug log
    const playerData = { ...req.body };
    
    // Parse numeric fields - using correct field names from schema
    const numericFields = ['matches', 'innings', 'runs', 'highest_score', 'hundreds', 'fifties', 'fours', 'sixes', 'balls_faced', 'outs'];
    numericFields.forEach(field => {
      if (playerData[field] !== undefined && playerData[field] !== '') {
        playerData[field] = parseInt(playerData[field]);
      }
    });

    if (req.file) {
      playerData.photoUrl = `/uploads/${req.file.filename}`;
    }

    const player = await Player.findByIdAndUpdate(req.params.id, playerData, { new: true });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (err) {
    console.error('Error updating player:', err); // Debug log
    res.status(400).json({ message: err.message, details: err.errors });
  }
});

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
