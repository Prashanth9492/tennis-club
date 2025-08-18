import React, { useEffect, useState } from 'react';
import { Heart, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button'; // adjust this import based on your setup

interface GalleryItem {
  _id: string;
  title?: string;
  imageUrl: string;
}

const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/galleries")
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        // Flatten gallery items to individual images for display
        const images = data.flatMap((item: any) =>
          (item.imageUrls && item.imageUrls.length > 0)
            ? item.imageUrls.map((url: string) => ({
                _id: item._id,
                title: item.title,
                imageUrl: url
              }))
            : [{
                _id: item._id,
                title: item.title,
                imageUrl: '' // No image, will handle in render
              }]
        );
        setGallery(images);
        setLoading(false);
      })
      .catch(() => {
        setGallery([]);
        setError('Could not load gallery. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleLike = (id: string) => {
    // Optionally: call API to save like
  };

  const handleShare = (url: string, title?: string) => {
    if (navigator.share) {
      navigator.share({
        title: title || 'Shared from Gallery',
        url,
      });
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  const handleDownload = (url: string, title?: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title || 'download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <p className="text-center text-lg p-6">Loading gallery...</p>;
  }
  if (error) {
    return <p className="text-center text-lg p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No images found in the gallery.</div>
        )}
        {gallery.map((item) => (
          <div key={item._id + item.imageUrl} className="relative group overflow-hidden rounded-lg shadow hover:shadow-lg transition">
            {item.imageUrl ? (
              <img
                src={item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:5001${item.imageUrl}`}
                alt={item.title || 'Gallery Image'}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-60 flex items-center justify-center bg-gray-200 text-gray-400">
                No Image
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                 
                  {item.imageUrl && (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => handleShare(item.imageUrl, item.title)}
                        aria-label="Share"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => handleDownload(item.imageUrl, item.title)}
                        aria-label="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Title (Optional) */}
            {item.title && (
              <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
