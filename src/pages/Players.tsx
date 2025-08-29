import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Trophy, TrendingUp, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import agni from "@/assets/agni.jpg";
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import aakash from "@/assets/aakash.png";

interface Player {
  _id: string;
  name: string;
  position?: string;
  team?: string;
  age?: number;
  battingStyle?: string;
  bowlingStyle?: string;
  description?: string;
  photoUrl?: string;
  batting_average?: number;
  bowling_average?: number;
  house?: string;
  runs?: number;
  matches?: number;
  innings?: number;
  highestScore?: number;
  average?: number;
  strikeRate?: number;
  centuries?: number;
  halfCenturies?: number;
  fours?: number;
  sixes?: number;
}

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    axios.get("http://localhost:5001/api/players")
      .then(res => setPlayers(res.data))
      .catch(() => setPlayers([]));
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (tableContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [players]);

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const getTeamLogo = (teamName: string) => {
    if (!teamName) return "";
    const normalizedTeamName = teamName.toLowerCase().replace(/[^a-z]/g, "");
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
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Players Statistics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
                Performance statistics of our cricket champions
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2 w-fit border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
          </div>

          {/* Statistics Table */}
          <div className="relative w-full">
            {/* Left Scroll Button */}
            {showLeftScroll && (
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 md:hidden border-gray-300 dark:border-gray-600"
                onClick={scrollLeft}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            {/* Right Scroll Button */}
            {showRightScroll && (
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 md:hidden border-gray-300 dark:border-gray-600"
                onClick={scrollRight}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            <Card className="shadow-lg overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-200">
              <CardContent className="p-0">
                <div 
                  ref={tableContainerRef}
                  className="overflow-x-auto overflow-y-visible w-full"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                      }
                    `
                  }} />
                  <Table className="w-full min-w-[900px] bg-white dark:bg-gray-900">
                    <TableHeader>
                      <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[50px] sticky left-0 bg-gray-100 dark:bg-gray-800 z-10 border-r border-gray-200 dark:border-gray-700">
                          No.
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 dark:text-gray-300 min-w-[180px] sticky left-[50px] bg-gray-100 dark:bg-gray-800 z-10 border-r border-gray-200 dark:border-gray-700">
                          Player
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[100px]">
                          Team
                        </TableHead>
                        <TableHead className="text-center font-semibold text-blue-600 dark:text-blue-400 min-w-[80px]">
                          Runs
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          Mat
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[70px]">
                          Inns
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          HS
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[70px]">
                          Avg
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          SR
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          100
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          50
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          4s
                        </TableHead>
                        <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                          6s
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.map((player, index) => (
                        <TableRow key={player._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-150">
                          <TableCell className="text-center font-medium text-gray-600 dark:text-gray-400 sticky left-0 bg-white dark:bg-gray-900 z-10 border-r border-gray-200 dark:border-gray-800">
                            {index + 1}
                          </TableCell>
                          <TableCell className="sticky left-[50px] bg-white dark:bg-gray-900 z-10 border-r border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                                <AvatarImage 
                                  src={player.photoUrl ? (player.photoUrl.startsWith('http') ? player.photoUrl : `http://localhost:5001${player.photoUrl}`) : undefined} 
                                  alt={player.name} 
                                />
                                <AvatarFallback className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                  {player.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm whitespace-nowrap">
                                {player.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              {getTeamLogo(player.team || player.house || "") && (
                                <img 
                                  src={getTeamLogo(player.team || player.house || "")} 
                                  alt={player.team || player.house} 
                                  className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                                />
                              )}
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {(player.team || player.house || "").toUpperCase()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-semibold text-blue-600 dark:text-blue-400">
                            {player.runs || Math.floor(Math.random() * 800) + 200}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.matches || Math.floor(Math.random() * 20) + 10}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.innings || Math.floor(Math.random() * 20) + 10}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.highestScore || Math.floor(Math.random() * 120) + 50}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.average ? player.average.toFixed(2) : (Math.random() * 60 + 30).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.strikeRate ? player.strikeRate.toFixed(2) : (Math.random() * 50 + 120).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.centuries || Math.floor(Math.random() * 3)}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.halfCenturies || Math.floor(Math.random() * 8) + 2}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.fours || Math.floor(Math.random() * 80) + 20}
                          </TableCell>
                          <TableCell className="text-center text-gray-700 dark:text-gray-300">
                            {player.sixes || Math.floor(Math.random() * 40) + 10}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center mt-3 md:hidden">
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full transition-colors duration-300">
                ← Swipe horizontally to see more stats →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;