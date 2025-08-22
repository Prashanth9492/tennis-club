import { useState, useEffect } from 'react';

const LiveScores = () => {
  // Define all available teams with logos
  const allTeams = {
    Aakash: {
      teams: ["Aakash-A", "Aakash-B"],
      logo: "/src/assets/aakash.png",
      color: "#FF6B35"
    },
    Vayu: {
      teams: ["Vayu-A", "Vayu-B"],
      logo: "/src/assets/vayu.jpg",
      color: "#4ECDC4"
    },
    Prudhvi: {
      teams: ["Prudhvi-A", "Prudhvi-B"],
      logo: "/src/assets/prudhvi.jpg",
      color: "#45B7D1"
    },
    Jal: {
      teams: ["Jal-A", "Jal-B"],
      logo: "/src/assets/jal.jpg",
      color: "#96CEB4"
    },
    Agni: {
      teams: ["Agni-A", "Agni-B"],
      logo: "/src/assets/agni.jpg",
      color: "#FFEAA7"
    }
  };

  // Helper function to get team logo and color
  const getTeamInfo = (teamName) => {
    for (const [house, data] of Object.entries(allTeams)) {
      if (data.teams.includes(teamName)) {
        return { logo: data.logo, color: data.color, house };
      }
    }
    return { logo: "/src/assets/logo.png", color: "#FF6B35", house: "Unknown" };
  };

  // Initial match data
  const initialMatchData = {
    teamA: { 
      name: "Aakash-A", 
      runs: 0, 
      wickets: 0, 
      overs: 0.0,
      logo: "/src/assets/aakash.png",
      color: "#FF6B35"
    },
    teamB: { 
      name: "Vayu-A", 
      runs: 164, 
      wickets: 4, 
      overs: 18.1,
      logo: "/src/assets/vayu.jpg",
      color: "#4ECDC4"
    },
    status: "live",
    toss: "PD",
    currentOver: "2",
    inningsBreak: "= 2",
    partnership: "3 (7)",
    showWinLose: false,
    matchCompleted: false,
    showBattingIndicators: true,
    showBallStatus: true,
    batsmen: [
      { name: "Arpit Rana", runs: 2, balls: 7, strikeRate: 28.6, isOnStrike: true, isOut: false },
      { name: "Sujal Singh", runs: 0, balls: 0, strikeRate: 0, isOnStrike: false, isOut: false }
    ],
    bowler: { name: "PRASHANTH", figures: "2/28", overs: 4.0, economy: 7.0 },
    allPlayers: [
      "USP", "MOHAN SIVA", "PRASHANTH", "SURYA", "ESWAR", "RAJ", "KISHORE", "RAVI", "SURESH", "VIKRAM",
      "Arpit Rana", "Sujal Singh", "Player 1", "Player 2", "Player 3"
    ],
    venue: "27th T20",
    target: 184,
    powerplay: "1-6",
    lastWicket: "",
    runRate: 3.0,
    requiredRunRate: 10.53,
    betting: {
      twentyOverRuns: { no: 183, yes: 184 },
      open: { value: 55, min: 47, max: 189 }
    },
    innings: 2,
    ballByBall: [
      { over: 1, ball: 1, runs: 1, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" },
      { over: 1, ball: 2, runs: 0, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" },
      { over: 1, ball: 3, runs: 4, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" },
      { over: 1, ball: 4, runs: 2, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" },
      { over: 1, ball: 5, runs: 0, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" },
      { over: 1, ball: 6, runs: 6, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" },
      { over: 2, ball: 1, runs: 1, batsman: "Sujal Singh", bowler: "PRASHANTH", extras: "" },
      { over: 2, ball: 2, runs: 0, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "W", wicketType: "Bowled" },
      { over: 2, ball: 3, runs: 1, batsman: "Rohit Sharma", bowler: "PRASHANTH", extras: "WD" },
      { over: 2, ball: 4, runs: 3, batsman: "Rohit Sharma", bowler: "PRASHANTH", extras: "" },
      { over: 2, ball: 5, runs: 4, batsman: "Sujal Singh", bowler: "PRASHANTH", extras: "" },
      { over: 2, ball: 6, runs: 0, batsman: "Sujal Singh", bowler: "PRASHANTH", extras: "W", wicketType: "Caught" },
      { over: 3, ball: 1, runs: 2, batsman: "Virat Kohli", bowler: "RASHID", extras: "" },
      { over: 3, ball: 2, runs: 0, batsman: "Virat Kohli", bowler: "RASHID", extras: "W", wicketType: "LBW" },
      { over: 3, ball: 3, runs: 6, batsman: "MS Dhoni", bowler: "RASHID", extras: "" },
      { over: 3, ball: 4, runs: 1, batsman: "MS Dhoni", bowler: "RASHID", extras: "" },
      { over: 3, ball: 5, runs: 0, batsman: "Hardik Pandya", bowler: "RASHID", extras: "W", wicketType: "Stumped" },
      { over: 3, ball: 6, runs: 4, batsman: "Ravindra Jadeja", bowler: "RASHID", extras: "" },
      { over: 4, ball: 1, runs: 0, batsman: "Ravindra Jadeja", bowler: "BUMRAH", extras: "W", wicketType: "Run Out" },
      { over: 4, ball: 2, runs: 6, batsman: "Jasprit Bumrah", bowler: "BUMRAH", extras: "" },
      { over: 4, ball: 3, runs: 3, batsman: "Jasprit Bumrah", bowler: "BUMRAH", extras: "" },
    ],
    currentBall: { over: 2, ball: 1, runs: 0, batsman: "Arpit Rana", bowler: "PRASHANTH", extras: "" }
  };

  const [matchData, setMatchData] = useState(initialMatchData);
  const [lastScoreEvent, setLastScoreEvent] = useState("");
  const [firstInningData, setFirstInningData] = useState(initialMatchData);
  const [secondInningData, setSecondInningData] = useState({
    ...initialMatchData,
    teamA: { ...initialMatchData.teamA, runs: 0, wickets: 0, overs: 0 },
    teamB: { ...initialMatchData.teamB, runs: 142, wickets: 3, overs: 18.2 },
    innings: 2,
    target: 184,
    status: "live",
    showWinLose: false,
    matchCompleted: false,
    showBattingIndicators: true,
    showBallStatus: true
  });

  // Simulate live score updates
  useEffect(() => {
    if (matchData.status === "live") {
      const interval = setInterval(() => {
        setMatchData(prev => {
          const newData = {...prev};
          // Simulate some random changes to make it feel live
          if (Math.random() > 0.7 && newData.innings === 1) {
            // Batting team is scoring
            const runsToAdd = Math.floor(Math.random() * 3);
            newData.teamA.runs += runsToAdd;
            newData.batsmen[0].runs += runsToAdd;
            newData.batsmen[0].balls += 1;
            newData.batsmen[0].strikeRate = 
              Math.round((newData.batsmen[0].runs / newData.batsmen[0].balls) * 100);
            
            newData.partnership = `${newData.batsmen[0].runs + newData.batsmen[1].runs} (${newData.batsmen[0].balls + newData.batsmen[1].balls})`;
            
            // Increment overs
            const currentOver = parseFloat(String(newData.teamA.overs));
            const newOver = Math.floor(currentOver) + 0.1;
            newData.teamA.overs = newOver > 20 ? 20 : newOver;
            
            // Update run rate
            newData.runRate = parseFloat((newData.teamA.runs / newData.teamA.overs).toFixed(2));
            
            setLastScoreEvent(`${newData.batsmen[0].name} scored ${runsToAdd} run${runsToAdd !== 1 ? 's' : ''}`);
          } else if (Math.random() > 0.7 && newData.innings === 2) {
            // Chasing team is scoring
            const runsToAdd = Math.floor(Math.random() * 3);
            newData.teamB.runs += runsToAdd;
            newData.batsmen[0].runs += runsToAdd;
            newData.batsmen[0].balls += 1;
            newData.batsmen[0].strikeRate = 
              Math.round((newData.batsmen[0].runs / newData.batsmen[0].balls) * 100);
            
            newData.partnership = `${newData.batsmen[0].runs + newData.batsmen[1].runs} (${newData.batsmen[0].balls + newData.batsmen[1].balls})`;
            
            // Increment overs
            const currentOver = parseFloat(String(newData.teamB.overs));
            const newOver = Math.floor(currentOver) + 0.1;
            newData.teamB.overs = newOver > 20 ? 20 : newOver;
            
            // Update required run rate
            const remainingRuns = newData.target - newData.teamB.runs;
            const remainingOvers = 20 - newData.teamB.overs;
            newData.requiredRunRate = parseFloat((remainingRuns / remainingOvers).toFixed(2));
            
            setLastScoreEvent(`${newData.batsmen[0].name} scored ${runsToAdd} run${runsToAdd !== 1 ? 's' : ''}`);
          }
          return newData;
        });
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [matchData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-0 font-sans">
      {/* Header Section - Mobile Responsive */}
      <div className="bg-gray-800 py-2 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-base sm:text-lg font-bold mb-2 sm:mb-0">
            {matchData.teamA.name} {firstInningData.teamA?.runs || matchData.target}-{firstInningData.teamA?.wickets || 0} vs {matchData.teamB.name} {matchData.teamB.runs}-{matchData.teamB.wickets}, {matchData.venue}
          </h1>
          <div className="flex space-x-2 sm:space-x-4">
            <span className="text-orange-500 text-sm">Commentary</span>
            <span className="text-white font-semibold text-sm">Live</span>
          </div>
        </div>
      </div>

      {/* Status Section - Mobile Responsive */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mt-2 flex flex-wrap gap-2">
        <div className="text-xs sm:text-sm font-semibold ml-auto flex flex-col sm:flex-row items-end sm:items-center">
          <span className="sm:mr-2">Inning: {matchData.innings === 1 ? "1st" : "2nd"}</span>
          <span>Status: <span className="text-orange-500">{matchData.status}</span></span>
        </div>
      </div>

      {/* Display Scoreboard - Ultra-Compact Mobile-First */}
      <div className="w-full max-w-5xl mx-auto p-1 space-y-1">
        
        {/* Team Scores - Compact Mobile Grid with Win/Lose Indicator */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          {/* Team A - Ultra Mobile Optimized */}
          <div className="grid grid-cols-[40px_1fr_80px] sm:grid-cols-[50px_1fr_100px] gap-1 sm:gap-2 p-1.5 sm:p-2 border-b border-gray-700 items-center">
            {/* Logo - Fixed Size */}
            <img 
              src={matchData.teamA.logo} 
              alt={matchData.teamA.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            {/* Team Info - Minimal Flexbox */}
            <div className="flex flex-col min-w-0">
              <div className="font-medium text-xs sm:text-sm text-gray-300 truncate">
                {matchData.teamA.name}
              </div>
              <div className="flex items-baseline space-x-1">
                <div className="font-bold text-base sm:text-xl text-white">
                  {matchData.innings === 1 ? 
                    `${matchData.teamA.runs}-${matchData.teamA.wickets}` :
                    `${firstInningData.teamA?.runs || matchData.target}-${firstInningData.teamA?.wickets || 0}`
                  }
                </div>
                <div className="text-xs text-gray-400">
                  ({matchData.innings === 1 ? matchData.teamA.overs : (firstInningData.teamA?.overs || 20)})
                </div>
              </div>
            </div>
            {/* Status & Win/Lose - Compact */}
            <div className="text-xs font-medium text-gray-400 text-right flex flex-col items-end">
              {/* Batting Indicator - Only show when enabled and not completed */}
              {matchData.showBattingIndicators && !matchData.matchCompleted && (
                <>
                  {matchData.innings === 1 ? (
                    <div className="bg-green-600 text-white px-1 py-0.5 rounded text-xs mb-1">BAT</div>
                  ) : (
                    <div className="text-gray-500 mb-1">DONE</div>
                  )}
                </>
              )}
              {/* Win/Lose indicator for Team A */}
              {(matchData.showWinLose && matchData.matchCompleted) && (
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  (firstInningData.teamA?.runs || matchData.target || 0) > (matchData.teamB.runs || 0)
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {(firstInningData.teamA?.runs || matchData.target || 0) > (matchData.teamB.runs || 0) ? 'WIN' : 'LOSE'}
                </span>
              )}
            </div>
          </div>

          {/* Team B - Ultra Mobile Optimized */}
          <div className="grid grid-cols-[40px_1fr_80px] sm:grid-cols-[50px_1fr_100px] gap-1 sm:gap-2 p-1.5 sm:p-2 items-center">
            {/* Logo - Fixed Size */}
            <img 
              src={matchData.teamB.logo} 
              alt={matchData.teamB.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            {/* Team Info - Minimal Flexbox */}
            <div className="flex flex-col min-w-0">
              <div className="font-medium text-xs sm:text-sm text-gray-300 truncate">
                {matchData.teamB.name}
              </div>
              <div className="flex items-baseline space-x-1">
                <div className="font-bold text-base sm:text-xl text-white">
                  {matchData.innings === 2 ? 
                    `${matchData.teamB.runs}-${matchData.teamB.wickets}` :
                    "0-0"
                  }
                </div>
                <div className="text-xs text-gray-400">
                  ({matchData.innings === 2 ? matchData.teamB.overs : "0.0"})
                </div>
              </div>
            </div>
            {/* Status & Win/Lose - Compact */}
            <div className="text-xs font-medium text-gray-400 text-right flex flex-col items-end">
              {/* Batting Indicator - Only show when enabled and not completed */}
              {matchData.showBattingIndicators && !matchData.matchCompleted && (
                <>
                  {matchData.innings === 2 ? (
                    <div className="bg-green-600 text-white px-1 py-0.5 rounded text-xs mb-1">BAT</div>
                  ) : (
                    <div className="text-gray-500 mb-1">WAIT</div>
                  )}
                </>
              )}
              {/* Win/Lose indicator for Team B */}
              {(matchData.showWinLose && matchData.matchCompleted) && (
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  (matchData.teamB.runs || 0) > (firstInningData.teamA?.runs || matchData.target || 0)
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {(matchData.teamB.runs || 0) > (firstInningData.teamA?.runs || matchData.target || 0) ? 'WIN' : 'LOSE'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Current Ball Status - Beside Scoreboard with Dark Theme */}
        {matchData.showBallStatus && matchData.status === "live" && matchData.ballByBall && matchData.ballByBall.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg border border-gray-700">
            <div className="text-center">
              <div className="text-white font-bold text-lg sm:text-xl mb-2">
                {(() => {
                  const lastBall = matchData.ballByBall[matchData.ballByBall.length - 1];
                  if (!lastBall) return "LIVE BALL";
                  
                  if (lastBall.extras === "W") {
                    return "🏏 WICKET!";
                  } else if (lastBall.extras === "WD") {
                    return "WIDE BALL";
                  } else if (lastBall.extras === "NB") {
                    return "NO BALL";
                  } else if (lastBall.runs === 6) {
                    return "🚀 SIX!";
                  } else if (lastBall.runs === 4) {
                    return "🔥 FOUR!";
                  } else if (lastBall.runs === 0) {
                    return "⚫ DOT BALL";
                  } else {
                    return `${lastBall.runs} RUN${lastBall.runs > 1 ? 'S' : ''}`;
                  }
                })()}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm">
                {(() => {
                  const lastBall = matchData.ballByBall[matchData.ballByBall.length - 1];
                  if (!lastBall) return "Match in Progress";
                  
                  if (lastBall.extras === "W") {
                    if (lastBall.wicketType) {
                      return `${lastBall.wicketType.toUpperCase()}`;
                    }
                    return "WICKET FALLEN";
                  } else {
                    return `Over ${lastBall.over}.${lastBall.ball} • ${lastBall.batsman}`;
                  }
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Match Stats - Ultra-Compact Mobile Grid */}
        <div className="bg-gray-700 rounded-lg p-1.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs">
            <div className="text-center bg-gray-600 rounded p-1">
              <div className="text-gray-300 text-xs">CRR</div>
              <div className="font-bold text-white text-sm">{matchData.runRate.toFixed(2)}</div>
            </div>
            {matchData.innings === 2 && (
              <>
                <div className="text-center bg-gray-600 rounded p-1">
                  <div className="text-gray-300 text-xs">RRR</div>
                  <div className="font-bold text-white text-sm">{matchData.requiredRunRate.toFixed(2)}</div>
                </div>
                <div className="text-center bg-gray-600 rounded p-1">
                  <div className="text-gray-300 text-xs">Target</div>
                  <div className="font-bold text-white text-sm">{matchData.target}</div>
                </div>
                <div className="text-center bg-gray-600 rounded p-1">
                  <div className="text-gray-300 text-xs">Need</div>
                  <div className="font-bold text-orange-400 text-sm">{matchData.target - matchData.teamB.runs}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ball-by-Ball - Enhanced Single Card with Improved UI */}
        <div className="bg-gray-800 rounded-lg p-1.5">
          <h3 className="text-sm font-semibold mb-2 flex items-center justify-between text-white">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              Live - Over {Math.ceil(matchData.ballByBall.length / 6) || 1}
            </span>
            <span className="text-xs text-gray-400 animate-bounce">← Scroll for overs</span>
          </h3>
          
          {/* Ball-by-Ball - Mobile Responsive Card */}
          <div className="flex justify-center px-2 sm:px-0">
            <div className="bg-gray-800 rounded-xl p-2 sm:p-4 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] overflow-x-auto shadow-lg border border-gray-700">
              {/* Horizontal Scroll Container - Mobile Responsive */}
              <div className="flex space-x-4 sm:space-x-6 md:space-x-8 min-w-max justify-end">
                {/* Previous Overs - Mobile Responsive Layout */}
                {Object.entries(
                  matchData.ballByBall.reduce((acc, ball) => {
                    if (!acc[ball.over]) acc[ball.over] = [];
                    acc[ball.over].push(ball);
                    return acc;
                  }, {} as Record<number, typeof matchData.ballByBall>)
                ).slice(0, -1).map(([overNum, balls]) => (
                  <div key={overNum} className="flex-shrink-0 opacity-70 w-[240px] sm:w-[280px] md:w-[300px]">
                    {/* Previous Over Header - Mobile Responsive */}
                    <div className="text-center mb-2 sm:mb-3 md:mb-4 pb-1.5 sm:pb-2 border-b-2 border-gray-600">
                      <div className="text-sm sm:text-base text-gray-300 font-bold tracking-wide">
                        🏏 OVER {overNum}
                      </div>
                      <div className="text-base sm:text-lg md:text-xl font-black text-white bg-gray-700 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 mt-1 sm:mt-2 inline-block shadow-lg">
                        {balls.reduce((sum, ball) => sum + ball.runs, 0)} RUNS
                      </div>
                    </div>
                    
                    {/* Mobile Responsive 6 Balls Grid */}
                    <div className="grid grid-cols-6 gap-1 sm:gap-1.5 md:gap-2.5 mb-2 sm:mb-3 md:mb-4">
                      {Array.from({ length: 6 }, (_, ballIndex) => {
                        const ball = balls.find(b => b.ball === ballIndex + 1);
                        if (!ball) {
                          return (
                            <div key={ballIndex} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-gray-400 border-2 border-gray-600">
                              •
                            </div>
                          );
                        }
                        
                        let ballColor = "bg-gray-600 text-white";
                        let ballText = ball.runs.toString();
                        
                        if (ball.extras === "W") {
                          ballColor = "bg-red-500 text-white";
                          ballText = "W";
                        } else if (ball.extras === "WD") {
                          ballColor = "bg-purple-500 text-white";
                          ballText = "WD";
                        } else if (ball.extras === "NB") {
                          ballColor = "bg-purple-500 text-white";
                          ballText = "NB";
                        } else if (ball.runs === 6) {
                          ballColor = "bg-green-500 text-white";
                        } else if (ball.runs === 4) {
                          ballColor = "bg-blue-500 text-white";
                        } else if (ball.runs === 0) {
                          ballColor = "bg-gray-700 text-gray-300";
                        }
                        
                        return (
                          <div key={ballIndex} className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${ballColor} rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-gray-500 shadow-md`}>
                            {ballText}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Mobile Responsive Previous Over Summary */}
                    <div className="text-xs sm:text-sm text-gray-300 text-center pt-1 sm:pt-2 border-t-2 border-gray-600 mt-1 sm:mt-2 bg-gray-700 rounded-lg p-1 sm:p-2 shadow-md">
                      <div className="flex justify-center items-center space-x-1 sm:space-x-2 font-medium flex-wrap text-xs">
                        <span>Runs: {balls.reduce((sum, ball) => sum + ball.runs, 0)}</span>
                        <span>•</span>
                        <span>Wickets: {balls.filter(ball => ball.extras === "W").length}</span>
                        <span>•</span>
                        <span>Dots: {balls.filter(ball => ball.runs === 0 && ball.extras !== "W").length}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current Over - Mobile Responsive Main Focus */}
                <div className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px]">
                  {/* Current Over Header - Mobile Responsive */}
                  <div className="text-center mb-2 sm:mb-3 md:mb-4 pb-1.5 sm:pb-2 border-b-2 border-gray-600">
                    <div className="text-sm sm:text-base text-gray-300 font-bold tracking-wide">
                      🏏 CURRENT OVER
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-black text-white bg-gray-700 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 mt-1 sm:mt-2 inline-block shadow-lg">
                      {(() => {
                        const currentOverBalls = matchData.ballByBall.filter(ball => 
                          ball.over === Math.ceil(matchData.ballByBall.length / 6)
                        );
                        return currentOverBalls.reduce((sum, ball) => sum + ball.runs, 0);
                      })()} RUNS
                    </div>
                  </div>
                  
                  {/* Mobile Responsive Perfect 6 Balls Grid */}
                  <div className="grid grid-cols-6 gap-1 sm:gap-1.5 md:gap-2.5 mb-2 sm:mb-3 md:mb-4">
                    {Array.from({ length: 6 }, (_, ballIndex) => {
                      const currentOver = Math.ceil(matchData.ballByBall.length / 6);
                      const ball = matchData.ballByBall.find(b => 
                        b.over === currentOver && b.ball === ballIndex + 1
                      );
                      
                      if (!ball) {
                        return (
                          <div key={ballIndex} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-gray-400 border-2 border-gray-600 animate-pulse">
                            •
                          </div>
                        );
                      }
                      
                      let ballColor = "bg-gray-600 text-white";
                      let ballText = ball.runs.toString();
                      
                      if (ball.extras === "W") {
                        ballColor = "bg-red-500 text-white animate-bounce";
                        ballText = "W";
                      } else if (ball.extras === "WD") {
                        ballColor = "bg-purple-500 text-white";
                        ballText = "WD";
                      } else if (ball.extras === "NB") {
                        ballColor = "bg-purple-500 text-white";
                        ballText = "NB";
                      } else if (ball.runs === 6) {
                        ballColor = "bg-green-500 text-white animate-pulse";
                      } else if (ball.runs === 4) {
                        ballColor = "bg-blue-500 text-white";
                      } else if (ball.runs === 0) {
                        ballColor = "bg-gray-700 text-gray-300";
                      }
                      
                      return (
                        <div key={ballIndex} className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${ballColor} rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-orange-400 shadow-lg transform hover:scale-110 transition-all`}>
                          {ballText}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Mobile Responsive Current Over Summary */}
                  <div className="text-xs sm:text-sm text-gray-300 text-center pt-1 sm:pt-2 border-t-2 border-gray-600 mt-1 sm:mt-2 bg-gray-700 rounded-lg p-1 sm:p-2 shadow-lg">
                    <div className="flex justify-center items-center space-x-1 sm:space-x-2 font-medium flex-wrap text-xs">
                      <span>Runs: {(() => {
                        const currentOverBalls = matchData.ballByBall.filter(ball => 
                          ball.over === Math.ceil(matchData.ballByBall.length / 6)
                        );
                        return currentOverBalls.reduce((sum, ball) => sum + ball.runs, 0);
                      })()}</span>
                      <span>•</span>
                      <span>Wickets: {(() => {
                        const currentOverBalls = matchData.ballByBall.filter(ball => 
                          ball.over === Math.ceil(matchData.ballByBall.length / 6)
                        );
                        return currentOverBalls.filter(ball => ball.extras === "W").length;
                      })()}</span>
                      <span>•</span>
                      <span>Dots: {(() => {
                        const currentOverBalls = matchData.ballByBall.filter(ball => 
                          ball.over === Math.ceil(matchData.ballByBall.length / 6)
                        );
                        return currentOverBalls.filter(ball => ball.runs === 0 && ball.extras !== "W").length;
                      })()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Match Progress */}
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700 text-xs text-gray-300">
            <div className="bg-gray-700/50 px-2 py-1 rounded">
              Total: <span className="text-white font-bold">{matchData.ballByBall.length}</span> balls
            </div>
            <div className="bg-gray-700/50 px-2 py-1 rounded">
              Overs: <span className="text-white font-bold">{Math.floor(matchData.ballByBall.length / 6)}.{matchData.ballByBall.length % 6}</span>
            </div>
          </div>
        </div>

        {/* Players - Ultra-Compact Mobile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Batters */}
          <div className="bg-gray-800 p-1.5 rounded-lg">
            <h3 className="text-sm font-semibold mb-1.5 flex items-center text-white">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Batters
            </h3>
            <div className="space-y-1">
              {matchData.batsmen.map((batsman, index) => (
                <div key={index} className="grid grid-cols-[30px_1fr_60px] gap-2 items-center p-1.5 bg-gray-700 rounded">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    batsman.isOnStrike ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {batsman.isOnStrike ? "🏏" : index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm truncate ${batsman.isOnStrike ? "font-bold text-orange-400" : "font-medium text-white"}`}>
                      {batsman.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      ({batsman.balls}) • SR: {batsman.strikeRate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-white">{batsman.runs}</div>
                    <div className="text-xs text-gray-400">×4 ×6</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bowler */}
          <div className="bg-gray-800 p-1.5 sm:p-2 rounded-lg">
            <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 flex items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-1 sm:mr-2"></span>
              Current Bowler
            </h3>
            <div className="flex justify-between items-center p-1.5 sm:p-2 bg-gray-700 rounded">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-sm">⚾</span>
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base">{matchData.bowler.name}</div>
                  <div className="text-xs text-gray-400">Bowling</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm sm:text-base">{matchData.bowler.figures}</div>
                <div className="text-xs text-gray-400">
                  {matchData.bowler.overs} ov • Econ: {matchData.bowler.economy}
                </div>
              </div>
            </div>
            
            {/* Match Status */}
            <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-1 sm:gap-1.5 text-sm">
                <div className="text-center p-1.5 bg-gray-700 rounded">
                  <div className="text-gray-400 text-xs">Status</div>
                  <div className="font-bold text-orange-400 capitalize">{matchData.status}</div>
                </div>
                <div className="text-center p-1.5 bg-gray-700 rounded">
                  <div className="text-gray-400 text-xs">Inning</div>
                  <div className="font-bold">{matchData.innings === 1 ? "1st" : "2nd"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Score Event */}
        {lastScoreEvent && (
          <div className="mt-1.5 sm:mt-2 p-1.5 sm:p-2 bg-yellow-500 text-yellow-900 text-center font-semibold rounded text-sm">
            {lastScoreEvent}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
