import { useCollection } from "@/hooks/useFirebase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Trophy, Play, Pause } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Match {
  id: string;
  team1: string;
  team2: string;
  team1_score?: string;
  team2_score?: string;
  venue: string;
  date: string;
  status: string;
  winner?: string;
}

export default function LiveScores() {
  const { data: matches, loading } = useCollection('matches');

  // Sample live scores data
  const sampleMatches: Match[] = [
    {
      id: '1',
      team1: 'Mumbai Warriors',
      team2: 'Delhi Knights',
      team1_score: '185/4 (18.2)',
      team2_score: '120/8 (15.0)',
      venue: 'Wankhede Stadium, Mumbai',
      date: new Date().toISOString(),
      status: 'live'
    },
    {
      id: '2',
      team1: 'Chennai Eagles',
      team2: 'Bangalore Tigers',
      team1_score: '201/6 (20.0)',
      team2_score: '198/9 (20.0)',
      venue: 'M.A. Chidambaram Stadium',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
      winner: 'Chennai Eagles'
    },
    {
      id: '3',
      team1: 'Kolkata Panthers',
      team2: 'Hyderabad Hawks',
      venue: 'Eden Gardens, Kolkata',
      date: new Date(Date.now() + 86400000).toISOString(),
      status: 'scheduled'
    }
  ];

  const displayMatches = matches.length > 0 ? matches : sampleMatches;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          {[1,2,3].map((i) => (
            <Card key={i} className="cricket-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardHeader>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <Skeleton className="h-6 w-24 mx-auto" />
                    <Skeleton className="h-8 w-20 mx-auto mt-2" />
                  </div>
                  <Skeleton className="h-6 w-8 mx-auto" />
                  <div className="text-center">
                    <Skeleton className="h-6 w-24 mx-auto" />
                    <Skeleton className="h-8 w-20 mx-auto mt-2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const liveMatches = displayMatches.filter((match: any) => match.status === 'live');
  const otherMatches = displayMatches.filter((match: any) => match.status !== 'live');

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
          <h1 className="text-3xl font-bold text-foreground">Live Scores</h1>
          <p className="text-muted-foreground mt-2">
            Real-time match updates and scores
          </p>
        </div>
        
        <Button className="cricket-shadow">
          <Trophy className="mr-2 h-4 w-4" />
          Tournament Bracket
        </Button>
      </div>

      {/* Live Matches */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Current Matches</h2>
        
        {liveMatches.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <Pause className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Live Matches</h3>
              <p>Check back later for live cricket action!</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {liveMatches.map((match: any, index: number) => (
              <motion.div
                key={match.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="cricket-shadow border-red-200 dark:border-red-800 hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(match.status)}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {match.venue}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{match.team1}</h3>
                        <div className="text-2xl font-bold text-primary mt-2">
                          {match.team1_score || '0/0'}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">VS</div>
                        <Play className="h-6 w-6 mx-auto mt-1 text-red-500" />
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{match.team2}</h3>
                        <div className="text-2xl font-bold text-primary mt-2">
                          {match.team2_score || '0/0'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent & Upcoming Matches */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Recent & Upcoming</h2>
        
        <div className="grid gap-4">
          {otherMatches.map((match: any, index: number) => (
            <motion.div
              key={match.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="cricket-shadow hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(match.status)}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatDate(match.date)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-center">
                      <h3 className="font-semibold">{match.team1}</h3>
                      {match.team1_score && (
                        <div className="text-lg font-bold text-primary mt-2">
                          {match.team1_score}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">VS</div>
                      {match.winner && (
                        <div className="text-xs text-green-600 mt-1">
                          Winner: {match.winner}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold">{match.team2}</h3>
                      {match.team2_score && (
                        <div className="text-lg font-bold text-primary mt-2">
                          {match.team2_score}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {match.venue}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}