import { useCollection } from "@/hooks/useFirebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Download, Heart, Share2, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Gallery() {
  interface GalleryItem {
    id: string;
    title: string;
    image_url: string;
    description: string;
    created_at: string;
    match?: string;
  }

  const { data: gallery, loading } = useCollection('gallery');
  const { toast } = useToast();
  // Local like state for demo
  const [likes, setLikes] = useState<{[id: string]: number}>({});

  // Sample gallery data for demonstration
  const sampleGallery: GalleryItem[] = [
    {
      id: 'sample-1',
      title: 'Championship Victory Celebration',
      image_url: 'data:image/jpeg;base64,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',
      description: 'Mumbai Warriors celebrating their tournament victory with the championship trophy.',
      created_at: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      title: 'Opening Ceremony Highlights',
      image_url: 'data:image/jpeg;base64,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',
      description: 'Grand opening ceremony with teams marching and cricket legends in attendance.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'sample-3',
      title: 'Best Batting Performance',
      image_url: 'data:image/jpeg;base64,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',
      description: 'Spectacular batting display during the Mumbai Warriors vs Delhi Knights match.',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      match: 'Mumbai Warriors vs Delhi Knights'
    },
    {
      id: 'sample-4',
      title: 'Team Spirit',
      image_url: 'data:image/jpeg;base64,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',
      description: 'Chennai Eagles team huddle before their crucial match.',
      created_at: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: 'sample-5',
      title: 'Crowd Support',
      image_url: 'data:image/jpeg;base64,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',
      description: 'Enthusiastic crowd cheering for their favorite teams.',
      created_at: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      id: 'sample-6',
      title: 'Award Ceremony',
      image_url: '/placeholder.svg',
      description: 'Player of the tournament receiving his well-deserved award.',
      created_at: new Date(Date.now() - 432000000).toISOString(),
    }
  ];

  const displayGallery = gallery.length > 0 ? gallery : sampleGallery;
  // Download image handler
  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '_') + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: 'Download started', description: 'Image is downloading.' });
  };

  // Share handler
  const handleShare = async (url: string, title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        toast({ title: 'Shared!', description: 'Image shared successfully.' });
      } catch {
        toast({ title: 'Share cancelled', description: 'User cancelled sharing.' });
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({ title: 'Link copied!', description: 'Image URL copied to clipboard.' });
      } catch {
        toast({ title: 'Share failed', description: 'Could not copy link.' });
      }
    }
  };

  // Like handler
  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    toast({ title: 'Liked!', description: 'You liked this photo.' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <Card key={i} className="cricket-shadow overflow-hidden">
              <Skeleton className="w-full h-64" />
              <div className="p-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground mt-2">
            Capturing the best moments from the cricket tournament
          </p>
        </div>
        
        <Badge className="cricket-shadow text-lg px-4 py-2">
          <Camera className="mr-2 h-5 w-5" />
          {displayGallery.length} Photos
        </Badge>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayGallery.map((item: any, index: number) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="cricket-shadow hover-scale overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0" onClick={() => handleLike(item.id)} aria-label="Like">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0" onClick={() => handleShare(item.image_url, item.title)} aria-label="Share">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0" onClick={() => handleDownload(item.image_url, item.title)} aria-label="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Photo number badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
                {/* Date badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="text-xs bg-white/90 text-black">
                    {formatDate(item.created_at)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                {item.match && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Badge variant="outline" className="text-xs">
                      {item.match}
                    </Badge>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button
                    className="flex items-center gap-1 group"
                    onClick={() => handleLike(item.id)}
                    aria-label="Like photo"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    
                  </button>
                </div>
                  {/* Download and View Full buttons removed as requested */}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="cricket-shadow">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Photo Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Match Action', 'Celebrations', 'Team Photos', 'Awards', 'Behind the Scenes', 'Crowd Moments'].map((category) => (
                <Badge 
                  key={category}
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}