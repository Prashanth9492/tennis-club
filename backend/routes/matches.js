import express from 'express';
import Match from '../models/Match.js';

const router = express.Router();

// GET all matches
router.get('/', async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

// POST create match
router.post('/', async (req, res) => {
  try {
    const { team1, team2, date, venue, type, status } = req.body;
    const match = new Match({ team1, team2, date, venue, type, status });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
