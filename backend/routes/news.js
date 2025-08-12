import express from 'express';
import multer from 'multer';
import News from '../models/News.js';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET all news
router.get('/', async (req, res) => {
  const news = await News.find();
  res.json(news);
});

// POST create news
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, featured } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const news = new News({ title, content, category, featured, imageUrl });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
