import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Highlight from '../models/Highlight.js';
import Match from '../models/Match.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExt);
  }
});

// File filter to accept only videos and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov|mkv|webm|flv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, PNG, GIF, WebP) and videos (MP4, AVI, MOV, MKV, WebM, FLV) are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB limit
  },
  fileFilter: fileFilter
});

// GET /api/highlights - Get all highlights with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, limit = 50, page = 1 } = req.query;
    
    let query = { isActive: true };
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by featured status
    if (featured === 'true') {
      query.featured = true;
    }
    
    let highlights;
    
    // Handle search
    if (search) {
      highlights = await Highlight.search(search);
    } else {
      highlights = await Highlight.find(query);
    }
    
    // Apply additional filters and sorting
    const sortedHighlights = highlights
      .sort((a, b) => {
        // First sort by featured status (featured items first)
        if (a.featured !== b.featured) {
          return b.featured - a.featured; // true comes before false
        }
        // Then sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .slice((parseInt(page) - 1) * parseInt(limit), parseInt(page) * parseInt(limit));
    
    // Populate match details if matchId exists
    await Highlight.populate(sortedHighlights, {
      path: 'matchId',
      select: 'team1 team2 date tournament result',
      model: 'Match'
    });
    
    // Transform match data for frontend
    const transformedHighlights = sortedHighlights.map(highlight => {
      const obj = highlight.toObject();
      if (obj.matchId) {
        obj.matchDetails = {
          teams: `${obj.matchId.team1} vs ${obj.matchId.team2}`,
          date: obj.matchId.date,
          tournament: obj.matchId.tournament || 'Tournament',
          result: obj.matchId.result
        };
      }
      return obj;
    });
    
    res.json(transformedHighlights);
  } catch (error) {
    console.error('Error fetching highlights:', error);
    res.status(500).json({ message: 'Error fetching highlights', error: error.message });
  }
});

// GET /api/highlights/:id - Get single highlight
router.get('/:id', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id).populate('matchId');
    
    if (!highlight || !highlight.isActive) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    
    res.json(highlight);
  } catch (error) {
    console.error('Error fetching highlight:', error);
    res.status(500).json({ message: 'Error fetching highlight', error: error.message });
  }
});

// POST /api/highlights - Create new highlight
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }
    
    const { title, description, category, featured, matchId, tags } = req.body;
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    // Determine file type
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    const videoExts = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv'];
    const fileType = videoExts.includes(fileExt) ? 'video' : 'image';
    
    // Create file URL
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Parse tags if provided
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        parsedTags = tags.split(',').map(tag => tag.trim());
      }
    }
    
    // Create highlight object
    const highlightData = {
      title,
      description,
      fileUrl,
      fileType,
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
      category: category || 'Match Highlights',
      featured: featured === 'true' || featured === true,
      tags: parsedTags,
      uploadedBy: 'Admin'
    };
    
    // Add match reference if provided
    if (matchId && matchId !== 'undefined' && matchId !== '') {
      highlightData.matchId = matchId;
      
      // Fetch match details
      try {
        const match = await Match.findById(matchId);
        if (match) {
          highlightData.matchDetails = {
            teams: `${match.team1} vs ${match.team2}`,
            date: match.date,
            tournament: match.tournament || 'Tournament',
            result: match.result
          };
        }
      } catch (matchError) {
        console.log('Match not found, continuing without match details');
      }
    }
    
    const highlight = new Highlight(highlightData);
    await highlight.save();
    
    res.status(201).json({
      message: 'Highlight uploaded successfully',
      highlight
    });
  } catch (error) {
    console.error('Error creating highlight:', error);
    
    // Clean up uploaded file if highlight creation failed
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    
    res.status(500).json({ message: 'Error creating highlight', error: error.message });
  }
});

// PUT /api/highlights/:id - Update highlight
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, featured, tags } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (featured !== undefined) updateData.featured = featured === 'true' || featured === true;
    if (tags) {
      try {
        updateData.tags = JSON.parse(tags);
      } catch (e) {
        updateData.tags = tags.split(',').map(tag => tag.trim());
      }
    }
    
    const highlight = await Highlight.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!highlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    
    res.json({
      message: 'Highlight updated successfully',
      highlight
    });
  } catch (error) {
    console.error('Error updating highlight:', error);
    res.status(500).json({ message: 'Error updating highlight', error: error.message });
  }
});

// DELETE /api/highlights/:id - Delete highlight
router.delete('/:id', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    
    if (!highlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', highlight.fileUrl);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
    }
    
    // Soft delete (set isActive to false)
    highlight.isActive = false;
    await highlight.save();
    
    res.json({ message: 'Highlight deleted successfully' });
  } catch (error) {
    console.error('Error deleting highlight:', error);
    res.status(500).json({ message: 'Error deleting highlight', error: error.message });
  }
});

// POST /api/highlights/:id/view - Increment view count
router.post('/:id/view', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    
    if (!highlight || !highlight.isActive) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    
    await highlight.incrementViews();
    
    res.json({ views: highlight.views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ message: 'Error incrementing views', error: error.message });
  }
});

// POST /api/highlights/:id/toggle-featured - Toggle featured status
router.post('/:id/toggle-featured', async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    
    if (!highlight || !highlight.isActive) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    
    await highlight.toggleFeatured();
    
    res.json({
      message: `Highlight ${highlight.featured ? 'featured' : 'unfeatured'} successfully`,
      featured: highlight.featured
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({ message: 'Error toggling featured status', error: error.message });
  }
});

// GET /api/highlights/stats/overview - Get highlights statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalHighlights = await Highlight.countDocuments({ isActive: true });
    const featuredCount = await Highlight.countDocuments({ featured: true, isActive: true });
    const videoCount = await Highlight.countDocuments({ fileType: 'video', isActive: true });
    const imageCount = await Highlight.countDocuments({ fileType: 'image', isActive: true });
    
    const totalViews = await Highlight.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    
    const categoryStats = await Highlight.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.json({
      totalHighlights,
      featuredCount,
      videoCount,
      imageCount,
      totalViews: totalViews[0]?.totalViews || 0,
      categoryStats
    });
  } catch (error) {
    console.error('Error fetching highlight stats:', error);
    res.status(500).json({ message: 'Error fetching highlight stats', error: error.message });
  }
});

export default router;