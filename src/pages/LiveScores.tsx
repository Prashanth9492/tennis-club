// import React, { useState, useEffect, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { RefreshCw, Trophy, Clock, MapPin, Users, Target, Zap } from 'lucide-react';
// import { io, Socket } from 'socket.io-client';

// interface Match {
//   _id: string;
//   matchId: string;
//   team1: string;
//   team2: string;
//   venue: string;
//   matchDate: Date;
//   status: string; // Made more flexible to handle various status values
//   isLive: boolean;
//   currentInnings: number;
//   innings: Innings[];
//   batsmanStats: BatsmanStat[];
//   bowlerStats: BowlerStat[];
//   commentary: Commentary[];
//   result?: {
//     winner: string;
//     winBy: string;
//   };
//   totalOvers: number;
//   tossWinner?: string;
//   tossDecision?: string;
// }

// interface Innings {
//   inningsNumber: number;
//   battingTeam: string;
//   bowlingTeam: string;
//   runs: number;
//   wickets: number;
//   overs: Over[];
//   currentOver: number;
//   currentBall: number;
//   extras: {
//     wides: number;
//     noBalls: number;
//     byes: number;
//     legByes: number;
//   };
// }

// interface Over {
//   overNumber: number;
//   bowler: string;
//   balls: Ball[];
//   runsInOver: number;
//   wicketsInOver: number;
//   maidenOver: boolean;
// }

// interface Ball {
//   ballNumber: number;
//   runs: number;
//   isWicket: boolean;
//   isWide: boolean;
//   isNoBall: boolean;
//   striker: string;
//   nonStriker: string;
//   bowler: string;
// }

// interface BatsmanStat {
//   playerName: string;
//   runs: number;
//   ballsFaced: number;
//   fours: number;
//   sixes: number;
//   isOut: boolean;
//   dismissalType?: string;
//   bowlerName?: string;
//   fielderName?: string;
// }

// interface BowlerStat {
//   playerName: string;
//   overs: number;
//   runs: number;
//   wickets: number;
//   economy: number;
//   maidens: number;
//   wides: number;
//   noBalls: number;
// }

// interface Commentary {
//   ballNumber: string;
//   text: string;
//   timestamp: Date;
// }

// interface BallUpdateData {
//   matchId: string;
//   match: Match;
//   ball: Ball;
//   commentary: string;
// }

// // Helper functions
// const getTeamLogo = (teamName: string) => {
//   const logos = {
//     AGNI: '/src/assets/agni.jpg',
//     JAL: '/src/assets/jal.jpg',
//     VAYU: '/src/assets/vayu.jpg',
//     AAKASH: '/src/assets/aakash.png'
//   };
//   return logos[teamName as keyof typeof logos] || '/src/assets/logo.png';
// };

// const getCurrentInnings = (match: Match) => {
//   return match.innings.find(innings => innings.inningsNumber === match.currentInnings);
// };

// const getRunRate = (innings: Innings) => {
//   const totalBalls = innings.currentOver * 6 + innings.currentBall;
//   return totalBalls > 0 ? (innings.runs / (totalBalls / 6)).toFixed(2) : '0.00';
// };

// const getRequiredRunRate = (match: Match) => {
//   if (match.innings.length < 2) return '0.00';
  
//   const firstInnings = match.innings[0];
//   const secondInnings = match.innings[1];
//   const target = firstInnings.runs + 1;
//   const scored = secondInnings.runs;
//   const required = target - scored;
  
//   const ballsUsed = secondInnings.currentOver * 6 + secondInnings.currentBall;
//   const ballsRemaining = (match.totalOvers * 6) - ballsUsed;
  
//   return ballsRemaining > 0 ? ((required / ballsRemaining) * 6).toFixed(2) : '0.00';
// };

// const formatBallOutcome = (ball: Ball) => {
//   if (ball.isWicket) return 'W';
//   if (ball.isWide) return 'Wd';
//   if (ball.isNoBall) return 'Nb';
//   return ball.runs.toString();
// };

