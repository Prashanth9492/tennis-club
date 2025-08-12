import express from 'express';
import PointsTable from '../models/PointsTable.js';

const router = express.Router();

// Get all seasons
router.get('/seasons', async (req, res) => {
  try {
    const seasons = await PointsTable.distinct('season');
    res.json(seasons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get points table for a season
router.get('/', async (req, res) => {
  try {
    const { season } = req.query;
    const filter = season ? { season } : {};
    const points = await PointsTable.find(filter).sort({ points: -1 });
    res.json(points);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add or update a points table entry
router.post('/', async (req, res) => {
  try {
    const { team, matches, wins, losses, draws, points, season } = req.body;
    let entry = await PointsTable.findOne({ team, season });
    if (entry) {
      // Update existing
      entry.matches = matches;
      entry.wins = wins;
      entry.losses = losses;
      entry.draws = draws;
      entry.points = points;
      await entry.save();
      return res.json({ message: 'Points table updated', entry });
    } else {
      // Create new
      entry = new PointsTable({ team, matches, wins, losses, draws, points, season });
      await entry.save();
      return res.status(201).json({ message: 'Points table entry created', entry });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
