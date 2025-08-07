import { useCollection } from "@/hooks/useFirebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Match {
  id: string;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  time: string;
  status: string;
}

export default function Fixtures() {
  const { data: matches, loading } = useCollection('matches');

  // Sample fixtures data for demonstration
  const sampleMatches: Match[] = [
    {
      id: '1',
      team1: 'Mumbai Warriors',
      team2: 'Delhi Knights',
      venue: 'Wankhede Stadium, Mumbai',
      date: '2024-01-15',
      time: '15:30',
      status: 'scheduled'
    },
    {
      id: '2', 
      team1: 'Chennai Eagles',
      team2: 'Bangalore Tigers',
      venue: 'M.A. Chidambaram Stadium, Chennai',
      date: '2024-01-16',
      time: '19:30',
      status: 'live'
    },
    {
      id: '3',
      team1: 'Kolkata Panthers',
      team2: 'Hyderabad Hawks',
      venue: 'Eden Gardens, Kolkata',
      date: '2024-01-17',
      time: '15:30',
      status: 'scheduled'
    },
    {
      id: '4',
      team1: 'Punjab Lions',
      team2: 'Rajasthan Royals',
      venue: 'PCA Stadium, Mohali',
      date: '2024-01-18',
      time: '19:30',
      status: 'scheduled'
    }
  ];

  const displayMatches = matches.length > 0 ? matches : sampleMatches;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'live':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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
        
        <div className="grid gap-4">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="cricket-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-8 mx-auto" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-48 mx-auto mt-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const liveMatches = displayMatches.filter((match: any) => match.status === 'live');
  const upcomingMatches = displayMatches.filter((match: any) => match.status === 'scheduled');
  const pastMatches = displayMatches.filter((match: any) => match.status === 'completed');

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
          <h1 className="text-3xl font-bold text-foreground">Fixtures</h1>
          <p className="text-muted-foreground mt-2">
            Complete schedule of all tournament matches
          </p>
        </div>
        
        <Button className="cricket-shadow">
          <Calendar className="mr-2 h-4 w-4" />
          Download Schedule
        </Button>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            Live Now
          </h2>
          
          <div className="grid gap-4">
            {liveMatches.map((match: any, index: number) => (
              <motion.div
                key={match.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="cricket-shadow border-red-200 dark:border-red-800 hover-scale">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={getStatusColor(match.status)}>
                        🔴 LIVE
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(match.date)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{match.team1}</h3>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">VS</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {match.time}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{match.team2}</h3>
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
      )}

      {/* Upcoming Matches */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Upcoming Matches</h2>
        
        <div className="grid gap-4">
          {upcomingMatches.map((match: any, index: number) => (
            <motion.div
              key={match.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="cricket-shadow hover-scale">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getStatusColor(match.status)}>
                      Scheduled
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(match.date)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{match.team1}</h3>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">VS</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {match.time}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{match.team2}</h3>
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