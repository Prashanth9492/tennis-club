import React, { useState } from "react";
// import axios for API calls
import axios from "axios";
// ...existing code...
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Trophy, 
  Calendar, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Shield,
  BarChart3,
  Upload,
  Image,
  FileText,
  Save,
  Eye,
  User,
  LogOut
} from "lucide-react";
// Remove useCollection, we'll use RTDB listeners below
import { useToast } from "@/hooks/use-toast";
import PlayerForm from "@/components/admin/PlayerForm";
import TeamForm from "@/components/admin/TeamForm";
import NewsForm from "@/components/admin/NewsForm";

interface DashboardStats {
  totalTeams: number;
  totalPlayers: number;
  totalMatches: number;
  totalNews: number;
  totalGallery: number;
}

export default function Admin() {
  const { toast } = useToast();
  
  // State for form management (hooks must be called unconditionally)
  const [selectedFiles, setSelectedFiles] = useState<{[key: string]: File | null}>({});
  // const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  const [formData, setFormData] = useState({
    team: { name: '', coach: '', captain: '', homeGround: '', description: '' },
    player: { name: '', age: '', position: '', team: '', battingStyle: '', bowlingStyle: '', description: '' },
    match: { team1: '', team2: '', date: '', venue: '', type: 'League', status: 'Scheduled' },
    news: { title: '', content: '', category: 'General', featured: false },
    gallery: { title: '', description: '', category: 'Matches' }
  });

  // State for preview dialogs
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);
  
  // RTDB state
  const [teams, setTeams] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);
  // Listen to RTDB changes
  React.useEffect(() => {
    const listeners = [
      { path: 'teams', setter: setTeams, setLoading: setTeamsLoading },
      { path: 'players', setter: setPlayers, setLoading: setPlayersLoading },
      { path: 'matches', setter: setMatches, setLoading: setMatchesLoading },
      { path: 'news', setter: setNews, setLoading: setNewsLoading },
      { path: 'gallery', setter: setGallery, setLoading: setGalleryLoading },
    ];
    const unsubs = listeners.map(({ path, setter, setLoading }) => {
      const r = dbRef(rtdb, path);
      const cb = (snap: any) => {
        const val = snap.val();
        if (val) {
          // Convert object to array with id
          setter(Object.entries(val).map(([id, v]) => ({ id, ...v })));
        } else {
          setter([]);
        }
        setLoading(false);
      };
      onValue(r, cb);
      return () => r.off && r.off('value', cb);
    });
    return () => { unsubs.forEach(unsub => unsub()); };
  }, []);

  // Authentication checks (after all hooks are called)

  // No authentication or logout required

  // Show loading for initial data fetch (shorter timeout)
  const isInitialLoading = (teamsLoading || playersLoading || matchesLoading || newsLoading || galleryLoading) && 
    Date.now() - startTime < 1000;
  


  const stats = {
    totalTeams: teams.length,
    totalPlayers: players.length,
    totalMatches: matches.length,
    totalNews: news.length,
    totalGallery: gallery.length
  };

  // Use only real-time RTDB data for teams
  const availableTeams = teams;

  // Loading skeleton component
  const StatSkeleton = () => (
    <Card className="text-center p-6 cricket-shadow">
      <Skeleton className="h-9 w-12 mx-auto mb-2" />
      <Skeleton className="h-4 w-16 mx-auto" />
    </Card>
  );

  const FormSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );

  // Preview components
  const TeamPreview = ({ data }: { data: any }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 border rounded-lg">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
          {selectedFiles['team-logo'] ? (
            <img 
              src={URL.createObjectURL(selectedFiles['team-logo'])} 
              alt="Team Logo" 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{data.name || 'Team Name'}</h3>
          <p className="text-muted-foreground">Coach: {data.coach || 'Not specified'}</p>
          <p className="text-muted-foreground">Captain: {data.captain || 'Not specified'}</p>
          <p className="text-muted-foreground">Home Ground: {data.homeGround || 'Not specified'}</p>
        </div>
      </div>
      {data.description && (
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-muted-foreground">{data.description}</p>
        </div>
      )}
    </div>
  );

  const PlayerPreview = ({ data }: { data: any }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 border rounded-lg">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
          {selectedFiles['player-photo'] ? (
            <img 
              src={URL.createObjectURL(selectedFiles['player-photo'])} 
              alt="Player Photo" 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <User className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{data.name || 'Player Name'}</h3>
          <p className="text-muted-foreground">Age: {data.age || 'Not specified'}</p>
          <p className="text-muted-foreground">Position: {data.position || 'Not specified'}</p>
          <p className="text-muted-foreground">Team: {data.team || 'Not specified'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border rounded-lg">
          <h4 className="font-semibold">Batting Style</h4>
          <p className="text-muted-foreground">{data.battingStyle || 'Not specified'}</p>
        </div>
        <div className="p-3 border rounded-lg">
          <h4 className="font-semibold">Bowling Style</h4>
          <p className="text-muted-foreground">{data.bowlingStyle || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );

  const MatchPreview = ({ data }: { data: any }) => (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Match Preview</h3>
          <Badge variant={data.status === 'Live' ? 'destructive' : 'secondary'}>
            {data.status}
          </Badge>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-2">
            {data.team1 || 'Team 1'} vs {data.team2 || 'Team 2'}
          </h4>
          <p className="text-muted-foreground mb-1">
            {data.date ? new Date(data.date).toLocaleString() : 'Date not set'}
          </p>
          <p className="text-muted-foreground mb-2">Venue: {data.venue || 'Not specified'}</p>
          <Badge variant="outline">{data.type}</Badge>
        </div>
      </div>
    </div>
  );

  const NewsPreview = ({ data }: { data: any }) => (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <div className="flex items-start gap-4">
          {selectedFiles['news-image'] && (
            <img 
              src={URL.createObjectURL(selectedFiles['news-image'])} 
              alt="News Image" 
              className="w-32 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{data.category}</Badge>
            </div>
            <h3 className="text-xl font-bold mb-2">{data.title || 'Article Title'}</h3>
            <p className="text-muted-foreground line-clamp-3">
              {data.content || 'Article content will appear here...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const GalleryPreview = ({ data }: { data: any }) => (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{data.category}</Badge>
        </div>
        <h3 className="text-xl font-bold mb-2">{data.title || 'Gallery Title'}</h3>
        <p className="text-muted-foreground mb-4">
          {data.description || 'Gallery description will appear here...'}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(selectedFiles).filter(([key]) => key.startsWith('gallery-image')).map(([key, file]) => (
            <div key={key} className="aspect-square bg-muted rounded-lg overflow-hidden">
              {file && (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Gallery Image" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
          {Object.keys(selectedFiles).filter(key => key.startsWith('gallery-image')).length === 0 && (
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // File upload handler
  const handleFileUpload = (category: string, file: File) => {
    setSelectedFiles(prev => ({ ...prev, [category]: file }));
    toast({
      title: "File Selected",
      description: `${file.name} selected for upload`,
    });
  };

  // Trigger file input programmatically
  const triggerFileInput = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  // Handle preview dialog state
  const openPreview = (category: 'team' | 'player' | 'match' | 'news' | 'gallery') => {
    setPreviewOpen(category);
  };

  const closePreview = () => {
    setPreviewOpen(null);
  };

  // RTDB path mapping
  const collectionMap: Record<string, string> = {
    team: 'teams',
    player: 'players',
    match: 'matches',
    news: 'news',
    gallery: 'gallery',
  };

  // Form submission handlers
  const handleSubmit = async (category: keyof typeof collectionMap, data: Record<string, unknown>) => {
    try {
      let imageUrl: string | string[] | null = null;
      let fileKey: string | null = null;
      if (category === 'team' && selectedFiles['team-logo']) fileKey = 'team-logo';
      if (category === 'player' && selectedFiles['player-photo']) fileKey = 'player-photo';
      if (category === 'news' && selectedFiles['news-image']) fileKey = 'news-image';
      if (category === 'gallery') {
        // Gallery can have multiple images
        const galleryImageKeys = Object.keys(selectedFiles).filter(k => k.startsWith('gallery-image'));
        if (galleryImageKeys.length > 0) {
          const urls: string[] = [];
          for (const key of galleryImageKeys) {
            const file = selectedFiles[key];
            if (file) {
              try {
                const sRef = storageRef(storage, `gallery/${file.name}_${Date.now()}`);
                await uploadBytes(sRef, file);
                const url = await getDownloadURL(sRef);
                urls.push(url);
              } catch (uploadErr: any) {
                if (uploadErr?.message?.includes('CORS') || uploadErr?.code === 'storage/unknown') {
                  toast({
                    title: "CORS Error",
                    description: "Image upload failed due to CORS configuration. Please ensure Firebase Storage CORS is set.",
                    variant: "destructive",
                  });
                } else {
                  toast({
                    title: "Upload Error",
                    description: uploadErr?.message || "Failed to upload image.",
                    variant: "destructive",
                  });
                }
                return;
              }
            }
          }
          imageUrl = urls;
        }
      } else if (fileKey && selectedFiles[fileKey]) {
        const file = selectedFiles[fileKey];
        try {
          const sRef = storageRef(storage, `${category}/${file.name}_${Date.now()}`);
          await uploadBytes(sRef, file);
          imageUrl = await getDownloadURL(sRef);
        } catch (uploadErr: any) {
          if (uploadErr?.message?.includes('CORS') || uploadErr?.code === 'storage/unknown') {
            toast({
              title: "CORS Error",
              description: "Image upload failed due to CORS configuration. Please ensure Firebase Storage CORS is set.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Upload Error",
              description: uploadErr?.message || "Failed to upload image.",
              variant: "destructive",
            });
          }
          return;
        }
      }

      const docData: Record<string, unknown> = { ...data, createdAt: serverTimestamp() };
      if (imageUrl) {
        if (category === 'gallery') {
          docData.images = imageUrl;
        } else {
          docData.image = imageUrl;
        }
      }

      // Add to RTDB using mapped path
      const path = collectionMap[category];
      if (!path) throw new Error('Invalid category for RTDB');
      const newRef = push(dbRef(rtdb, path));
      await set(newRef, docData);

      toast({
        title: "Success!",
        description: `${category} data saved successfully`,
      });

      // Reset form
      setFormData(prev => ({
        ...prev,
        [category]: Object.keys(prev[category]).reduce((acc, key) => {
          acc[key] = '';
          return acc;
        }, {} as Record<string, string>)
      }));

      // Reset selected files
      if (category === 'gallery') {
        setSelectedFiles(prev => {
          const newFiles = { ...prev };
          Object.keys(newFiles).forEach(k => { if (k.startsWith('gallery-image')) delete newFiles[k]; });
          return newFiles;
        });
      } else {
        setSelectedFiles(prev => ({ ...prev, [fileKey || category]: null }));
      }
    } catch (error: any) {
      // Log error for debugging
      console.error('RTDB write error:', error?.message || error);
      toast({
        title: "Error",
        description: error?.message || "Failed to save data. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="p-4 border-green-200 bg-green-50">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-800">
              Admin Panel
            </p>
            <p className="text-xs text-green-700">
              You have full administrative access to manage content.
            </p>
          </div>
        </div>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage teams, players, matches, and content
          </p>
        </div>
       
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {isInitialLoading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <Card className="text-center p-6 cricket-shadow">
              <div className="text-3xl font-bold text-primary">{stats.totalTeams}</div>
              <div className="text-sm text-muted-foreground">Teams</div>
            </Card>
            <Card className="text-center p-6 cricket-shadow">
              <div className="text-3xl font-bold text-secondary">{stats.totalPlayers}</div>
              <div className="text-sm text-muted-foreground">Players</div>
            </Card>
            <Card className="text-center p-6 cricket-shadow">
              <div className="text-3xl font-bold text-accent">{stats.totalMatches}</div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </Card>
            <Card className="text-center p-6 cricket-shadow">
              <div className="text-3xl font-bold text-destructive">{stats.totalNews}</div>
              <div className="text-sm text-muted-foreground">News Articles</div>
            </Card>
            <Card className="text-center p-6 cricket-shadow">
              <div className="text-3xl font-bold text-orange-500">{stats.totalGallery}</div>
              <div className="text-sm text-muted-foreground">Gallery Items</div>
            </Card>
          </>
        )}
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Team Form */}
              {teamsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSkeleton />
                  <FormSkeleton />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input
                          id="team-name"
                          placeholder="Enter team name"
                          value={formData.team.name}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            team: { ...prev.team, name: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="team-coach">Coach Name</Label>
                        <Input
                          id="team-coach"
                          placeholder="Enter coach name"
                          value={formData.team.coach}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            team: { ...prev.team, coach: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="team-captain">Captain</Label>
                        <Input
                          id="team-captain"
                          placeholder="Enter captain name"
                          value={formData.team.captain}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            team: { ...prev.team, captain: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="team-ground">Home Ground</Label>
                        <Input
                          id="team-ground"
                          placeholder="Enter home ground"
                          value={formData.team.homeGround}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            team: { ...prev.team, homeGround: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="team-logo">Team Logo</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('team-logo', file);
                            }}
                            className="hidden"
                            id="team-logo-upload"
                          />
                          <Label 
                            htmlFor="team-logo-upload" 
                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          >
                            Choose Logo
                          </Label>
                          {selectedFiles['team-logo'] && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Selected: {selectedFiles['team-logo'].name}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="team-description">Description</Label>
                        <Textarea
                          id="team-description"
                          placeholder="Team description..."
                          rows={6}
                          value={formData.team.description}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            team: { ...prev.team, description: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSubmit('team', formData.team)} className="cricket-shadow">
                      <Save className="mr-2 h-4 w-4" />
                      Save Team
                    </Button>
                    <Dialog open={previewOpen === 'team'} onOpenChange={() => closePreview()}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => openPreview('team')}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <TeamPreview data={formData.team} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Player Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Player Form */}
              {playersLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSkeleton />
                  <FormSkeleton />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="player-name">Player Name</Label>
                        <Input
                          id="player-name"
                          placeholder="Enter player name"
                          value={formData.player.name}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            player: { ...prev.player, name: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="player-age">Age</Label>
                        <Input
                          id="player-age"
                          type="number"
                          placeholder="Enter age"
                          value={formData.player.age}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            player: { ...prev.player, age: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="player-position">Position</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          player: { ...prev.player, position: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="batsman">Batsman</SelectItem>
                            <SelectItem value="bowler">Bowler</SelectItem>
                            <SelectItem value="all-rounder">All-rounder</SelectItem>
                            <SelectItem value="wicket-keeper">Wicket Keeper</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="player-team">Team</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          player: { ...prev.player, team: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTeams?.map((team: any) => (
                              <SelectItem key={team.id} value={team.name}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="player-photo">Player Photo</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Image className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('player-photo', file);
                            }}
                            className="hidden"
                            id="player-photo-upload"
                          />
                          <Label 
                            htmlFor="player-photo-upload" 
                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          >
                            Choose Photo
                          </Label>
                          {selectedFiles['player-photo'] && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Selected: {selectedFiles['player-photo'].name}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="batting-style">Batting Style</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          player: { ...prev.player, battingStyle: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batting style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="right-handed">Right-handed</SelectItem>
                            <SelectItem value="left-handed">Left-handed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bowling-style">Bowling Style</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          player: { ...prev.player, bowlingStyle: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bowling style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fast">Fast</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="spin">Spin</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSubmit('player', formData.player)} className="cricket-shadow">
                      <Save className="mr-2 h-4 w-4" />
                      Save Player
                    </Button>
                    <Dialog open={previewOpen === 'player'} onOpenChange={() => closePreview()}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => openPreview('player')}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <PlayerPreview data={formData.player} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Match Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Match Form */}
              {matchesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSkeleton />
                  <FormSkeleton />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="match-team1">Team 1</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          match: { ...prev.match, team1: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Team 1" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTeams?.map((team: any) => (
                              <SelectItem key={team.id} value={team.name}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="match-team2">Team 2</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          match: { ...prev.match, team2: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Team 2" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTeams?.map((team: any) => (
                              <SelectItem key={team.id} value={team.name}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="match-date">Match Date</Label>
                        <Input
                          id="match-date"
                          type="datetime-local"
                          value={formData.match.date}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            match: { ...prev.match, date: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="match-venue">Venue</Label>
                        <Input
                          id="match-venue"
                          placeholder="Enter venue"
                          value={formData.match.venue}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            match: { ...prev.match, venue: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="match-type">Match Type</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          match: { ...prev.match, type: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select match type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="League">League</SelectItem>
                            <SelectItem value="Semi-Final">Semi-Final</SelectItem>
                            <SelectItem value="Final">Final</SelectItem>
                            <SelectItem value="Friendly">Friendly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="match-status">Status</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          match: { ...prev.match, status: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Live">Live</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSubmit('match', formData.match)} className="cricket-shadow">
                      <Save className="mr-2 h-4 w-4" />
                      Schedule Match
                    </Button>
                    <Dialog open={previewOpen === 'match'} onOpenChange={() => closePreview()}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => openPreview('match')}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <MatchPreview data={formData.match} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                News Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* News Form */}
              {newsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSkeleton />
                  <FormSkeleton />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="news-title">Article Title</Label>
                        <Input
                          id="news-title"
                          placeholder="Enter article title"
                          value={formData.news.title}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            news: { ...prev.news, title: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="news-category">Category</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          news: { ...prev.news, category: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Match Reports">Match Reports</SelectItem>
                            <SelectItem value="Player Spotlight">Player Spotlight</SelectItem>
                            <SelectItem value="Tournament Updates">Tournament Updates</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="news-content">Article Content</Label>
                        <Textarea
                          id="news-content"
                          placeholder="Write your article content..."
                          rows={8}
                          value={formData.news.content}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            news: { ...prev.news, content: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="news-image">Featured Image</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Image className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('news-image', file);
                            }}
                            className="hidden"
                            id="news-image-upload"
                          />
                          <Label 
                            htmlFor="news-image-upload" 
                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          >
                            Choose Image
                          </Label>
                          {selectedFiles['news-image'] && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Selected: {selectedFiles['news-image'].name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSubmit('news', formData.news)} className="cricket-shadow">
                      <Save className="mr-2 h-4 w-4" />
                      Publish Article
                    </Button>
                    <Dialog open={previewOpen === 'news'} onOpenChange={() => closePreview()}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => openPreview('news')}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <NewsPreview data={formData.news} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Gallery Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Gallery Form */}
              {galleryLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSkeleton />
                  <FormSkeleton />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gallery-title">Image Title</Label>
                        <Input
                          id="gallery-title"
                          placeholder="Enter image title"
                          value={formData.gallery.title}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            gallery: { ...prev.gallery, title: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gallery-category">Category</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          gallery: { ...prev.gallery, category: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Matches">Matches</SelectItem>
                            <SelectItem value="Training">Training</SelectItem>
                            <SelectItem value="Awards">Awards</SelectItem>
                            <SelectItem value="Events">Events</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gallery-description">Description</Label>
                        <Textarea
                          id="gallery-description"
                          placeholder="Image description..."
                          rows={4}
                          value={formData.gallery.description}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            gallery: { ...prev.gallery, description: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gallery-images">Upload Images</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              files.forEach((file, index) => {
                                handleFileUpload(`gallery-image-${index}`, file);
                              });
                            }}
                            className="hidden"
                            id="gallery-images-upload"
                          />
                          <Label 
                            htmlFor="gallery-images-upload" 
                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 py-2"
                            onClick={() => triggerFileInput('gallery-images-upload')}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Multiple Images
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Select multiple images to upload to gallery
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSubmit('gallery', formData.gallery)} className="cricket-shadow">
                      <Save className="mr-2 h-4 w-4" />
                      Upload to Gallery
                    </Button>
                    <Dialog open={previewOpen === 'gallery'} onOpenChange={() => closePreview()}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => openPreview('gallery')}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <GalleryPreview data={formData.gallery} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Tournament Configuration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span>Tournament Name</span>
                      <span className="font-medium">College Cricket Championship 2024</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span>Number of Teams</span>
                      <span className="font-medium">{stats.totalTeams}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span>Tournament Status</span>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">User Management</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span>Your Role</span>
                      <Badge variant="destructive">Administrator</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span>Account Email</span>
                      <span className="font-medium">demo@cricket.com</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Export Tournament Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}