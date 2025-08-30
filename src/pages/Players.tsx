import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Trophy, TrendingUp, Shuffle, ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor } from "lucide-react";
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
  team: string;
  matches: number;
  innings: number;
  runs: number;
  highest_score: number;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  balls_faced: number;
  outs: number;
  average: number;
  strike_rate: number;
  pinno: string;
  photoUrl?: string;
}

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('mobile');
      } else if (window.innerWidth < 1024) {
        setViewMode('tablet');
      } else {
        setViewMode('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Mobile view component
  const MobilePlayerCard = ({ player, index }: { player: Player; index: number }) => (
    <Card key={player._id} className="mb-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-gray-200 dark:border-gray-700">
              <AvatarImage 
                src={player.photoUrl ? (player.photoUrl.startsWith('http') ? player.photoUrl : `http://localhost:5001${player.photoUrl}`) : undefined} 
                alt={player.name} 
              />
              <AvatarFallback className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{player.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {getTeamLogo(player.team) && (
                  <img 
                    src={getTeamLogo(player.team)} 
                    alt={player.team} 
                    className="w-5 h-5 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">{player.team}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {player.pinno}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{player.runs}</div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">Runs</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{player.matches}</div>
            <div className="text-xs text-green-700 dark:text-green-300 mt-1">Matches</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{player.average}</div>
            <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">Average</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{player.strike_rate}</div>
            <div className="text-xs text-orange-700 dark:text-orange-300 mt-1">Strike Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.hundreds}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">100s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.fifties}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">50s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.fours}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">4s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.sixes}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">6s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Tablet view component
  const TabletPlayerCard = ({ player, index }: { player: Player; index: number }) => (
    <Card key={player._id} className="mb-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border border-gray-200 dark:border-gray-700">
              <AvatarImage 
                src={player.photoUrl ? (player.photoUrl.startsWith('http') ? player.photoUrl : `http://localhost:5001${player.photoUrl}`) : undefined} 
                alt={player.name} 
              />
              <AvatarFallback className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{player.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {getTeamLogo(player.team) && (
                  <img 
                    src={getTeamLogo(player.team)} 
                    alt={player.team} 
                    className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">{player.team}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm">
            {player.pinno}
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{player.runs}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Runs</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{player.matches}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Matches</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">{player.average}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Average</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{player.strike_rate}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Strike Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4 text-center">
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.hundreds}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">100s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.fifties}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">50s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.fours}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">4s</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{player.sixes}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">6s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
            
            {/* View Mode Toggle - Hidden on mobile */}
            {/* <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={`px-2 ${viewMode === 'mobile' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className={`px-2 ${viewMode === 'tablet' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={`px-2 ${viewMode === 'desktop' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div> */}
          </div>

          {/* Mobile View */}
          {viewMode === 'mobile' && (
            <div className="md:hidden">
              {players.map((player, index) => (
                <MobilePlayerCard key={player._id} player={player} index={index} />
              ))}
            </div>
          )}

          {/* Tablet View */}
          {viewMode === 'tablet' && (
            <div className="hidden md:grid lg:hidden grid-cols-1 gap-4">
              {players.map((player, index) => (
                <TabletPlayerCard key={player._id} player={player} index={index} />
              ))}
            </div>
          )}

          {/* Desktop View */}
          {viewMode === 'desktop' && (
            <div className="hidden lg:block relative w-full">
              {/* Left Scroll Button */}
              {showLeftScroll && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                          <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300 min-w-[80px] sticky left-0 bg-gray-100 dark:bg-gray-800 z-10 border-r border-gray-200 dark:border-gray-700">
                            PIN
                          </TableHead>
                          <TableHead className="font-semibold text-gray-700 dark:text-gray-300 min-w-[180px] sticky left-[80px] bg-gray-100 dark:bg-gray-800 z-10 border-r border-gray-200 dark:border-gray-700">
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
                              {player.pinno}
                            </TableCell>
                            <TableCell className="sticky left-[80px] bg-white dark:bg-gray-900 z-10 border-r border-gray-200 dark:border-gray-800">
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
                                {getTeamLogo(player.team) && (
                                  <img 
                                    src={getTeamLogo(player.team)} 
                                    alt={player.team} 
                                    className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                                  />
                                )}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                  {player.team}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-blue-600 dark:text-blue-400">
                              {player.runs}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.matches}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.innings}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.highest_score}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.average}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.strike_rate}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.hundreds}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.fifties}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.fours}
                            </TableCell>
                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                              {player.sixes}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Players;