  // Helper to fetch a sample image and upload as File
  const handleTestImage = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // Fetch a sample image as blob
      const response = await fetch('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
      const blob = await response.blob();
      // Create a File object
      const file = new File([blob], 'testimg.jpg', { type: blob.type });
      const formData = new FormData();
      formData.append('title', 'Test Image');
      formData.append('description', 'This is a test image uploaded automatically.');
      formData.append('category', 'test');
      formData.append('images', file);
      const res = await fetch('http://localhost:5001/api/gallery', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      setMessage('Test image uploaded successfully!');
    } catch (err) {
      setMessage('Test image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
import React, { useState } from 'react';

const GalleryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!images || images.length === 0) {
      setMessage('Please select at least one image.');
      return;
    }
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    Array.from(images).forEach((img) => formData.append('images', img));
    try {
      const res = await fetch('http://localhost:5001/api/gallery', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      setMessage('Gallery item uploaded successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      setImages(null);
    } catch (err) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2">Upload Gallery Images</h2>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-2"
        onClick={handleTestImage}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Test Image'}
      </button>
      {message && <div className="text-center text-sm text-red-500">{message}</div>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={e => setImages(e.target.files)}
        className="w-full"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default GalleryForm;