// const LiveScores: React.FC = () => {
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const fetchMatches = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5001/api/matches');
//       const data = await response.json();
//       setMatches(data);
//     } catch (error) {
//       console.error('Failed to fetch matches:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMatches();
    
//     // Initialize Socket.IO connection
//     const socketConnection = io('http://localhost:5001');
//     setSocket(socketConnection);

//     socketConnection.on('matchStarted', (match: Match) => {
//       fetchMatches();
//     });

//     socketConnection.on('ballUpdate', (data: BallUpdateData) => {
//       if (selectedMatch && selectedMatch.matchId === data.matchId) {
//         setSelectedMatch(data.match);
//       }
//       fetchMatches();
//     });

//     return () => {
//       socketConnection.disconnect();
//     };
//   }, [fetchMatches, selectedMatch]);

//   useEffect(() => {
//     if (selectedMatch && socket) {
//       socket.emit('joinMatch', selectedMatch.matchId);
//     }
//   }, [selectedMatch, socket]);

//   const getCurrentInnings = (match: Match) => {
//     if (!match.innings || match.innings.length === 0) return null;
//     return match.innings[match.currentInnings - 1];
//   };

//   const getRunRate = (innings: Innings) => {
//     const totalBalls = innings.currentOver * 6 + innings.currentBall;
//     if (totalBalls === 0) return 0;
//     return ((innings.runs / totalBalls) * 6).toFixed(2);
//   };

//   const getRequiredRunRate = (match: Match) => {
//     if (match.innings.length < 2) return null;
    
//     const firstInnings = match.innings[0];
//     const secondInnings = match.innings[1];
//     const target = firstInnings.runs + 1;
//     const required = target - secondInnings.runs;
//     const remainingBalls = (match.totalOvers * 6) - (secondInnings.currentOver * 6 + secondInnings.currentBall);
    
//     if (remainingBalls <= 0) return 0;
//     return ((required / remainingBalls) * 6).toFixed(2);
//   };

//   const getTeamLogo = (team: string) => {
//     const logos: { [key: string]: string } = {
//       'AGNI': '/src/assets/agni.jpg',
//       'JAL': '/src/assets/jal.jpg',
//       'VAYU': '/src/assets/vayu.jpg',
//       'AAKASH': '/src/assets/aakash.png'
//     };
//     return logos[team] || '/src/assets/logo.png';
//   };

//   const formatBallOutcome = (ball: Ball) => {
//     if (ball.isWicket) return 'W';
//     if (ball.isWide) return 'Wd';
//     if (ball.isNoBall) return 'Nb';
//     return ball.runs.toString();
//   };

//   const liveMatches = matches.filter(m => 
//     m.isLive || 
//     m.status?.toLowerCase() === 'live'
//   );
//   const upcomingMatches = matches.filter(m => 
//     !m.isLive && (
//       m.status?.toLowerCase() === 'scheduled' || 
//       m.status?.toLowerCase() === 'upcoming'
//     )
//   );
//   const completedMatches = matches.filter(m => 
//     m.status?.toLowerCase() === 'completed'
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <Trophy className="h-8 w-8 text-orange-500" />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Live Cricket Scores</h1>
//               <p className="text-gray-600">Real-time updates from the field</p>
//             </div>
//           </div>
//           <Button 
//             onClick={fetchMatches} 
//             disabled={loading}
//             variant="outline"
//             size="sm"
//             className="gap-2"
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//         </div>

//         <Tabs defaultValue="live" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 mb-6">
//             <TabsTrigger value="live" className="gap-2">
//               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//               Live ({liveMatches.length})
//             </TabsTrigger>
//             <TabsTrigger value="upcoming" className="gap-2">
//               <Clock className="h-4 w-4" />
//               Upcoming ({upcomingMatches.length})
//             </TabsTrigger>
//             <TabsTrigger value="completed" className="gap-2">
//               <Trophy className="h-4 w-4" />
//               Results ({completedMatches.length})
//             </TabsTrigger>
//           </TabsList>

