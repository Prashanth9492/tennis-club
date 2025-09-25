import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, FileVideo, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Match {
  _id: string;
  team1: string;
  team2: string;
  date: string;
  tournament: string;
  status: string;
}

const HighlightsDashboard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Match Highlights',
    featured: false,
    matchId: '',
    tags: '',
    file: null as File | null
  });

    useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('/api/matches');
      if (response.ok) {
        const data = await response.json();
        const completedMatches = data.filter((match: Match) => 
          match.status === 'completed' || match.status === 'finished'
        );
        setMatches(completedMatches);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 500MB",
          variant: "destructive"
        });
        return;
      }
      
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/webm', 
                           'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Invalid file type",
          variant: "destructive"
        });
        return;
      }
      
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('file', formData.file);
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('featured', formData.featured.toString());
      
      if (formData.matchId && formData.matchId !== '') {
        submitData.append('matchId', formData.matchId);
      }
      if (formData.tags) {
        submitData.append('tags', formData.tags);
      }

      const response = await fetch('/api/highlights', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          category: 'Match Highlights',
          featured: false,
          matchId: '',
          tags: '',
          file: null
        });
        
        toast({
          title: "Success",
          description: "Highlight uploaded successfully"
        });
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload highlight",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
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
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">
        Upload Highlights
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2" />
            Upload New Highlight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter highlight title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter highlight description"
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Best Shots">Best Shots</SelectItem>
                      <SelectItem value="Match Highlights">Match Highlights</SelectItem>
                      <SelectItem value="Player Focus">Player Focus</SelectItem>
                      <SelectItem value="Tournament Moments">Tournament Moments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="match">Related Match (Optional)</Label>
                  <Select value={formData.matchId} onValueChange={(value) => handleInputChange('matchId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a completed match" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No specific match</SelectItem>
                      {matches.map((match) => (
                        <SelectItem key={match._id} value={match._id}>
                          {match.team1} vs {match.team2} - {formatDate(match.date)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">File Upload *</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept="video/*,image/*"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Max file size: 500MB. Supported formats: MP4, AVI, MOV, MKV, WebM (videos) | JPEG, PNG, GIF, WebP (images)
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Mark as Featured</Label>
                </div>
                
                {formData.file && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">File Preview:</h4>
                    <div className="flex items-center space-x-2">
                      {formData.file.type.startsWith('video/') ? (
                        <FileVideo className="w-5 h-5 text-blue-500" />
                      ) : (
                        <FileImage className="w-5 h-5 text-green-500" />
                      )}
                      <span className="text-sm">{formData.file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(formData.file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Button type="submit" disabled={uploading} className="w-full md:w-auto">
              {uploading ? 'Uploading...' : 'Upload to Highlights'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HighlightsDashboard;
