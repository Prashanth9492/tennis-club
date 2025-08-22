import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import agni from "@/assets/agni.jpg";
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import aakash from "@/assets/aakash.png";

interface Match {
  _id: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  type: string;
  status: string;
  team1Logo: string;
  team2Logo: string;
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

  useEffect(() => {
    console.log("Matches data:", matches);
  }, [matches]);

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

  const getTeamLogo = (teamName: string) => {
    const normalizedTeamName = teamName.toLowerCase().replace(/-.*$/, "");
    switch (normalizedTeamName) {
      case "agni":
        return agni;
      case "prudhvi":
        return prudhvi;
      case "vayu":
        return vayu;
      case "jal":
        return jal;
      case "aakash":
        return aakash;
      default:
        return "";
    }
  };

  return (
    <div className="bg-background min-h-screen text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black dark:text-gray-100 mb-8">
          Matches
        </h1>
        {loading ? (
          <motion.div
            className="flex flex-col gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div key={i} variants={item}>
                <Skeleton className="h-32 w-full rounded-lg" />
              </motion.div>
            ))}
          </motion.div>
        ) : matches.length === 0 ? (
          <motion.p 
            className="text-center text-xl text-gray-500 dark:text-gray-300 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No upcoming fixtures found
          </motion.p>
        ) : (
          <motion.div
            className="flex flex-col gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {matches.map((match) => (
              <motion.div key={match._id} variants={item}>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-4">
                    <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                      {match.type}  {match.status}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <img
                          src={getTeamLogo(match.team1)}
                          alt={`${match.team1} logo`}
                          className="w-12 h-12 mx-auto mb-2 rounded-full object-cover"
                        />
                        <div className="font-bold text-lg text-black dark:text-gray-100">
                          {match.team1}
                        </div>
                      </div>
                      <div className="mx-4">
                        <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-100 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                          VS
                        </div>
                      </div>
                      <div className="text-center flex-1">
                        <img
                          src={getTeamLogo(match.team2)}
                          alt={`${match.team2} logo`}
                          className="w-12 h-12 mx-auto mb-2 rounded-full object-cover"
                        />
                        <div className="font-bold text-lg text-black dark:text-gray-100">
                          {match.team2}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                        <span className="text-sm">{new Date(match.date).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-300" />
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