//           {/* Live Matches */}
//           <TabsContent value="live">
//             {liveMatches.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-600 mb-2">No Live Matches</h3>
//                   <p className="text-gray-500">Check back soon for live cricket action!</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="space-y-6">
//                 {liveMatches.map((match) => {
//                   const currentInnings = getCurrentInnings(match);
//                   const currentBatsmen = match.batsmanStats
//                     .filter(b => !b.isOut)
//                     .sort((a, b) => b.runs - a.runs)
//                     .slice(0, 2);
//                   const currentBowler = match.bowlerStats
//                     .find(b => currentInnings?.overs.slice(-1)[0]?.bowler === b.playerName);

//                   return (
//                     <Card 
//                       key={match._id} 
//                       className="overflow-hidden border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-all duration-300"
//                     >
//                       {/* Live Match Header */}
//                       <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 pb-4">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-4">
//                             <div className="flex items-center gap-3">
//                               <img src={getTeamLogo(match.team1)} alt={match.team1} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
//                               <div>
//                                 <h3 className="text-xl font-bold text-gray-800">{match.team1}</h3>
//                                 <p className="text-sm text-gray-600">
//                                   {match.innings[0]?.battingTeam === match.team1 ? 
//                                     `${match.innings[0]?.runs || 0}/${match.innings[0]?.wickets || 0}` : 
//                                     match.innings[1]?.battingTeam === match.team1 ? 
//                                     `${match.innings[1]?.runs || 0}/${match.innings[1]?.wickets || 0}` : 
//                                     'Yet to bat'
//                                   }
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="mx-4">
//                               <div className="text-2xl font-bold text-red-600">VS</div>
//                               <div className="text-xs text-gray-500 text-center">LIVE</div>
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <div className="text-right">
//                                 <h3 className="text-xl font-bold text-gray-800">{match.team2}</h3>
//                                 <p className="text-sm text-gray-600">
//                                   {match.innings[0]?.battingTeam === match.team2 ? 
//                                     `${match.innings[0]?.runs || 0}/${match.innings[0]?.wickets || 0}` : 
//                                     match.innings[1]?.battingTeam === match.team2 ? 
//                                     `${match.innings[1]?.runs || 0}/${match.innings[1]?.wickets || 0}` : 
//                                     'Yet to bat'
//                                   }
//                                 </p>
//                               </div>
//                               <img src={getTeamLogo(match.team2)} alt={match.team2} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-2">
//                             <Badge variant="destructive" className="animate-pulse text-sm px-3 py-1">
//                               <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
//                               LIVE
//                             </Badge>
//                             <div className="text-xs text-gray-600 text-right">
//                               <div className="flex items-center gap-1 mb-1">
//                                 <MapPin className="h-3 w-3" />
//                                 {match.venue}
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <Clock className="h-3 w-3" />
//                                 {new Date(match.matchDate).toLocaleDateString()}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardHeader>

//                       <CardContent className="p-6">
//                         {currentInnings && (
//                           <div className="space-y-6">
//                             {/* Current Innings Score */}
//                             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
//                               <div className="flex items-center justify-between mb-3">
//                                 <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                                   <Target className="h-5 w-5 text-blue-600" />
//                                   {currentInnings.battingTeam} - Innings {currentInnings.inningsNumber}
//                                 </h4>
//                                 <Badge variant="secondary" className="text-sm">
//                                   {currentInnings.battingTeam === match.tossWinner ? 
//                                     (match.tossDecision === 'bat' ? 'Chose to Bat' : 'Chose to Bowl') :
//                                     (match.tossDecision === 'bat' ? 'Bowling First' : 'Batting First')
//                                   }
//                                 </Badge>
//                               </div>
                              
