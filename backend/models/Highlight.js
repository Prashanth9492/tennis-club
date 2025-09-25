import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['video', 'image']
  },
  originalFileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Best Shots', 'Match Highlights', 'Player Focus', 'Tournament Moments'],
    default: 'Match Highlights'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: String,
    required: true,
    default: 'Admin'
  },
  matchDetails: {
    teams: String,
    date: Date,
    tournament: String,
    result: String
  },
  thumbnailUrl: {
    type: String // For video thumbnails
  },
  duration: {
    type: Number // Video duration in seconds
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
highlightSchema.index({ title: 'text', description: 'text', tags: 'text' });
highlightSchema.index({ category: 1, featured: -1, createdAt: -1 });
highlightSchema.index({ matchId: 1 });
highlightSchema.index({ views: -1 });

// Virtual for getting file extension
highlightSchema.virtual('fileExtension').get(function() {
  return this.originalFileName.split('.').pop()?.toLowerCase();
});

// Method to increment views
highlightSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to toggle featured status
highlightSchema.methods.toggleFeatured = function() {
  this.featured = !this.featured;
  return this.save();
};

// Static method to get featured highlights
highlightSchema.statics.getFeatured = function() {
  return this.find({ featured: true, isActive: true })
    .sort({ createdAt: -1 })
    .limit(6);
};

// Static method to get highlights by category
highlightSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true })
    .sort({ createdAt: -1 });
};

// Static method to search highlights
highlightSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isActive: true
  }).sort({ score: { $meta: 'textScore' } });
};

// Pre-save middleware to ensure file validation
highlightSchema.pre('save', function(next) {
  // Validate file type based on extension
  const fileExt = this.originalFileName.split('.').pop()?.toLowerCase();
  
  const videoExts = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv'];
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
  
  if (this.fileType === 'video' && !videoExts.includes(fileExt || '')) {
    return next(new Error('Invalid video file format'));
  }
  
  if (this.fileType === 'image' && !imageExts.includes(fileExt || '')) {
    return next(new Error('Invalid image file format'));
  }
  
  next();
});

// Post-save middleware for logging
highlightSchema.post('save', function(doc) {
  console.log(`Highlight saved: ${doc.title} (${doc.fileType})`);
});

const Highlight = mongoose.model('Highlight', highlightSchema);

export default Highlight;