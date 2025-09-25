import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Trophy, Target, TrendingUp, Calendar, MapPin, Users, Medal } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import agni from "@/assets/agni.jpg";
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import aakash from "@/assets/aakash.png";

interface TennisPlayer {
  _id: string;
  name: string;
  team: string;
  matches_played: number;
  matches_won: number;
  matches_lost: number;
  sets_won: number;
  sets_lost: number;
  games_won: number;
  games_lost: number;
  win_percentage: number;
  current_ranking: number;
  best_ranking?: number;
  pinno: string;
  photoUrl?: string;
  category?: string;
  playingStyle?: string;
  dominantHand?: string;
}

interface Match {
  _id: string;
  matchId?: string;
  player1: string;
  player2: string;
  player1Partner?: string;
  player2Partner?: string;
  team1?: string;
  team2?: string;
  court?: string;
  venue?: string;
  matchDate: string;
  matchType: string;
  status: string;
  result?: {
    winner: string;
    finalScore: string;
    winBy: string;
  };
  title?: string;
}

const PlayerProfile = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<TennisPlayer | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        
        // Fetch player details
        const playerResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/players/${playerId}`);
        setPlayer(playerResponse.data);

        // Fetch player matches
        const matchesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/matches/player/${playerId}`);
        setMatches(matchesResponse.data);
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerData();
    }
  }, [playerId]);

  const getTeamLogo = (teamName: string) => {
    if (!teamName) return "";
    const houseName = teamName.split('-')[0].toLowerCase();
    switch (houseName) {
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

  const getTeamColor = (team: string) => {
    if (!team) return '#666';
    const houseName = team.split('-')[0];
    const teamColors = {
      'AGNI': '#FF4444',
      'AAKASH': '#4444FF',
      'VAYU': '#44FF44',
      'JAL': '#f18f20ff',
      'PRUDHVI': '#FF44FF'
    };
    return teamColors[houseName.toUpperCase() as keyof typeof teamColors] || '#666';
  };

  const formatMatchResult = (match: Match, playerName: string) => {
    const isWinner = match.result?.winner === playerName;
    const opponent = match.player1 === playerName ? match.player2 : match.player1;
    const opponentTeam = match.team1 === player?.team ? match.team2 : match.team1;
    
    return {
      opponent,
      opponentTeam,
      isWinner,
      score: match.result?.finalScore || match.result?.winBy || 'N/A',
      matchType: match.matchType
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading player profile...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Player Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested player profile could not be found.</p>
          <Button onClick={() => navigate('/players')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Players
          </Button>
        </div>
      </div>
    );
  }

  const singlesMatches = matches.filter(match => match.matchType === 'Singles' || match.matchType === 'singles');
  const doublesMatches = matches.filter(match => match.matchType === 'Doubles' || match.matchType === 'doubles');

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/players')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Players
        </Button>
        <h1 className="text-3xl font-bold">Player Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player Info Card */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage 
                    src={player.photoUrl ? (player.photoUrl.startsWith('http') ? player.photoUrl : `http://localhost:5000${player.photoUrl}`) : undefined} 
                    alt={player.name} 
                  />
                  <AvatarFallback 
                    className="text-3xl font-bold"
                    style={{ backgroundColor: getTeamColor(player.team) + '20', color: getTeamColor(player.team) }}
                  >
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h2 className="text-2xl font-bold">{player.name}</h2>
                  <p className="text-muted-foreground">{player.pinno}</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {getTeamLogo(player.team) && (
                    <img 
                      src={getTeamLogo(player.team)} 
                      alt={player.team} 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <Badge 
                    className="text-lg px-4 py-2"
                    style={{ backgroundColor: getTeamColor(player.team) + '20', color: getTeamColor(player.team) }}
                  >
                    {player.team}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">#{player.current_ranking}</p>
                    <p className="text-sm text-muted-foreground">Current Ranking</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="h-5 w-5 text-green-500 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{player.win_percentage.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                  </div>
                </div>

                {player.playingStyle && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Playing Style</p>
                    <p className="font-medium">{player.playingStyle}</p>
                  </div>
                )}

                {player.dominantHand && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Dominant Hand</p>
                    <p className="font-medium">{player.dominantHand}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Matches */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{player.matches_played}</p>
                <p className="text-xs text-muted-foreground">Matches Played</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">{player.matches_won}</p>
                <p className="text-xs text-muted-foreground">Matches Won</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-orange-600">{player.sets_won}</p>
                <p className="text-xs text-muted-foreground">Sets Won</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Medal className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-600">{player.games_won}</p>
                <p className="text-xs text-muted-foreground">Games Won</p>
              </CardContent>
            </Card>
          </div>

          {/* Singles Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Singles Matches Played by {player.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {singlesMatches.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No singles matches found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">#</TableHead>
                        <TableHead>Opponent</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {singlesMatches.map((match, index) => {
                        const matchResult = formatMatchResult(match, player.name);
                        return (
                          <TableRow key={match._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTeamLogo(matchResult.opponentTeam) && (
                                  <img 
                                    src={getTeamLogo(matchResult.opponentTeam)} 
                                    alt={matchResult.opponentTeam} 
                                    className="w-5 h-5 rounded-full object-cover"
                                  />
                                )}
                                <span className="font-medium">{matchResult.opponent}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono">{matchResult.score}</TableCell>
                            <TableCell>
                              <Badge variant={matchResult.isWinner ? "default" : "secondary"}>
                                {matchResult.isWinner ? "Won" : "Lost"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {new Date(match.matchDate).toLocaleDateString()}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Doubles Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Doubles Matches Played by {player.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {doublesMatches.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No doubles matches found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">#</TableHead>
                        <TableHead>Match</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doublesMatches.map((match, index) => {
                        const matchResult = formatMatchResult(match, player.name);
                        return (
                          <TableRow key={match._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{match.team1} vs {match.team2}</p>
                                <p className="text-sm text-muted-foreground">
                                  {match.player1} & Partner vs {match.player2} & Partner
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono">{matchResult.score}</TableCell>
                            <TableCell>
                              <Badge variant={matchResult.isWinner ? "default" : "secondary"}>
                                {matchResult.isWinner ? "Won" : "Lost"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {new Date(match.matchDate).toLocaleDateString()}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;