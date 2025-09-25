import express from 'express';
import Ranking from '../models/PointsTable.js'; // This now contains the Ranking model

const router = express.Router();

// Get all seasons
router.get('/seasons', async (req, res) => {
  try {
    const seasons = await Ranking.distinct('season');
    res.json(seasons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Ranking.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get rankings for a season and category
router.get('/', async (req, res) => {
  try {
    const { season, category } = req.query;
    const filter = {};
    if (season) filter.season = season;
    if (category) filter.category = category;
    
    const rankings = await Ranking.find(filter).sort({ current_ranking: 1 });
    res.json(rankings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get player ranking history
router.get('/player/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;
    const { category } = req.query;
    
    const filter = { player: playerId };
    if (category) filter.category = category;
    
    const history = await Ranking.find(filter).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add or update a ranking entry
router.post('/', async (req, res) => {
  try {
    const { 
      player, 
      category, 
      current_ranking, 
      ranking_points, 
      tournaments_played, 
      best_result, 
      season,
      highest_ranking,
      highest_ranking_date
    } = req.body;
    
    let entry = await Ranking.findOne({ player, category, season });
    if (entry) {
      // Update existing
      const previous_ranking = entry.current_ranking;
      entry.previous_ranking = previous_ranking;
      entry.current_ranking = current_ranking;
      entry.ranking_points = ranking_points;
      entry.tournaments_played = tournaments_played;
      entry.best_result = best_result;
      
      if (highest_ranking) entry.highest_ranking = highest_ranking;
      if (highest_ranking_date) entry.highest_ranking_date = highest_ranking_date;
      
      // Reset weeks counter if ranking changed
      if (previous_ranking !== current_ranking) {
        entry.weeks_at_current_ranking = 1;
      } else {
        entry.weeks_at_current_ranking += 1;
      }
      
      await entry.save();
      return res.json({ message: 'Ranking updated', entry });
    } else {
      // Create new
      entry = new Ranking({ 
        player, 
        category, 
        current_ranking, 
        ranking_points, 
        tournaments_played, 
        best_result, 
        season,
        highest_ranking: highest_ranking || current_ranking,
        highest_ranking_date: highest_ranking_date || new Date()
      });
      await entry.save();
      return res.status(201).json({ message: 'Ranking entry created', entry });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
