import express from 'express';

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary.js';
import Gallery from '../models/Gallery.js';
import path from 'path';

const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'housescricket_gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
});
const upload = multer({ storage });

// GET all gallery items
router.get('/', async (req, res) => {
  const gallery = await Gallery.find();
  res.json(gallery);
});

// POST create gallery item (multiple images)
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const imageUrls = req.files ? req.files.map(f => f.path) : [];
    const gallery = new Gallery({ title, description, category, imageUrls });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
