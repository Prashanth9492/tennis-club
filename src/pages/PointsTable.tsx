import { useCollection } from "@/hooks/useFirebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Team {
  id: string;
  name: string;
  wins: number;
  losses: number;
  points: number;
  ranking?: number;
}

export default function PointsTable() {
  const { data: teams, loading } = useCollection('teams');

  // Sample points table data
  const sampleTeams: Team[] = [
    { id: '1', name: 'Mumbai Warriors', wins: 8, losses: 2, points: 16, ranking: 2 },
    { id: '2', name: 'Chennai Eagles', wins: 7, losses: 3, points: 14, ranking: 1 },
    { id: '3', name: 'Delhi Knights', wins: 6, losses: 4, points: 12, ranking: 4 },
    { id: '4', name: 'Bangalore Tigers', wins: 6, losses: 4, points: 12, ranking: 3 },
    { id: '5', name: 'Kolkata Panthers', wins: 5, losses: 5, points: 10, ranking: 5 },
    { id: '6', name: 'Hyderabad Hawks', wins: 4, losses: 6, points: 8, ranking: 6 },
    { id: '7', name: 'Punjab Lions', wins: 3, losses: 7, points: 6, ranking: 7 },
    { id: '8', name: 'Rajasthan Royals', wins: 1, losses: 9, points: 2, ranking: 8 }
  ];

  const displayTeams = teams.length > 0 ? teams : sampleTeams;

  const calculateWinPercentage = (wins: number, losses: number) => {
    const total = wins + losses;
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  };

  const getPositionIcon = (currentPosition: number, ranking?: number) => {
    if (!ranking) return <Minus className="h-4 w-4 text-muted-foreground" />;
    
    if (currentPosition < ranking) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (currentPosition > ranking) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return <Badge className="bg-yellow-500 text-yellow-900">🥇 Champion</Badge>;
    } else if (position === 2) {
      return <Badge className="bg-gray-400 text-gray-900">🥈 Runner-up</Badge>;
    } else if (position === 3) {
      return <Badge className="bg-amber-600 text-amber-100">🥉 3rd Place</Badge>;
    } else if (position <= 4) {
      return <Badge variant="secondary">Playoffs</Badge>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        
        <Card className="cricket-shadow">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-6">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
          <h1 className="text-3xl font-bold text-foreground">Points Table</h1>
          <p className="text-muted-foreground mt-2">
            Current tournament standings and team rankings
          </p>
        </div>
        
        <Badge className="cricket-shadow text-lg px-4 py-2">
          <Trophy className="mr-2 h-5 w-5" />
          Season 2024
        </Badge>
      </div>

      {/* Points Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="cricket-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Tournament Standings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Pos</TableHead>
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Played</TableHead>
                    <TableHead className="text-center">Won</TableHead>
                    <TableHead className="text-center">Lost</TableHead>
                    <TableHead className="text-center">Win%</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayTeams.map((team: any, index: number) => {
                    const position = index + 1;
                    const totalMatches = team.wins + team.losses;
                    const winPercentage = calculateWinPercentage(team.wins, team.losses);
                    
                    return (
                      <motion.tr 
                        key={team.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * index }}
                        className={`${position <= 2 ? "bg-green-50 dark:bg-green-950/20" : ""} border-b`}
                      >
                        <TableCell className="font-bold text-lg">
                          {position}
                        </TableCell>
                        <TableCell>
                          {getPositionIcon(position, team.ranking)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">🏏</div>
                            <div>
                              <div className="font-semibold">{team.name}</div>
                              {getPositionBadge(position)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {totalMatches}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-green-600 font-semibold">{team.wins}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-red-600 font-semibold">{team.losses}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{winPercentage}%</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-primary font-bold text-lg">{team.points}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          {position <= 2 && (
                            <Badge variant="default" className="bg-green-500">
                              Qualified
                            </Badge>
                          )}
                          {position > 2 && position <= 4 && (
                            <Badge variant="secondary">
                              Playoffs
                            </Badge>
                          )}
                          {position > 4 && (
                            <Badge variant="outline">
                              Eliminated
                            </Badge>
                          )}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="cricket-shadow">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Tournament Format</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Top 2 teams qualify for Final</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Teams 3-4 playoff for 3rd place</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">Position improved</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-sm">Position dropped</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Points System</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Win: 2 points</li>
                <li>• Loss: 0 points</li>
                <li>• Teams ranked by points, then by win percentage</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}