//                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                 <div className="text-center">
//                                   <div className="text-3xl font-bold text-blue-600">
//                                     {currentInnings.runs}
//                                   </div>
//                                   <div className="text-sm text-gray-600">Runs</div>
//                                 </div>
//                                 <div className="text-center">
//                                   <div className="text-3xl font-bold text-red-600">
//                                     {currentInnings.wickets}
//                                   </div>
//                                   <div className="text-sm text-gray-600">Wickets</div>
//                                 </div>
//                                 <div className="text-center">
//                                   <div className="text-2xl font-bold text-green-600">
//                                     {currentInnings.currentOver}.{currentInnings.currentBall}
//                                   </div>
//                                   <div className="text-sm text-gray-600">Overs</div>
//                                 </div>
//                                 <div className="text-center">
//                                   <div className="text-2xl font-bold text-purple-600">
//                                     {getRunRate(currentInnings)}
//                                   </div>
//                                   <div className="text-sm text-gray-600">Run Rate</div>
//                                 </div>
//                               </div>

//                               {/* Required Run Rate for 2nd Innings */}
//                               {match.innings.length === 2 && (
//                                 <div className="mt-4 pt-4 border-t border-gray-200">
//                                   <div className="grid grid-cols-2 gap-4">
//                                     <div className="text-center">
//                                       <div className="text-lg font-bold text-orange-600">
//                                         {match.innings[0].runs + 1}
//                                       </div>
//                                       <div className="text-sm text-gray-600">Target</div>
//                                     </div>
//                                     <div className="text-center">
//                                       <div className="text-lg font-bold text-red-600">
//                                         {getRequiredRunRate(match)}
//                                       </div>
//                                       <div className="text-sm text-gray-600">Required RR</div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>

//                             {/* Current Batsmen */}
//                             {currentBatsmen.length > 0 && (
//                               <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
//                                 <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                                   <Users className="h-5 w-5 text-green-600" />
//                                   Current Partnership
//                                 </h4>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   {currentBatsmen.map((batsman, index) => (
//                                     <div key={batsman.playerName} className="bg-white rounded-lg p-3 shadow-sm">
//                                       <div className="flex items-center justify-between">
//                                         <div>
//                                           <h5 className="font-bold text-gray-800 flex items-center gap-2">
//                                             {batsman.playerName}
//                                             {index === 0 && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Striker</span>}
//                                           </h5>
//                                           <p className="text-sm text-gray-600">
//                                             {batsman.runs} runs • {batsman.ballsFaced} balls
//                                           </p>
//                                         </div>
//                                         <div className="text-right">
//                                           <div className="text-lg font-bold text-blue-600">
//                                             {batsman.ballsFaced > 0 ? ((batsman.runs / batsman.ballsFaced) * 100).toFixed(1) : '0.0'}
//                                           </div>
//                                           <div className="text-xs text-gray-500">Strike Rate</div>
//                                         </div>
//                                       </div>
//                                       <div className="flex justify-between mt-2 text-sm">
//                                         <span className="text-blue-600">4s: {batsman.fours}</span>
//                                         <span className="text-green-600">6s: {batsman.sixes}</span>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                             {/* Current Bowler */}
//                             {currentBowler && (
//                               <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
//                                 <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                                   <Zap className="h-5 w-5 text-purple-600" />
//                                   Current Bowler
//                                 </h4>
//                                 <div className="bg-white rounded-lg p-3 shadow-sm">
//                                   <div className="flex items-center justify-between">
//                                     <div>
//                                       <h5 className="font-bold text-gray-800">{currentBowler.playerName}</h5>
//                                       <p className="text-sm text-gray-600">
//                                         {currentBowler.overs} overs • {currentBowler.runs} runs • {currentBowler.wickets} wickets
//                                       </p>
//                                     </div>
//                                     <div className="text-right">
//                                       <div className="text-lg font-bold text-purple-600">
//                                         {currentBowler.economy}
//                                       </div>
//                                       <div className="text-xs text-gray-500">Economy</div>
//                                     </div>
//                                   </div>
//                                   <div className="flex justify-between mt-2 text-sm">
//                                     <span className="text-orange-600">Maidens: {currentBowler.maidens}</span>
//                                     <span className="text-red-600">Wides: {currentBowler.wides} | No Balls: {currentBowler.noBalls}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}

