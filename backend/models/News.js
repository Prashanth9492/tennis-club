import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: String,
  featured: Boolean,
  imageUrl: String
});

export default mongoose.model('News', NewsSchema);
