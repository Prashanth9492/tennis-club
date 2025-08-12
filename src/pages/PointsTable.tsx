
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Team {
  _id?: string;
  team: string;
  wins: number;
  losses: number;
  draws?: number;
  matches: number;
  points: number;
  season: string;
  ranking?: number;
}



export default function PointsTable() {
  const [pointsTable, setPointsTable] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/points-table')
      .then(res => setPointsTable(res.data))
      .catch(() => setPointsTable([]))
      .finally(() => setLoading(false));
  }, []);

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


  // Group by season
  const groupedBySeason = pointsTable.reduce((acc: Record<string, Team[]>, entry) => {
    if (!acc[entry.season]) acc[entry.season] = [];
    acc[entry.season].push(entry);
    return acc;
  }, {});

  return (
    <motion.div>
      {Object.keys(groupedBySeason).length === 0 ? (
        <div className="text-center py-8">No points table data available.</div>
      ) : (
        Object.entries(groupedBySeason).map(([season, teams]) => (
          <div key={season} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Season: {season}</h2>
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
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team: Team, index: number) => (
                  <tr
                    key={team._id || team.team}
                    className={`${index + 1 <= 2 ? "bg-green-50 dark:bg-green-950/20" : ""} border-b`}
                  >
                    <TableCell className="font-bold text-lg">{index + 1}</TableCell>
                    <TableCell>{getPositionIcon(index + 1, team.ranking)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🏏</div>
                        <div>
                          <div className="font-semibold">{team.team}</div>
                          {getPositionBadge(index + 1)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">{team.matches}</TableCell>
                    <TableCell className="text-center">
                      <span className="text-green-600 font-semibold">{team.wins}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-red-600 font-semibold">{team.losses}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{calculateWinPercentage(team.wins, team.losses)}%</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-primary font-bold text-lg">{team.points}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {index + 1 <= 2 && (
                        <Badge variant="default" className="bg-green-500">Qualified</Badge>
                      )}
                      {index + 1 > 2 && index + 1 <= 4 && (
                        <Badge variant="secondary">Playoffs</Badge>
                      )}
                      {index + 1 > 4 && (
                        <Badge variant="outline">Eliminated</Badge>
                      )}
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        ))
      )}

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