//                             {/* Recent Balls & Commentary */}
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                               {/* Recent Balls */}
//                               <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4">
//                                 <h4 className="font-bold text-gray-800 mb-3">Recent Balls</h4>
//                                 <div className="flex gap-2 flex-wrap">
//                                   {currentInnings.overs.slice(-2).flatMap((over) =>
//                                     over.balls.map((ball, ballIndex) => (
//                                       <div
//                                         key={`${over.overNumber}-${ballIndex}`}
//                                         className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
//                                           ball.isWicket
//                                             ? 'bg-red-500 text-white animate-pulse'
//                                             : ball.runs === 6
//                                             ? 'bg-green-500 text-white'
//                                             : ball.runs === 4
//                                             ? 'bg-blue-500 text-white'
//                                             : ball.isWide || ball.isNoBall
//                                             ? 'bg-yellow-400 text-black'
//                                             : 'bg-gray-200 text-gray-700'
//                                         }`}
//                                         title={`${over.overNumber}.${ball.ballNumber}: ${ball.striker} - ${formatBallOutcome(ball)} runs`}
//                                       >
//                                         {formatBallOutcome(ball)}
//                                       </div>
//                                     ))
//                                   )}
//                                 </div>
//                                 <div className="mt-3 text-xs text-gray-600">
//                                   Over {currentInnings.currentOver}: {currentInnings.overs.slice(-1)[0]?.runsInOver || 0} runs
//                                 </div>
//                               </div>

//                               {/* Live Commentary */}
//                               <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
//                                 <h4 className="font-bold text-gray-800 mb-3">Live Commentary</h4>
//                                 <div className="max-h-32 overflow-y-auto space-y-2">
//                                   {match.commentary.slice(0, 4).map((comment, index) => (
//                                     <div key={index} className="text-sm">
//                                       <div className="flex items-start gap-2">
//                                         <span className="font-mono font-bold text-blue-600 text-xs bg-white px-2 py-1 rounded">
//                                           {comment.ballNumber}
//                                         </span>
//                                         <div className="flex-1">
//                                           <p className="text-gray-700 leading-relaxed">{comment.text}</p>
//                                           <p className="text-xs text-gray-500 mt-1">
//                                             {new Date(comment.timestamp).toLocaleTimeString()}
//                                           </p>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Match Progress */}
//                             <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
//                               <h4 className="font-bold text-gray-800 mb-3">Match Progress</h4>
//                               <div className="space-y-2">
//                                 <div className="flex justify-between items-center text-sm">
//                                   <span>Overs Bowled:</span>
//                                   <span className="font-semibold">{currentInnings.currentOver}.{currentInnings.currentBall} / {match.totalOvers}</span>
//                                 </div>
//                                 <div className="w-full bg-gray-200 rounded-full h-2">
//                                   <div 
//                                     className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500" 
//                                     style={{ 
//                                       width: `${((currentInnings.currentOver + currentInnings.currentBall/6) / match.totalOvers) * 100}%` 
//                                     }}
//                                   ></div>
//                                 </div>
//                                 <div className="flex justify-between text-xs text-gray-600">
//                                   <span>Balls Remaining: {(match.totalOvers * 6) - (currentInnings.currentOver * 6 + currentInnings.currentBall)}</span>
//                                   <span>Progress: {(((currentInnings.currentOver + currentInnings.currentBall/6) / match.totalOvers) * 100).toFixed(1)}%</span>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Quick Action */}
//                             <div className="text-center">
//                               <Button 
//                                 onClick={() => setSelectedMatch(match)}
//                                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2"
//                               >
//                                 View Full Scorecard
//                               </Button>
//                             </div>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </div>
//             )}
//           </TabsContent>

