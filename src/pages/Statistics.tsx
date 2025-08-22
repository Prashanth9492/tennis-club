import { useCollection } from "@/hooks/useFirebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Users, TrendingUp, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Player {
  id: string;
  name: string;
  runs: number;
  wickets: number;
  matches_played: number;
  team: string;
}

interface Team {
  id: string;
  name: string;
  wins: number;
  losses: number;
  points: number;
}

export default function Statistics() {
  const { data: players, loading: playersLoading } = useCollection('players');
  const { data: teams, loading: teamsLoading } = useCollection('teams');

  const loading = playersLoading || teamsLoading;

  // Sample statistics data
  const samplePlayers: Player[] = [
    { id: '1', name: 'Virat Kohli', runs: 8500, wickets: 4, matches_played: 150, team: 'Mumbai Warriors' },
    { id: '2', name: 'MS Dhoni', runs: 7800, wickets: 0, matches_played: 180, team: 'Chennai Eagles' },
    { id: '3', name: 'Rohit Sharma', runs: 7600, wickets: 2, matches_played: 140, team: 'Delhi Knights' },
    { id: '4', name: 'Jasprit Bumrah', runs: 450, wickets: 180, matches_played: 85, team: 'Mumbai Warriors' },
    { id: '5', name: 'Rashid Khan', runs: 800, wickets: 160, matches_played: 90, team: 'Hyderabad Hawks' },
    { id: '6', name: 'KL Rahul', runs: 6200, wickets: 0, matches_played: 120, team: 'Punjab Lions' },
    { id: '7', name: 'Yuzvendra Chahal', runs: 300, wickets: 150, matches_played: 100, team: 'Bangalore Tigers' },
    { id: '8', name: 'Shikhar Dhawan', runs: 6800, wickets: 1, matches_played: 160, team: 'Delhi Knights' }
  ];

  const sampleTeams: Team[] = [
    { id: '1', name: 'Mumbai Warriors', wins: 8, losses: 2, points: 16 },
    { id: '2', name: 'Chennai Eagles', wins: 7, losses: 3, points: 14 },
    { id: '3', name: 'Delhi Knights', wins: 6, losses: 4, points: 12 },
    { id: '4', name: 'Bangalore Tigers', wins: 6, losses: 4, points: 12 },
    { id: '5', name: 'Kolkata Panthers', wins: 5, losses: 5, points: 10 },
    { id: '6', name: 'Hyderabad Hawks', wins: 4, losses: 6, points: 8 },
    { id: '7', name: 'Punjab Lions', wins: 3, losses: 7, points: 6 },
    { id: '8', name: 'Rajasthan Royals', wins: 1, losses: 9, points: 2 }
  ];

  const displayPlayers: any[] = players.length > 0 ? players : samplePlayers;
  const displayTeams: any[] = teams.length > 0 ? teams : sampleTeams;

  const topRunScorers = [...displayPlayers].sort((a: any, b: any) => (b.runs || 0) - (a.runs || 0)).slice(0, 10);
  const topWicketTakers = [...displayPlayers].sort((a: any, b: any) => (b.wickets || 0) - (a.wickets || 0)).slice(0, 10);
  const mostExperienced = [...displayPlayers].sort((a: any, b: any) => (b.matches_played || 0) - (a.matches_played || 0)).slice(0, 10);

  const totalRuns = displayPlayers.reduce((sum: number, player: any) => sum + (player.runs || 0), 0);
  const totalWickets = displayPlayers.reduce((sum: number, player: any) => sum + (player.wickets || 0), 0);
  const totalMatches = displayTeams.reduce((sum: number, team: any) => sum + (team.wins || 0) + (team.losses || 0), 0);

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
        
        <div className="grid gap-4 md:grid-cols-4">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="text-center p-6">
              <Skeleton className="h-12 w-16 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto mt-2" />
            </Card>
          ))}
        </div>
        
        <Card className="cricket-shadow">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24 mt-1" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-12 mt-1" />
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
      className="bg-background min-h-screen text-gray-900 dark:bg-gray-900 dark:text-gray-100 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Statistics</h1>
          <p className="text-muted-foreground mt-2 dark:text-gray-300">
            Comprehensive cricket analytics and performance metrics
          </p>
        </div>
        
        <Badge className="cricket-shadow text-lg px-4 py-2">
          <Trophy className="mr-2 h-5 w-5" />
          Season 2025
        </Badge>
      </div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-4"
      >
  <Card className="text-center p-6 cricket-shadow hover-scale bg-white dark:bg-gray-800">
          <div className="text-3xl font-bold text-primary">{totalRuns.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Runs Scored</div>
        </Card>
  <Card className="text-center p-6 cricket-shadow hover-scale bg-white dark:bg-gray-800">
          <div className="text-3xl font-bold text-destructive">{totalWickets}</div>
          <div className="text-sm text-muted-foreground">Total Wickets Taken</div>
        </Card>
  <Card className="text-center p-6 cricket-shadow hover-scale bg-white dark:bg-gray-800">
          <div className="text-3xl font-bold text-secondary">{totalMatches}</div>
          <div className="text-sm text-muted-foreground">Matches Played</div>
        </Card>
  <Card className="text-center p-6 cricket-shadow hover-scale bg-white dark:bg-gray-800">
          <div className="text-3xl font-bold text-accent">{displayPlayers.length}</div>
          <div className="text-sm text-muted-foreground">Active Players</div>
        </Card>
      </motion.div>

      {/* Statistics Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="batting" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="batting">Batting</TabsTrigger>
            <TabsTrigger value="bowling">Bowling</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="batting" className="space-y-4">
            <Card className="cricket-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Top Run Scorers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRunScorers.map((player: any, index: number) => (
                    <motion.div 
                      key={player.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-scale"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-muted-foreground">{player.team}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{player.runs}</div>
                        <div className="text-sm text-muted-foreground">runs</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bowling" className="space-y-4">
            <Card className="cricket-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Wicket Takers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topWicketTakers.map((player: any, index: number) => (
                    <motion.div 
                      key={player.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-scale"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-muted-foreground">{player.team}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-destructive">{player.wickets}</div>
                        <div className="text-sm text-muted-foreground">wickets</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <Card className="cricket-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Most Experienced Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostExperienced.map((player: any, index: number) => (
                    <motion.div 
                      key={player.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-scale"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-muted-foreground">{player.team}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary">{player.matches_played}</div>
                        <div className="text-sm text-muted-foreground">matches</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="space-y-4">
            <Card className="cricket-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayTeams.map((team: any, index: number) => (
                    <motion.div 
                      key={team.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-scale"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{team.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {team.wins}W - {team.losses}L
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{team.points}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}