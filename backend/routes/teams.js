import express from 'express';
import multer from 'multer';
import Tournament from '../models/Team.js'; // This file will contain the Tournament model
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// GET all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET tournaments by category
router.get('/category/:category', async (req, res) => {
  try {
    const tournaments = await Tournament.find({ category: req.params.category });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create tournament
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { 
      name, 
      category, 
      organizer, 
      venue, 
      startDate, 
      endDate, 
      format, 
      surface, 
      prize_money, 
      max_participants, 
      description,
      rules 
    } = req.body;
    
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : '';
    
    const tournament = new Tournament({ 
      name, 
      category, 
      organizer, 
      venue, 
      startDate, 
      endDate, 
      format, 
      surface, 
      prize_money, 
      max_participants, 
      description, 
      logoUrl,
      rules 
    });
    
    await tournament.save();
    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update tournament
router.put('/:id', upload.single('logo'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.logoUrl = `/uploads/${req.file.filename}`;
    }
    
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE tournament
router.delete('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json({ message: 'Tournament deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