//           {/* Upcoming Matches */}
//           <TabsContent value="upcoming">
//             {upcomingMatches.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Matches</h3>
//                   <p className="text-gray-500">All matches have been scheduled!</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid gap-4">
//                 {upcomingMatches.map((match) => (
//                   <Card key={match._id}>
//                     <CardContent className="p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-3">
//                             <img src={getTeamLogo(match.team1)} alt={match.team1} className="w-10 h-10 rounded-full" />
//                             <span className="text-lg font-semibold">{match.team1}</span>
//                           </div>
//                           <span className="text-gray-400 text-xl font-bold">vs</span>
//                           <div className="flex items-center gap-3">
//                             <span className="text-lg font-semibold">{match.team2}</span>
//                             <img src={getTeamLogo(match.team2)} alt={match.team2} className="w-10 h-10 rounded-full" />
//                           </div>
//                         </div>
//                         <Badge variant="secondary">Upcoming</Badge>
//                       </div>
//                       <div className="flex items-center gap-6 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           {match.venue}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           {new Date(match.matchDate).toLocaleString()}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           {/* Completed Matches */}
//           <TabsContent value="completed">
//             {completedMatches.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-600 mb-2">No Completed Matches</h3>
//                   <p className="text-gray-500">Results will appear here after matches are completed!</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid gap-4">
//                 {completedMatches.map((match) => (
//                   <Card key={match._id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedMatch(match)}>
//                     <CardContent className="p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-3">
//                             <img src={getTeamLogo(match.team1)} alt={match.team1} className="w-10 h-10 rounded-full" />
//                             <span className="text-lg font-semibold">{match.team1}</span>
//                           </div>
//                           <span className="text-gray-400 text-xl font-bold">vs</span>
//                           <div className="flex items-center gap-3">
//                             <span className="text-lg font-semibold">{match.team2}</span>
//                             <img src={getTeamLogo(match.team2)} alt={match.team2} className="w-10 h-10 rounded-full" />
//                           </div>
//                         </div>
//                         <Badge variant="secondary">Completed</Badge>
//                       </div>
                      
//                       <div className="space-y-2 mb-3">
//                         {match.innings.map((innings, index) => (
//                           <div key={index} className="flex justify-between items-center">
//                             <span className="font-medium">{innings.battingTeam}</span>
//                             <span className="font-semibold">
//                               {innings.runs}/{innings.wickets} ({innings.currentOver}.{innings.currentBall} overs)
//                             </span>
//                           </div>
//                         ))}
//                       </div>

//                       {match.result && (
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                           <p className="text-center font-semibold text-green-800">
//                             {match.result.winner === 'tie' ? 'Match Tied!' : `${match.result.winner} won by ${match.result.winBy}`}
//                           </p>
//                         </div>
//                       )}

//                       <div className="flex items-center gap-6 text-sm text-gray-600 mt-3">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           {match.venue}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           {new Date(match.matchDate).toLocaleDateString()}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>

//         {/* Detailed Match View Modal/Expandable Section */}
//         {selectedMatch && (
//           <Card className="mt-8 border-2 border-blue-500">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center gap-3">
//                   <Trophy className="h-6 w-6 text-orange-500" />
//                   {selectedMatch.team1} vs {selectedMatch.team2} - Detailed View
//                 </CardTitle>
//                 <Button 
//                   variant="outline" 
//                   size="sm" 
//                   onClick={() => setSelectedMatch(null)}
//                 >
//                   Close
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="scorecard" className="w-full">
//                 <TabsList className="grid w-full grid-cols-3">
//                   <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
//                   <TabsTrigger value="commentary">Commentary</TabsTrigger>
//                   <TabsTrigger value="stats">Statistics</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="scorecard" className="space-y-6">
//                   {selectedMatch.innings.map((innings, index) => (
//                     <div key={index} className="border rounded-lg p-4">
//                       <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                         {innings.battingTeam}
//                         <Badge variant={selectedMatch.currentInnings === innings.inningsNumber ? "default" : "secondary"}>
//                           {innings.runs}/{innings.wickets} ({innings.currentOver}.{innings.currentBall} overs)
//                         </Badge>
//                       </h3>

