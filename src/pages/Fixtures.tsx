import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface Match {
  _id: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  type: string;
  status: string;
}

const Fixtures = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/matches");
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Animation variants
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

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black mb-8">
           Matches
        </h1>
        
        {loading ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div key={i} variants={item}>
                <Skeleton className="h-48 w-full rounded-lg" />
              </motion.div>
            ))}
          </motion.div>
        ) : matches.length === 0 ? (
          <motion.p 
            className="text-center text-xl text-gray-500 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No upcoming fixtures found
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {matches.map((match) => (
              <motion.div key={match._id} variants={item}>
                <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-4">
                    <div className="text-center text-sm font-medium text-gray-500">
                      {match.type} • {match.status}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <div className="font-bold text-lg text-black">
                          {match.team1}
                        </div>
                      </div>
                      
                      <div className="mx-4">
                        <div className="bg-gray-100 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
                          VS
                        </div>
                      </div>
                      
                      <div className="text-center flex-1">
                        <div className="font-bold text-lg text-black">
                          {match.team2}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{new Date(match.date).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{match.venue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;