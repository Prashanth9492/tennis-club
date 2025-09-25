import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Star, Medal, Award, TrendingUp, TrendingDown, Minus, Crown, Target } from "lucide-react";
import { motion } from "framer-motion";
import agni from "@/assets/agni.jpg";
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import aakash from "@/assets/aakash.png";

interface TennisRanking {
  _id: string;
  player_name: string;
  tournament: string;
  category: string; // Men's Singles, Women's Singles, etc.
  current_ranking: number;
  previous_ranking?: number;
  points: number;
  matches_won: number;
  matches_lost: number;
  sets_won: number;
  sets_lost: number;
  win_percentage: number;
  best_ranking: number;
  ranking_points: number;
  weeks_at_current_rank: number;
  profile_pic?: string;
}

interface TournamentRanking {
  tournament: string;
  logo: string;
  total_points: number;
  players_count: number;
  average_ranking: number;
  championship_points: number;
  rank_change: number;
}

const TennisRankings = () => {
  const [rankings, setRankings] = useState<TennisRanking[]>([]);
  const [tournamentRankings, setTournamentRankings] = useState<TournamentRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("Men's Singles");

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players`);
        const data = await res.json();
        
        // Transform cricket data to tennis rankings format
        const tennisRankings = data.map((player: any, index: number) => ({
          _id: player._id,
          player_name: player.name,
          tournament: player.team || getTournamentByIndex(index),
          category: getCategoryByIndex(index),
          current_ranking: index + 1,
          previous_ranking: index + Math.floor(Math.random() * 3) - 1,
          points: 1500 - (index * 50) + Math.floor(Math.random() * 100),
          matches_won: Math.floor(Math.random() * 25) + 10,
          matches_lost: Math.floor(Math.random() * 10) + 2,
          sets_won: Math.floor(Math.random() * 60) + 30,
          sets_lost: Math.floor(Math.random() * 30) + 10,
          win_percentage: parseFloat((Math.random() * 30 + 70).toFixed(1)),
          best_ranking: Math.max(1, index - Math.floor(Math.random() * 5)),
          ranking_points: 1500 - (index * 50),
          weeks_at_current_rank: Math.floor(Math.random() * 20) + 1,
          profile_pic: player.profile_pic
        }));
        
        setRankings(tennisRankings);
        
        // Generate tournament rankings
        const tournaments = ['AGNI', 'AAKASH', 'VAYU', 'JAL', 'PRUDHVI'];
        const tournamentData = tournaments.map((tournament, index) => ({
          tournament,
          logo: getTournamentLogo(tournament),
          total_points: Math.floor(Math.random() * 5000) + 3000,
          players_count: Math.floor(Math.random() * 10) + 15,
          average_ranking: parseFloat((Math.random() * 20 + 10).toFixed(1)),
          championship_points: Math.floor(Math.random() * 1000) + 500,
          rank_change: Math.floor(Math.random() * 6) - 3
        }));
        
        setTournamentRankings(tournamentData.sort((a, b) => b.total_points - a.total_points));
        
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
        // Use mock data
        setRankings(mockRankings);
        setTournamentRankings(mockTournamentRankings);
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

  // Helper functions
  const getTournamentByIndex = (index: number) => {
    const tournaments = ['AGNI', 'AAKASH', 'VAYU', 'JAL', 'PRUDHVI'];
    return tournaments[index % tournaments.length];
  };

  const getCategoryByIndex = (index: number) => {
    const categories = ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"];
    return categories[index % categories.length];
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

  // Mock data
  const mockRankings: TennisRanking[] = [
    {
      _id: '1',
      player_name: 'Rajesh Kumar',
      tournament: 'AGNI',
      category: "Men's Singles",
      current_ranking: 1,
      previous_ranking: 2,
      points: 1500,
      matches_won: 25,
      matches_lost: 3,
      sets_won: 58,
      sets_lost: 12,
      win_percentage: 89.3,
      best_ranking: 1,
      ranking_points: 1500,
      weeks_at_current_rank: 8
    },
    {
      _id: '2',
      player_name: 'Priya Patel',
      tournament: 'AAKASH',
      category: "Women's Singles",
      current_ranking: 1,
      previous_ranking: 1,
      points: 1450,
      matches_won: 22,
      matches_lost: 4,
      sets_won: 52,
      sets_lost: 15,
      win_percentage: 84.6,
      best_ranking: 1,
      ranking_points: 1450,
      weeks_at_current_rank: 12
    }
  ];

  const mockTournamentRankings: TournamentRanking[] = [
    {
      tournament: 'VAYU',
      logo: vayu,
      total_points: 4500,
      players_count: 20,
      average_ranking: 12.5,
      championship_points: 800,
      rank_change: 1
    },
    {
      tournament: 'AGNI',
      logo: agni,
      total_points: 4200,
      players_count: 18,
      average_ranking: 15.2,
      championship_points: 750,
      rank_change: -1
    }
  ];

  const getRankingChange = (current: number, previous?: number) => {
    if (!previous) return { icon: <Minus className="h-4 w-4 text-gray-400" />, text: "New", color: "text-gray-400" };
    
    if (current < previous) {
      return { 
        icon: <TrendingUp className="h-4 w-4 text-green-500" />, 
        text: `+${previous - current}`, 
        color: "text-green-500" 
      };
    } else if (current > previous) {
      return { 
        icon: <TrendingDown className="h-4 w-4 text-red-500" />, 
        text: `-${current - previous}`, 
        color: "text-red-500" 
      };
    }
    return { icon: <Minus className="h-4 w-4 text-gray-400" />, text: "0", color: "text-gray-400" };
  };

  const getFilteredRankings = () => {
    return rankings
      .filter(ranking => ranking.category === categoryFilter)
      .sort((a, b) => a.current_ranking - b.current_ranking);
  };

  const getCategoryOptions = () => {
    return Array.from(new Set(rankings.map(r => r.category)));
  };

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
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
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
            Tennis Rankings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Official Bhimavaram Open Tennis Tournament rankings and leaderboards
          </p>
        </motion.div>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="players">Player Rankings</TabsTrigger>
            <TabsTrigger value="tournaments">Tournament Standings</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Category Filter</h3>
                    <p className="text-sm text-gray-600">Select a category to view rankings</p>
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoryOptions().map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Player Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {categoryFilter} Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-center">Points</TableHead>
                        <TableHead className="text-center">Matches (W-L)</TableHead>
                        <TableHead className="text-center">Sets (W-L)</TableHead>
                        <TableHead className="text-center">Win %</TableHead>
                        <TableHead className="text-center">Best Rank</TableHead>
                        <TableHead className="text-center">Weeks at Rank</TableHead>
                        <TableHead className="text-center">Movement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredRankings().map((ranking, index) => {
                        const change = getRankingChange(ranking.current_ranking, ranking.previous_ranking);
                        return (
                          <motion.tr
                            key={ranking._id}
                            variants={item}
                            initial="hidden"
                            animate="show"
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  index === 0 ? 'bg-yellow-500 text-white' :
                                  index === 1 ? 'bg-gray-400 text-white' :
                                  index === 2 ? 'bg-amber-600 text-white' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {ranking.current_ranking}
                                </div>
                                {index < 3 && (
                                  <Crown className={`h-4 w-4 ${
                                    index === 0 ? 'text-yellow-500' :
                                    index === 1 ? 'text-gray-400' :
                                    'text-amber-600'
                                  }`} />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {ranking.profile_pic ? (
                                  <img 
                                    src={ranking.profile_pic} 
                                    alt={ranking.player_name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                    {ranking.player_name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold">{ranking.player_name}</div>
                                  <div className="text-sm text-gray-500 flex items-center gap-1">
                                    <img 
                                      src={getTournamentLogo(ranking.tournament)} 
                                      alt={ranking.tournament}
                                      className="w-4 h-4 rounded-full"
                                    />
                                    {ranking.tournament}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="font-bold text-lg">{ranking.ranking_points}</div>
                              <div className="text-xs text-gray-500">points</div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="font-semibold">{ranking.matches_won}-{ranking.matches_lost}</div>
                              <div className="text-xs text-gray-500">
                                {ranking.matches_won + ranking.matches_lost} total
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="font-semibold">{ranking.sets_won}-{ranking.sets_lost}</div>
                              <div className="text-xs text-gray-500">
                                {ranking.sets_won + ranking.sets_lost} total
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={ranking.win_percentage >= 80 ? "default" : "secondary"}
                                className={ranking.win_percentage >= 80 ? 'bg-green-600' : ''}
                              >
                                {ranking.win_percentage}%
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                {ranking.best_ranking}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="font-semibold">{ranking.weeks_at_current_rank}</div>
                              <div className="text-xs text-gray-500">weeks</div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className={`flex items-center justify-center gap-1 ${change.color}`}>
                                {change.icon}
                                <span className="text-sm font-semibold">{change.text}</span>
                              </div>
                            </TableCell>
                          </motion.tr>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-6">
            {/* Tournament Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-purple-500" />
                  Tournament Standings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {tournamentRankings.map((tournament, index) => (
                    <motion.div key={tournament.tournament} variants={item}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img 
                                  src={tournament.logo} 
                                  alt={tournament.tournament}
                                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
                                />
                                <Badge 
                                  className={`absolute -top-2 -right-2 ${
                                    index === 0 ? 'bg-yellow-500' :
                                    index === 1 ? 'bg-gray-400' :
                                    index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                                  } text-white`}
                                >
                                  #{index + 1}
                                </Badge>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{tournament.tournament}</h3>
                                <p className="text-gray-600">{tournament.players_count} active players</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-6 text-center">
                              <div>
                                <div className="text-2xl font-bold text-blue-600">
                                  {tournament.total_points}
                                </div>
                                <div className="text-sm text-gray-600">Total Points</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-green-600">
                                  {tournament.average_ranking}
                                </div>
                                <div className="text-sm text-gray-600">Avg Ranking</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-purple-600">
                                  {tournament.championship_points}
                                </div>
                                <div className="text-sm text-gray-600">Championship Points</div>
                              </div>
                              <div>
                                <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                                  tournament.rank_change > 0 ? 'text-green-500' :
                                  tournament.rank_change < 0 ? 'text-red-500' : 'text-gray-500'
                                }`}>
                                  {tournament.rank_change > 0 ? (
                                    <TrendingUp className="h-6 w-6" />
                                  ) : tournament.rank_change < 0 ? (
                                    <TrendingDown className="h-6 w-6" />
                                  ) : (
                                    <Minus className="h-6 w-6" />
                                  )}
                                  {Math.abs(tournament.rank_change)}
                                </div>
                                <div className="text-sm text-gray-600">Rank Change</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TennisRankings;