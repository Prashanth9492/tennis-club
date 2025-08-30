import React, { useState, useEffect } from "react";
// import axios for API calls
import axios from "axios";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ...existing code...


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
import AdminPlayerDashboard from "@/components/admin/AdminPlayerDashboard";

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
    player: { name: '', age: '', position: '', team: '', battingStyle: '', bowlingStyle: '', house: '', description: '' },
    match: { team1: '', team2: '', date: '', venue: '', type: 'League', status: 'Scheduled' },
    news: { title: '', content: '', category: 'General', featured: false },
    gallery: { title: '', description: '', category: 'Matches' }
  });

  // State for preview dialogs
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);
  // State for collections (MERN backend)
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

  // Points Table State
  const [pointsTable, setPointsTable] = useState<any[]>([]);
  const [pointsLoading, setPointsLoading] = useState(false);
  const [pointsError, setPointsError] = useState<string | null>(null);

  // Fetch all points table data on mount
  useEffect(() => {
    setPointsLoading(true);
    setPointsError(null);
    axios.get(import.meta.env.VITE_API_BASE_URL + "/points-table")
      .then((res) => setPointsTable(res.data))
      .catch((err) => setPointsError(err?.response?.data?.message || err?.message || "Failed to fetch points table"))
      .finally(() => setPointsLoading(false));
  }, []);

  // Group points table data by season
  const groupedBySeason = pointsTable.reduce((acc: Record<string, any[]>, entry) => {
    if (!acc[entry.season]) acc[entry.season] = [];
    acc[entry.season].push(entry);
    return acc;
  }, {});

  // Points Table UI (must be defined before return)
  const PointsTableSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Points Table Management</h2>
      {pointsLoading ? (
        <div>Loading points table...</div>
      ) : pointsError ? (
        <div className="text-red-500">{pointsError}</div>
      ) : (
        Object.keys(groupedBySeason).length === 0 ? (
          <div>No points table data found.</div>
        ) : (
          Object.entries(groupedBySeason).map(([season, teams]: [string, any[]]) => (
            <div key={season} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Season: {season}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Matches</TableHead>
                    <TableHead>Wins</TableHead>
                    <TableHead>Losses</TableHead>
                    <TableHead>Draws</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.slice(0, 5).map((team, idx) => (
                    <TableRow key={team._id || idx}>
                      <TableCell>{team.team}</TableCell>
                      <TableCell>{team.matches}</TableCell>
                      <TableCell>{team.wins}</TableCell>
                      <TableCell>{team.losses}</TableCell>
                      <TableCell>{team.draws}</TableCell>
                      <TableCell>{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        )
      )}
    </div>
  );

  // Fetch all collections from MERN backend
  React.useEffect(() => {
    setTeamsLoading(true);
    setPlayersLoading(true);
    setMatchesLoading(true);
    setNewsLoading(true);
    setGalleryLoading(true);
    Promise.all([
    axios.get(import.meta.env.VITE_API_BASE_URL + "/teams"),
    axios.get(import.meta.env.VITE_API_BASE_URL + "/players"),
    axios.get(import.meta.env.VITE_API_BASE_URL + "/matches"),
    axios.get(import.meta.env.VITE_API_BASE_URL + "/news"),
    axios.get(import.meta.env.VITE_API_BASE_URL + "/galleries"),
    ]).then(([teamsRes, playersRes, matchesRes, newsRes, galleryRes]) => {
      setTeams(teamsRes.data);
      setPlayers(playersRes.data);
      setMatches(matchesRes.data);
      setNews(newsRes.data);
      setGallery(galleryRes.data);
    }).catch((error) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Failed to fetch data from backend.",
        variant: "destructive",
      });
    }).finally(() => {
      setTeamsLoading(false);
      setPlayersLoading(false);
      setMatchesLoading(false);
      setNewsLoading(false);
      setGalleryLoading(false);
    });
    // eslint-disable-next-line
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
          {data.photoUrl ? (
            <img 
              src={data.photoUrl.startsWith('http') ? data.photoUrl : `${import.meta.env.VITE_API_BASE_URL.replace('/api','')}${data.photoUrl}`}
              alt="Player Photo" 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : selectedFiles['player-photo'] ? (
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
          {data.imageUrl ? (
            <img 
              src={data.imageUrl.startsWith('http') ? data.imageUrl : `${import.meta.env.VITE_API_BASE_URL.replace('/api','')}${data.imageUrl}`}
              alt="News Image" 
              className="w-32 h-24 object-cover rounded-lg"
            />
          ) : selectedFiles['news-image'] ? (
            <img 
              src={URL.createObjectURL(selectedFiles['news-image'])} 
              alt="News Image" 
              className="w-32 h-24 object-cover rounded-lg"
            />
          ) : null}
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
          {Array.isArray(data.imageUrls) && data.imageUrls.length > 0 ? (
            data.imageUrls.map((url: string, idx: number) => (
              <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={url}
                  alt="Gallery Image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : Object.entries(selectedFiles).filter(([key]) => key.startsWith('gallery-image')).map(([key, file]) => (
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
          {(!Array.isArray(data.imageUrls) || data.imageUrls.length === 0) && Object.keys(selectedFiles).filter(key => key.startsWith('gallery-image')).length === 0 && (
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
    gallery: 'galleries', // Use plural to match backend
  };

  // Form submission handlers
  // Form submission handlers (MERN backend)
  const handleSubmit = async (category: keyof typeof collectionMap, data: Record<string, unknown>) => {
    try {
      let formDataToSend: FormData | null = null;
        let endpoint = `${import.meta.env.VITE_API_BASE_URL}/${collectionMap[category]}`;
      // For image upload, use FormData
      if (category === 'team' && selectedFiles['team-logo']) {
        formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => formDataToSend!.append(key, value as string));
        formDataToSend.append('logo', selectedFiles['team-logo']!);
      } else if (category === 'player' && selectedFiles['player-photo']) {
        formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => formDataToSend!.append(key, value as string));
        formDataToSend.append('photo', selectedFiles['player-photo']!);
      } else if (category === 'news' && selectedFiles['news-image']) {
        formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => formDataToSend!.append(key, value as string));
        formDataToSend.append('image', selectedFiles['news-image']!);
      } else if (category === 'gallery') {
        formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => formDataToSend!.append(key, value as string));
        // Multiple images
        const galleryImageKeys = Object.keys(selectedFiles).filter(k => k.startsWith('gallery-image'));
        galleryImageKeys.forEach((key) => {
          const file = selectedFiles[key];
          if (file) formDataToSend!.append('images', file);
        });
      } else {
        // No file, just send JSON
        formDataToSend = null;
      }

      let res;
      if (formDataToSend) {
        res = await axios.post(endpoint, formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        res = await axios.post(endpoint, data);
      }

      toast({
        title: "Success!",
        description: `${category} data saved successfully`,
      });

      // Refetch all data
      // (You may want to optimize this to only fetch the relevant collection)
      const [teamsRes, playersRes, matchesRes, newsRes, galleryRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_BASE_URL + "/teams"),
          axios.get(import.meta.env.VITE_API_BASE_URL + "/players"),
          axios.get(import.meta.env.VITE_API_BASE_URL + "/matches"),
          axios.get(import.meta.env.VITE_API_BASE_URL + "/news"),
          axios.get(import.meta.env.VITE_API_BASE_URL + "/galleries"),
      ]);
      setTeams(teamsRes.data);
      setPlayers(playersRes.data);
      setMatches(matchesRes.data);
      setNews(newsRes.data);
      setGallery(galleryRes.data);

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
        setSelectedFiles(prev => ({ ...prev, [`${category}-logo`]: null, [`${category}-photo`]: null, [`${category}-image`]: null }));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Failed to save data. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="space-y-6">

  {/* Admin Panel for Uploading Data Only */}

      {/* Admin Tabs */}

      <Tabs defaultValue="points-table" className="space-y-6">

        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="points-table">Points Table</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="matches">Fixtures</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="points-table" className="space-y-4">
          <Card className="cricket-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Points Table Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Points Table Upload Form */}
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = {
                  team: formData.get('team'),
                  matches: formData.get('matches'),
                  wins: formData.get('wins'),
                  losses: formData.get('losses'),
                  draws: formData.get('draws'),
                  points: formData.get('points'),
                  season: formData.get('season'),
                };
                try {
                  await axios.post(import.meta.env.VITE_API_BASE_URL + '/points-table', data);
                  toast({ title: 'Success!', description: 'Points table entry added.' });
                  form.reset();
                } catch (error: any) {
                  toast({ title: 'Error', description: error?.response?.data?.message || error?.message || 'Failed to add entry.', variant: 'destructive' });
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team">Team</Label>
                    <Select name="team" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select house/team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agni">Agni</SelectItem>
                        <SelectItem value="aakash">Aakash</SelectItem>
                        <SelectItem value="vayu">Vayu</SelectItem>
                        <SelectItem value="jal">Jal</SelectItem>
                        <SelectItem value="prudhvi">Prudhvi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matches">Matches</Label>
                    <Input id="matches" name="matches" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wins">Wins</Label>
                    <Input id="wins" name="wins" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="losses">Losses</Label>
                    <Input id="losses" name="losses" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="draws">Draws</Label>
                    <Input id="draws" name="draws" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" name="points" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="season">Season</Label>
                    <Input id="season" name="season" placeholder="e.g. 2025" required />
                  </div>
                </div>
                <Button type="submit" className="cricket-shadow">Add Points Table Entry</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="flex justify-center">
            <h1 className="font-bold text-lg">Select where you can add data</h1>
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <AdminPlayerDashboard />
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
                            
                            <SelectItem value="agni-a">Agni A</SelectItem>
                            <SelectItem value="agni-b">Agni B</SelectItem>
                        
                            <SelectItem value="vayu-a">Vayu A</SelectItem>
                            <SelectItem value="vayu-b">Vayu B</SelectItem>
                           
                            <SelectItem value="aakash-a">Aakash A</SelectItem>
                            <SelectItem value="aakash-b">Aakash B</SelectItem>
                            
                            <SelectItem value="prudhvi-a">Prudhvi A</SelectItem>
                            <SelectItem value="prudhvi-b">Prudhvi B</SelectItem>
                         
                            <SelectItem value="jal-a">Jal A</SelectItem>
                            <SelectItem value="jal-b">Jal B</SelectItem>
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
                          {/* 5 teams only */}
  <SelectItem value="agni-a">Agni A</SelectItem>
                            <SelectItem value="agni-b">Agni B</SelectItem>
                        
                            <SelectItem value="vayu-a">Vayu A</SelectItem>
                            <SelectItem value="vayu-b">Vayu B</SelectItem>
                           
                            <SelectItem value="aakash-a">Aakash A</SelectItem>
                            <SelectItem value="aakash-b">Aakash B</SelectItem>
                            
                            <SelectItem value="prudhvi-a">Prudhvi A</SelectItem>
                            <SelectItem value="prudhvi-b">Prudhvi B</SelectItem>
                         
                            <SelectItem value="jal-a">Jal A</SelectItem>
                            <SelectItem value="jal-b">Jal B</SelectItem>
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