//                       {/* Batting Stats */}
//                       <div className="overflow-x-auto mb-4">
//                         <table className="w-full text-sm">
//                           <thead>
//                             <tr className="border-b bg-gray-50">
//                               <th className="text-left p-2">Batsman</th>
//                               <th className="text-right p-2">R</th>
//                               <th className="text-right p-2">B</th>
//                               <th className="text-right p-2">4s</th>
//                               <th className="text-right p-2">6s</th>
//                               <th className="text-right p-2">SR</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {selectedMatch.batsmanStats
//                               .filter(batsman => {
//                                 // Show batsmen who played in this innings
//                                 return innings.overs.some(over => 
//                                   over.balls.some(ball => ball.striker === batsman.playerName || ball.nonStriker === batsman.playerName)
//                                 );
//                               })
//                               .map((batsman, i) => (
//                                 <tr key={i} className="border-b">
//                                   <td className="p-2">
//                                     <div>
//                                       <span className="font-medium">{batsman.playerName}</span>
//                                       {batsman.isOut && batsman.dismissalType && (
//                                         <div className="text-xs text-gray-600">
//                                           {batsman.dismissalType} {batsman.bowlerName && `b ${batsman.bowlerName}`} {batsman.fielderName && `c ${batsman.fielderName}`}
//                                         </div>
//                                       )}
//                                     </div>
//                                   </td>
//                                   <td className="text-right p-2 font-semibold">{batsman.runs}</td>
//                                   <td className="text-right p-2">{batsman.ballsFaced}</td>
//                                   <td className="text-right p-2">{batsman.fours}</td>
//                                   <td className="text-right p-2">{batsman.sixes}</td>
//                                   <td className="text-right p-2">
//                                     {batsman.ballsFaced > 0 ? ((batsman.runs / batsman.ballsFaced) * 100).toFixed(1) : '0.0'}
//                                   </td>
//                                 </tr>
//                               ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       {/* Extras */}
//                       <div className="text-sm text-gray-600 mb-4">
//                         Extras: {(innings.extras.wides || 0) + (innings.extras.noBalls || 0) + (innings.extras.byes || 0) + (innings.extras.legByes || 0)}
//                         <span className="ml-2">
//                           (b {innings.extras.byes || 0}, lb {innings.extras.legByes || 0}, w {innings.extras.wides || 0}, nb {innings.extras.noBalls || 0})
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </TabsContent>

//                 <TabsContent value="commentary" className="space-y-4">
//                   <div className="max-h-96 overflow-y-auto space-y-2">
//                     {selectedMatch.commentary.map((comment, index) => (
//                       <div key={index} className="border-b pb-2">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="font-mono font-semibold text-blue-600">{comment.ballNumber}</span>
//                           <span className="text-xs text-gray-500">
//                             {new Date(comment.timestamp).toLocaleTimeString()}
//                           </span>
//                         </div>
//                         <p className="text-gray-700">{comment.text}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="stats" className="space-y-6">
//                   {/* Bowling Stats */}
//                   <div>
//                     <h3 className="text-xl font-bold mb-4">Bowling Figures</h3>
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead>
//                           <tr className="border-b bg-gray-50">
//                             <th className="text-left p-2">Bowler</th>
//                             <th className="text-right p-2">O</th>
//                             <th className="text-right p-2">M</th>
//                             <th className="text-right p-2">R</th>
//                             <th className="text-right p-2">W</th>
//                             <th className="text-right p-2">Econ</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedMatch.bowlerStats.map((bowler, i) => (
//                             <tr key={i} className="border-b">
//                               <td className="p-2 font-medium">{bowler.playerName}</td>
//                               <td className="text-right p-2">{bowler.overs}</td>
//                               <td className="text-right p-2">{bowler.maidens}</td>
//                               <td className="text-right p-2">{bowler.runs}</td>
//                               <td className="text-right p-2 font-semibold">{bowler.wickets}</td>
//                               <td className="text-right p-2">{bowler.economy}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveScores;