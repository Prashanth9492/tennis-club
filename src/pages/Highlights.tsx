import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Search, Calendar, Trophy, Eye } from "lucide-react";

interface Highlight {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'video' | 'image';
  matchId?: string;
  category: 'Best Shots' | 'Match Highlights' | 'Player Focus' | 'Tournament Moments';
  featured: boolean;
  views: number;
  createdAt: string;
  matchDetails?: {
    teams: string;
    date: string;
    tournament: string;
  };
}

const Highlights: React.FC = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [filteredHighlights, setFilteredHighlights] = useState<Highlight[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  useEffect(() => {
    filterHighlights();
  }, [highlights, searchTerm, selectedCategory]);

  const fetchHighlights = async () => {
    try {
      const response = await fetch('/api/highlights');
      if (response.ok) {
        const data = await response.json();
        setHighlights(data);
      }
    } catch (error) {
      console.error('Error fetching highlights:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHighlights = () => {
    let filtered = highlights;

    if (searchTerm) {
      filtered = filtered.filter(highlight =>
        highlight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        highlight.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(highlight => highlight.category === selectedCategory);
    }

    setFilteredHighlights(filtered);
  };

  const incrementViews = async (highlightId: string) => {
    try {
      await fetch(`/api/highlights/${highlightId}/view`, { method: 'POST' });
      setHighlights(prev => prev.map(h => 
        h._id === highlightId ? { ...h, views: h.views + 1 } : h
      ));
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleMediaClick = (highlight: Highlight) => {
    incrementViews(highlight._id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading highlights...</div>
      </div>
    );
  }

  const featuredHighlights = filteredHighlights.filter(h => h.featured);
  const regularHighlights = filteredHighlights.filter(h => !h.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Match Highlights</h1>
        <p className="text-muted-foreground text-lg">
          Relive the best moments from our tennis tournaments
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search highlights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Best Shots">Best Shots</SelectItem>
            <SelectItem value="Match Highlights">Match Highlights</SelectItem>
            <SelectItem value="Player Focus">Player Focus</SelectItem>
            <SelectItem value="Tournament Moments">Tournament Moments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Highlights */}
      {featuredHighlights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Trophy className="mr-2 text-yellow-500" />
            Featured Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHighlights.map((highlight) => (
              <Card key={highlight._id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="relative">
                    {highlight.fileType === 'video' ? (
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <video 
                          src={highlight.fileUrl}
                          className="w-full h-full object-cover"
                          onClick={() => handleMediaClick(highlight)}
                          controls
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={highlight.fileUrl}
                          alt={highlight.title}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => handleMediaClick(highlight)}
                        />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{highlight.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-3">{highlight.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(highlight.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {highlight.views} views
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="secondary">{highlight.category}</Badge>
                    {highlight.matchDetails && (
                      <span className="text-xs text-muted-foreground">
                        {highlight.matchDetails.teams}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Highlights */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Highlights</h2>
        {regularHighlights.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No highlights found</h3>
            <p className="text-muted-foreground">
              {filteredHighlights.length === 0 
                ? "No highlights match your search criteria." 
                : "Check back later for more highlights!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularHighlights.map((highlight) => (
              <Card key={highlight._id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="relative">
                    {highlight.fileType === 'video' ? (
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <video 
                          src={highlight.fileUrl}
                          className="w-full h-full object-cover"
                          onClick={() => handleMediaClick(highlight)}
                          controls
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={highlight.fileUrl}
                          alt={highlight.title}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => handleMediaClick(highlight)}
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base mb-2 line-clamp-2">{highlight.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{highlight.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(highlight.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {highlight.views}
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">{highlight.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Highlights;