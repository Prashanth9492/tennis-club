import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Trophy, Calendar, Users, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import agni from "@/assets/agni.jpg";
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import aakash from "@/assets/aakash.png";

interface TennisMatch {
  _id: string;
  matchId: string;
  title: string;
  player1: string;
  player2: string;
  player1Partner?: string;
  player2Partner?: string;
  court: string;
  venue: string;
  matchDate: string;
  matchType: string; // Singles, Doubles, Mixed_Doubles
  status: string; // scheduled, live, completed, etc.
  format: {
    bestOf: number;
    tiebreakAt: number;
    finalSetTiebreak: boolean;
  };
  sets: any[];
  result?: {
    winner: string;
    winBy: string;
    finalScore: string;
    matchDuration: string;
  };
  isLive: boolean;
  currentSet?: number;
  currentGame?: number;
}

const TennisFixtures = () => {
  const [matches, setMatches] = useState<TennisMatch[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<TennisMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [tournamentFilter, setTournamentFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        console.log('Fetching from URL:', `${import.meta.env.VITE_API_BASE_URL}/matches`);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/matches`);
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Raw API data:', data);
        
        // Filter only tennis matches and map the data
        const tennisMatches = data
          .filter((match: any) => ['Singles', 'Doubles', 'Mixed_Doubles'].includes(match.matchType))
          .map((match: any) => ({
            _id: match._id,
            matchId: match.matchId,
            title: match.title,
            player1: match.player1,
            player2: match.player2,
            player1Partner: match.player1Partner,
            player2Partner: match.player2Partner,
            court: match.court,
            venue: match.venue,
            matchDate: match.matchDate,
            matchType: match.matchType,
            status: match.status,
            format: match.format,
            sets: match.sets || [],
            result: match.result,
            isLive: match.isLive,
            currentSet: match.currentSet,
            currentGame: match.currentGame
          }));
        
        console.log('Filtered tennis matches:', tennisMatches);
        setMatches(tennisMatches);
        setFilteredMatches(tennisMatches);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        // Use mock data if API fails
        console.log('Using mock data due to API error');
        setMatches(mockTennisMatches);
        setFilteredMatches(mockTennisMatches);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Helper functions to transform data
  const getTennisCategory = (type: string) => {
    const categories = ['Men\'s Singles', 'Women\'s Singles', 'Men\'s Doubles', 'Women\'s Doubles', 'Mixed Doubles'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const getTennisRound = (type: string) => {
    const rounds = ['First Round', 'Second Round', 'Quarter-final', 'Semi-final', 'Final'];
    return rounds[Math.floor(Math.random() * rounds.length)];
  };

  const getTournament = (team: string) => {
    return team?.split('-')[0] || 'AGNI';
  };

  const getCourtFromVenue = (venue: string) => {
    return venue.replace('Stadium', 'Court').replace('Arena', 'Court').replace('Ground', 'Court');
  };

  // Mock tennis data for better demonstration
  const mockTennisMatches: TennisMatch[] = [
    {
      _id: '1',
      matchId: 'TM001',
      title: 'Rajesh Kumar vs Amit Sharma',
      player1: 'Rajesh Kumar',
      player2: 'Amit Sharma',
      court: 'Court 1',
      venue: 'Central Tennis Court',
      matchDate: '2025-01-15T09:00:00Z',
      matchType: 'Singles',
      status: 'upcoming',
      format: {
        bestOf: 3,
        tiebreakAt: 6,
        finalSetTiebreak: true
      },
      sets: [],
      isLive: false
    },
    {
      _id: '2',
      matchId: 'TM002',
      title: 'Priya Patel vs Sneha Reddy',
      player1: 'Priya Patel',
      player2: 'Sneha Reddy',
      court: 'Court 2',
      venue: 'Sky Tennis Academy',
      matchDate: '2025-01-15T11:00:00Z',
      matchType: 'Singles',
      status: 'live',
      format: {
        bestOf: 3,
        tiebreakAt: 6,
        finalSetTiebreak: true
      },
      sets: [],
      isLive: true,
      currentSet: 2,
      currentGame: 4
    },
    {
      _id: '3',
      matchId: 'TM003',
      title: 'Karan & Arjun vs Dev & Rohit',
      player1: 'Karan',
      player2: 'Dev',
      player1Partner: 'Arjun',
      player2Partner: 'Rohit',
      court: 'Center Court',
      venue: 'Wind Court Complex',
      matchDate: '2025-01-16T16:00:00Z',
      matchType: 'Doubles',
      status: 'completed',
      format: {
        bestOf: 3,
        tiebreakAt: 6,
        finalSetTiebreak: true
      },
      sets: [],
      result: {
        winner: 'Karan & Arjun',
        winBy: '2-1',
        finalScore: '6-4, 3-6, 6-2',
        matchDuration: '2h 15m'
      },
      isLive: false
    },
    {
      _id: '4',
      matchId: 'TM004',
      title: 'Maya & Alex vs Ravi & Sita',
      player1: 'Maya',
      player2: 'Ravi',
      player1Partner: 'Alex',
      player2Partner: 'Sita',
      court: 'Court 3',
      venue: 'Waterfront Tennis Club',
      matchDate: '2025-01-17T14:30:00Z',
      matchType: 'Mixed_Doubles',
      status: 'upcoming',
      format: {
        bestOf: 3,
        tiebreakAt: 6,
        finalSetTiebreak: true
      },
      sets: [],
      isLive: false
    }
  ];

  // Apply filters
  useEffect(() => {
    let filtered = matches;

    if (categoryFilter) {
      filtered = filtered.filter(match => match.matchType === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(match => match.status === statusFilter);
    }

    if (tournamentFilter) {
      filtered = filtered.filter(match => match.venue.includes(tournamentFilter));
    }

    if (search) {
      filtered = filtered.filter(match =>
        match.player1.toLowerCase().includes(search.toLowerCase()) ||
        match.player2.toLowerCase().includes(search.toLowerCase()) ||
        match.venue.toLowerCase().includes(search.toLowerCase()) ||
        match.matchType.toLowerCase().includes(search.toLowerCase()) ||
        match.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMatches(filtered);
  }, [matches, categoryFilter, statusFilter, tournamentFilter, search]);

  const getPlayerAvatar = (playerName: string) => {
    // Generate a color based on the player name for consistent avatars
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#06b6d4', '#8b5cf6', '#f59e0b'];
    const index = playerName.length % colors.length;
    return colors[index];
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live': return 'bg-red-500 animate-pulse';
      case 'completed': return 'bg-green-500';
      case 'upcoming': 
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTournamentLogo = (tournament: string) => {
    const logos = {
      'AGNI': agni,
      'AAKASH': aakash,
      'VAYU': vayu,
      'JAL': jal,
      'PRUDHVI': prudhvi
    };
    return logos[tournament] || agni;
  };

  // Get filter options
  const categoryOptions = Array.from(new Set(matches.map(m => m.matchType)));
  const statusOptions = Array.from(new Set(matches.map(m => m.status)));
  const tournamentOptions = Array.from(new Set(matches.map(m => {
    // Extract tournament/venue name for filtering
    const venueWords = m.venue.split(' ');
    return venueWords[venueWords.length - 1] === 'Court' ? venueWords.slice(0, -1).join(' ') : m.venue;
  })));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-80" />
            <div className="grid gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tennis Match Schedule
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upcoming matches, live scores, and results from the Bhimavaram Open Tennis Tournament
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search players, venues..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoryOptions.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tournament</label>
                <Select value={tournamentFilter || "all"} onValueChange={(value) => setTournamentFilter(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Tournaments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tournaments</SelectItem>
                    {tournamentOptions.map(tournament => (
                      <SelectItem key={tournament} value={tournament}>{tournament}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCategoryFilter("");
                    setStatusFilter("");
                    setTournamentFilter("");
                    setSearch("");
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Active filters display */}
            {(categoryFilter || statusFilter || tournamentFilter || search) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {categoryFilter && (
                  <Badge variant="secondary">Category: {categoryFilter}</Badge>
                )}
                {statusFilter && (
                  <Badge variant="secondary">Status: {statusFilter}</Badge>
                )}
                {tournamentFilter && (
                  <Badge variant="secondary">Tournament: {tournamentFilter}</Badge>
                )}
                {search && (
                  <Badge variant="secondary">Search: "{search}"</Badge>
                )}
                <span className="text-green-600 font-medium">
                  Showing {filteredMatches.length} of {matches.length} matches
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Matches Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {filteredMatches.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No matches found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredMatches.map((match) => (
              <motion.div key={match._id} variants={item}>
                <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Match Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {match.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(match.matchDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(match.matchDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {match.court}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Players */}
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: getPlayerAvatar(match.player1) }}
                            >
                              {match.player1.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {match.player1}{match.player1Partner ? ` & ${match.player1Partner}` : ''}
                              </div>
                              <div className="text-sm text-gray-500">
                                {match.matchType}
                              </div>
                            </div>
                          </div>

                          <div className="text-center px-4">
                            <Badge 
                              className={`${getStatusColor(match.status)} text-white px-3 py-1`}
                            >
                              {match.status}
                            </Badge>
                            {match.result?.finalScore && (
                              <div className="text-sm text-gray-600 mt-1">{match.result.finalScore}</div>
                            )}
                            {match.isLive && match.currentSet && match.currentGame && (
                              <div className="text-sm text-blue-600 mt-1">Set {match.currentSet}, Game {match.currentGame}</div>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {match.player2}{match.player2Partner ? ` & ${match.player2Partner}` : ''}
                              </div>
                              <div className="text-sm text-gray-500">
                                {match.matchType}
                              </div>
                            </div>
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: getPlayerAvatar(match.player2) }}
                            >
                              {match.player2.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                        </div>

                        {/* Venue Info */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4" />
                            <span>{match.venue}</span>
                          </div>
                          <Badge variant="outline">
                            {match.matchType} Championship
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Summary Stats */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {matches.filter(m => m.status === 'Upcoming').length}
                </div>
                <div className="text-sm text-gray-600">Upcoming Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {matches.filter(m => m.status === 'Live').length}
                </div>
                <div className="text-sm text-gray-600">Live Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {matches.filter(m => m.status === 'Completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {categoryOptions.length}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TennisFixtures;