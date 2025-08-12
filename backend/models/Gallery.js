import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  imageUrls: [String]
});

export default mongoose.model('Gallery', GallerySchema);
