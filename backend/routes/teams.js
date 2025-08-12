import express from 'express';
import multer from 'multer';
import Team from '../models/Team.js';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create team
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { name, coach, captain, homeGround, description } = req.body;
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const team = new Team({ name, coach, captain, homeGround, description, logoUrl });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
