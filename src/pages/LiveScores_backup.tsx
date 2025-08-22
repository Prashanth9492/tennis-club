import React, { useState } from 'react';

const LiveScores: React.FC = () => {
  // State for tab navigation
  const [activeTab, setActiveTab] = useState<'matches' | 'scoreboard' | 'livescores'>('matches');
  
  // State for selected match in scoreboard view
  const [selectedMatchForScoreboard, setSelectedMatchForScoreboard] = useState<string>('1');

  // Team information with logos
  const allTeams = {
    "Aakash-A": { logo: "/src/assets/aakash.png", color: "blue" },
    "Aakash-B": { logo: "/src/assets/aakash.png", color: "blue" },
    "Vayu-A": { logo: "/src/assets/vayu.jpg", color: "green" },
    "Vayu-B": { logo: "/src/assets/vayu.jpg", color: "green" },
    "Agni-A": { logo: "/src/assets/agni.jpg", color: "red" },
    "Agni-B": { logo: "/src/assets/agni.jpg", color: "red" },
    "Jal-A": { logo: "/src/assets/jal.jpg", color: "cyan" },
    "Jal-B": { logo: "/src/assets/jal.jpg", color: "cyan" },
    "Prudhvi-A": { logo: "/src/assets/prudhvi.jpg", color: "yellow" },
    "Prudhvi-B": { logo: "/src/assets/prudhvi.jpg", color: "yellow" }
  };

  const getTeamInfo = (teamName: string) => {
    return allTeams[teamName as keyof typeof allTeams] || { logo: "/placeholder.svg", color: "gray" };
  };

  // Navigation Component
  const Navigation = () => (
    <div className="flex justify-center space-x-1 mb-6">
      {[
        { id: 'matches', label: 'Matches', icon: '🏏' },
        { id: 'scoreboard', label: 'Scoreboard', icon: '📊' },
        { id: 'livescores', label: 'Live Scores', icon: '🔴' }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as typeof activeTab)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
            activeTab === tab.id
              ? 'bg-orange-500 text-white shadow-lg transform scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );

  // Matches Info Component (your existing MatchesInfo)
  const MatchesInfo = () => {
    const [filter, setFilter] = useState<'all' | 'live' | 'completed' | 'upcoming'>('all');

    const allMatches = [
      {
        id: 1,
        teamA: "Aakash-A",
        teamB: "Vayu-A", 
        scoreA: "184/6 (20)",
        scoreB: "169/8 (20)",
        status: "completed",
        result: "Aakash-A won by 15 runs",
        date: "2025-08-22",
        time: "10:00 AM",
        venue: "Ground 1"
      },
      {
        id: 2,
        teamA: "Prudhvi-B",
        teamB: "Jal-A",
        scoreA: "156/4 (18.2)",
        scoreB: "Yet to bat",
        status: "live",
        result: "Prudhvi-B batting",
        date: "2025-08-22",
        time: "2:00 PM",
        venue: "Ground 2"
      },
      {
        id: 3,
        teamA: "Agni-A",
        teamB: "Vayu-B",
        scoreA: "TBD",
        scoreB: "TBD",
        status: "upcoming",
        result: "Match starts at 6:00 PM",
        date: "2025-08-22",
        time: "6:00 PM",
        venue: "Ground 1"
      },
      {
        id: 4,
        teamA: "Aakash-B",
        teamB: "Prudhvi-A",
        scoreA: "TBD",
        scoreB: "TBD",
        status: "upcoming",
        result: "Tomorrow's match",
        date: "2025-08-23",
        time: "10:00 AM",
        venue: "Ground 2"
      }
    ];

    const filteredMatches = filter === 'all' ? allMatches : allMatches.filter(match => match.status === filter);

    const handleMatchCardClick = (matchId: string) => {
      setSelectedMatchForScoreboard(matchId);
      setActiveTab('scoreboard');
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">🏏 Cricket Tournament</h1>
          
          {/* Filter Buttons */}
          <div className="flex justify-center space-x-2 mb-6">
            {[
              { id: 'all', label: 'All Matches', count: allMatches.length },
              { id: 'live', label: 'Live', count: allMatches.filter(m => m.status === 'live').length },
              { id: 'completed', label: 'Completed', count: allMatches.filter(m => m.status === 'completed').length },
              { id: 'upcoming', label: 'Upcoming', count: allMatches.filter(m => m.status === 'upcoming').length }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  filter === filterOption.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{filterOption.label}</span>
                <span className="bg-gray-800 text-orange-400 px-2 py-1 rounded-full text-xs">
                  {filterOption.count}
                </span>
              </button>
            ))}
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.map((match) => {
              const teamAInfo = getTeamInfo(match.teamA);
              const teamBInfo = getTeamInfo(match.teamB);
              
              return (
                <div 
                  key={match.id} 
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 cursor-pointer hover:bg-gray-750 hover:border-orange-500 transition-all duration-200 transform hover:scale-[1.02]"
                  onClick={() => handleMatchCardClick(match.id.toString())}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Teams Section */}
                    <div className="flex items-center space-x-4">
                      {/* Team A */}
                      <div className="flex items-center space-x-2">
                        <img 
                          src={teamAInfo.logo} 
                          alt={match.teamA}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold">{match.teamA}</div>
                          <div className="text-sm text-gray-400">{match.scoreA}</div>
                        </div>
                      </div>
                      
                      <div className="text-xl font-bold text-gray-400">VS</div>
                      
                      {/* Team B */}
                      <div className="flex items-center space-x-2">
                        <img 
                          src={teamBInfo.logo} 
                          alt={match.teamB}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold">{match.teamB}</div>
                          <div className="text-sm text-gray-400">{match.scoreB}</div>
                        </div>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          match.status === 'live' ? 'bg-red-500 text-white' :
                          match.status === 'completed' ? 'bg-green-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {match.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <div>{match.date} • {match.time}</div>
                        <div>{match.venue}</div>
                      </div>
                      <div className="text-sm font-semibold text-orange-400 mt-2">
                        {match.result}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Scoreboard Component - Now shows details for completed, live, and upcoming matches
  const ScoreboardView = () => {
    const detailedMatchData = {
      '1': {
        teamA: { name: "Aakash-A", runs: 184, wickets: 6, overs: 20.0, logo: "/src/assets/aakash.png" },
        teamB: { name: "Vayu-A", runs: 169, wickets: 8, overs: 20.0, logo: "/src/assets/vayu.jpg" },
        result: "Aakash-A won by 15 runs",
        status: "completed",
        venue: "Ground 1",
        date: "2025-08-22",
        time: "10:00 AM",
        toss: "Aakash-A won toss and elected to bat first",
        batsmen: [
          { name: "Arpit Rana", runs: 45, balls: 32, fours: 4, sixes: 1, strikeRate: 140.63, status: "not out" },
          { name: "Sujal Singh", runs: 38, balls: 28, fours: 3, sixes: 2, strikeRate: 135.71, status: "c Mohan b Prashanth" },
          { name: "Rohit Sharma", runs: 22, balls: 18, fours: 2, sixes: 0, strikeRate: 122.22, status: "lbw b Surya" },
          { name: "Virat Kohli", runs: 34, balls: 25, fours: 3, sixes: 1, strikeRate: 136.00, status: "run out" },
          { name: "MS Dhoni", runs: 28, balls: 15, fours: 1, sixes: 2, strikeRate: 186.67, status: "not out" }
        ],
        batsmenTeamB: [
          { name: "MOHAN SIVA", runs: 35, balls: 22, fours: 4, sixes: 1, strikeRate: 159.09, status: "c Arpit b Sujal" },
          { name: "PRASHANTH", runs: 42, balls: 31, fours: 5, sixes: 0, strikeRate: 135.48, status: "b Rohit" },
          { name: "SURYA", runs: 28, balls: 19, fours: 2, sixes: 2, strikeRate: 147.37, status: "not out" },
          { name: "ESWAR", runs: 18, balls: 14, fours: 2, sixes: 0, strikeRate: 128.57, status: "run out" },
          { name: "RAVI", runs: 25, balls: 16, fours: 3, sixes: 1, strikeRate: 156.25, status: "c MS b Virat" }
        ],
        bowlers: [
          { name: "PRASHANTH", overs: 4.0, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
          { name: "MOHAN SIVA", overs: 4.0, maidens: 1, runs: 28, wickets: 1, economy: 7.00 },
          { name: "SURYA", overs: 4.0, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
          { name: "ESWAR", overs: 3.0, maidens: 0, runs: 25, wickets: 0, economy: 8.33 }
        ],
        bowlersTeamA: [
          { name: "Arpit Rana", overs: 3.0, maidens: 0, runs: 22, wickets: 1, economy: 7.33 },
          { name: "Sujal Singh", overs: 4.0, maidens: 1, runs: 18, wickets: 2, economy: 4.50 },
          { name: "Rohit Sharma", overs: 4.0, maidens: 0, runs: 31, wickets: 1, economy: 7.75 },
          { name: "Virat Kohli", overs: 2.0, maidens: 0, runs: 15, wickets: 1, economy: 7.50 }
        ]
      },
      '2': {
        teamA: { name: "Prudhvi-B", runs: 156, wickets: 4, overs: 18.2, logo: "/src/assets/prudhvi.jpg" },
        teamB: { name: "Jal-A", runs: 0, wickets: 0, overs: 0.0, logo: "/src/assets/jal.jpg" },
        result: "Match in progress - Prudhvi-B batting",
        status: "live",
        venue: "Ground 2",
        date: "2025-08-22",
        time: "2:00 PM",
        toss: "Prudhvi-B won toss and elected to bat first",
        batsmen: [
          { name: "Kiran Kumar", runs: 67, balls: 45, fours: 6, sixes: 2, strikeRate: 148.89, status: "not out", isOnStrike: true },
          { name: "Rajesh Babu", runs: 23, balls: 18, fours: 2, sixes: 1, strikeRate: 127.78, status: "not out", isOnStrike: false },
          { name: "Anil Reddy", runs: 18, balls: 14, fours: 2, sixes: 0, strikeRate: 128.57, status: "c & b Ramesh" },
          { name: "Suresh Kumar", runs: 31, balls: 22, fours: 3, sixes: 1, strikeRate: 140.91, status: "run out" }
        ],
        batsmenTeamB: [],
        bowlers: [
          { name: "RAMESH", overs: 3.2, maidens: 0, runs: 28, wickets: 1, economy: 8.40 },
          { name: "VENKAT", overs: 4.0, maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
          { name: "KUMAR", overs: 4.0, maidens: 1, runs: 22, wickets: 1, economy: 5.50 },
          { name: "KRISHNA", overs: 3.0, maidens: 0, runs: 31, wickets: 1, economy: 10.33 }
        ],
        bowlersTeamA: []
      },
      '3': {
        teamA: { name: "Agni-A", runs: 0, wickets: 0, overs: 0.0, logo: "/src/assets/agni.jpg" },
        teamB: { name: "Vayu-B", runs: 0, wickets: 0, overs: 0.0, logo: "/src/assets/vayu.jpg" },
        result: "Match starts at 6:00 PM",
        status: "upcoming",
        venue: "Ground 1",
        date: "2025-08-22",
        time: "6:00 PM",
        toss: "Toss at 5:45 PM",
        batsmen: [],
        batsmenTeamB: [],
        bowlers: [],
        bowlersTeamA: []
      },
      '4': {
        teamA: { name: "Aakash-B", runs: 0, wickets: 0, overs: 0.0, logo: "/src/assets/aakash.png" },
        teamB: { name: "Prudhvi-A", runs: 0, wickets: 0, overs: 0.0, logo: "/src/assets/prudhvi.jpg" },
        result: "Tomorrow's match",
        status: "upcoming",
        venue: "Ground 2",
        date: "2025-08-23",
        time: "10:00 AM",
        toss: "Toss at 9:45 AM",
        batsmen: [],
        batsmenTeamB: [],
        bowlers: [],
        bowlersTeamA: []
      }
    };

    // Get the current match based on selection (regardless of status)
    const currentMatch = selectedMatchForScoreboard ? detailedMatchData[selectedMatchForScoreboard as keyof typeof detailedMatchData] : null;

    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">🏏 Match Scoreboard</h1>
            <button
              onClick={() => setActiveTab('matches')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Matches
            </button>
          </div>
          
          {/* Match Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Match:</label>
            <select
              value={selectedMatchForScoreboard}
              onChange={(e) => setSelectedMatchForScoreboard(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
            >
              {Object.entries(detailedMatchData).map(([matchId, match]) => (
                <option key={matchId} value={matchId}>
                  {match.status === 'live' ? '🔴' : match.status === 'completed' ? '✅' : '⏰'} 
                  {match.teamA.name} vs {match.teamB.name} ({match.status.charAt(0).toUpperCase() + match.status.slice(1)})
                </option>
              ))}
            </select>
          </div>

          {/* Current Match Display */}
          {currentMatch && (
            <>
              {/* Match Info Header */}
              <div className={`bg-gray-800 rounded-lg p-6 mb-6 border-l-4 ${
                currentMatch.status === 'live' ? 'border-red-500' :
                currentMatch.status === 'completed' ? 'border-green-500' :
                'border-yellow-500'
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    currentMatch.status === 'live' ? 'bg-red-500 animate-pulse' :
                    currentMatch.status === 'completed' ? 'bg-green-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <span className={`font-bold text-sm ${
                    currentMatch.status === 'live' ? 'text-red-500' :
                    currentMatch.status === 'completed' ? 'text-green-500' :
                    'text-yellow-500'
                  }`}>
                    {currentMatch.status === 'live' ? 'LIVE MATCH' :
                     currentMatch.status === 'completed' ? 'COMPLETED MATCH' :
                     'UPCOMING MATCH'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div className="text-center lg:text-left">
                    <div className="text-sm text-gray-400">Date & Time</div>
                    <div className="font-semibold">{currentMatch.date} • {currentMatch.time}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Venue</div>
                    <div className="font-semibold">{currentMatch.venue}</div>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="text-sm text-gray-400">Toss</div>
                    <div className="font-semibold">{currentMatch.toss}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={currentMatch.teamA.logo} 
                      alt={currentMatch.teamA.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xl font-bold">{currentMatch.teamA.name}</div>
                      {currentMatch.status !== 'upcoming' && (
                        <div className="text-lg">{currentMatch.teamA.runs}/{currentMatch.teamA.wickets} ({currentMatch.teamA.overs})</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-500">VS</div>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      currentMatch.status === 'live' ? 'bg-red-500 text-white animate-pulse' :
                      currentMatch.status === 'completed' ? 'bg-green-500 text-white' :
                      'bg-yellow-500 text-black'
                    }`}>
                      {currentMatch.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xl font-bold">{currentMatch.teamB.name}</div>
                      {currentMatch.status !== 'upcoming' && (
                        <div className="text-lg">{currentMatch.teamB.runs}/{currentMatch.teamB.wickets} ({currentMatch.teamB.overs})</div>
                      )}
                    </div>
                    <img 
                      src={currentMatch.teamB.logo} 
                      alt={currentMatch.teamB.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center text-lg font-semibold text-green-400">
                  {currentMatch.result}
                </div>
              </div>

              {/* Conditional Content Based on Match Status */}
              {currentMatch.status === 'upcoming' ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">⏰</div>
                  <h2 className="text-2xl font-bold mb-2">Match Yet to Start</h2>
                  <p className="text-gray-400 mb-4">
                    This match is scheduled for {currentMatch.date} at {currentMatch.time}
                  </p>
                  <div className="text-lg text-orange-500 font-semibold">
                    {currentMatch.toss}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Show detailed scorecards for completed and live matches */}
                  
                  {/* Team A Batting Scorecard */}
                  {currentMatch.batsmen && currentMatch.batsmen.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamA.logo} 
                          alt={currentMatch.teamA.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        {currentMatch.teamA.name} Batting - {currentMatch.teamA.runs}/{currentMatch.teamA.wickets} ({currentMatch.teamA.overs})
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2">Batsman</th>
                              <th className="text-right py-2">Runs</th>
                              <th className="text-right py-2">Balls</th>
                              <th className="text-right py-2">4s</th>
                              <th className="text-right py-2">6s</th>
                              <th className="text-right py-2">S/R</th>
                              <th className="text-left py-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.batsmen.map((batsman, index) => (
                              <tr key={index} className="border-b border-gray-700">
                                <td className="py-2 font-medium flex items-center">
                                  {batsman.name}
                                  {batsman.isOnStrike && <span className="ml-2 text-xs bg-green-500 px-1 py-0.5 rounded">*</span>}
                                </td>
                                <td className="text-right py-2">{batsman.runs}</td>
                                <td className="text-right py-2">{batsman.balls}</td>
                                <td className="text-right py-2">{batsman.fours}</td>
                                <td className="text-right py-2">{batsman.sixes}</td>
                                <td className="text-right py-2">{batsman.strikeRate.toFixed(2)}</td>
                                <td className="py-2 text-gray-400">{batsman.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Team B Bowling Scorecard */}
                  {currentMatch.bowlers && currentMatch.bowlers.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamB.logo} 
                          alt={currentMatch.teamB.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        {currentMatch.teamB.name} Bowling
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2">Bowler</th>
                              <th className="text-right py-2">Overs</th>
                              <th className="text-right py-2">Maidens</th>
                              <th className="text-right py-2">Runs</th>
                              <th className="text-right py-2">Wickets</th>
                              <th className="text-right py-2">Economy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.bowlers.map((bowler, index) => (
                              <tr key={index} className="border-b border-gray-700">
                                <td className="py-2 font-medium">{bowler.name}</td>
                                <td className="text-right py-2">{bowler.overs}</td>
                                <td className="text-right py-2">{bowler.maidens}</td>
                                <td className="text-right py-2">{bowler.runs}</td>
                                <td className="text-right py-2">{bowler.wickets}</td>
                                <td className="text-right py-2">{bowler.economy.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Team B Batting Scorecard (if available) */}
                  {currentMatch.batsmenTeamB && currentMatch.batsmenTeamB.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamB.logo} 
                          alt={currentMatch.teamB.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        {currentMatch.teamB.name} Batting - {currentMatch.teamB.runs}/{currentMatch.teamB.wickets} ({currentMatch.teamB.overs})
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2">Batsman</th>
                              <th className="text-right py-2">Runs</th>
                              <th className="text-right py-2">Balls</th>
                              <th className="text-right py-2">4s</th>
                              <th className="text-right py-2">6s</th>
                              <th className="text-right py-2">S/R</th>
                              <th className="text-left py-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.batsmenTeamB.map((batsman, index) => (
                              <tr key={index} className="border-b border-gray-700">
                                <td className="py-2 font-medium">{batsman.name}</td>
                                <td className="text-right py-2">{batsman.runs}</td>
                                <td className="text-right py-2">{batsman.balls}</td>
                                <td className="text-right py-2">{batsman.fours}</td>
                                <td className="text-right py-2">{batsman.sixes}</td>
                                <td className="text-right py-2">{batsman.strikeRate.toFixed(2)}</td>
                                <td className="py-2 text-gray-400">{batsman.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Team A Bowling Scorecard (if available) */}
                  {currentMatch.bowlersTeamA && currentMatch.bowlersTeamA.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamA.logo} 
                          alt={currentMatch.teamA.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        {currentMatch.teamA.name} Bowling
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2">Bowler</th>
                              <th className="text-right py-2">Overs</th>
                              <th className="text-right py-2">Maidens</th>
                              <th className="text-right py-2">Runs</th>
                              <th className="text-right py-2">Wickets</th>
                              <th className="text-right py-2">Economy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.bowlersTeamA.map((bowler, index) => (
                              <tr key={index} className="border-b border-gray-700">
                                <td className="py-2 font-medium">{bowler.name}</td>
                                <td className="text-right py-2">{bowler.overs}</td>
                                <td className="text-right py-2">{bowler.maidens}</td>
                                <td className="text-right py-2">{bowler.runs}</td>
                                <td className="text-right py-2">{bowler.wickets}</td>
                                <td className="text-right py-2">{bowler.economy.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // Live Scores Component (original component for live matches only)
  const LiveScoresView = () => {
    // Initial match data for live scoring
    const initialMatchData = {
      teamA: { 
        name: "Aakash-A", 
        runs: 15, 
        wickets: 2, 
        overs: 2.2, 
        logo: "/src/assets/aakash.png" 
      },
      teamB: { 
        name: "Vayu-A", 
        runs: 0, 
        wickets: 0, 
        overs: 0.0, 
        logo: "/src/assets/vayu.jpg" 
      },
      batsmen: [
        { name: "Arpit Rana", runs: 2, balls: 7, strikeRate: 28.6, isOnStrike: true, isOut: false },
        { name: "Sujal Singh", runs: 0, balls: 0, strikeRate: 0, isOnStrike: false, isOut: false }
      ],
      bowler: { name: "PRASHANTH", figures: "2/28", overs: 4.0, economy: 7.0 },
      venue: "Ground 1",
      status: "1st Innings",
      target: null,
      requiredRate: null,
      lastOver: [1, 0, 4, 2, 0, 6],
      betting: {
        twentyOverRuns: { no: 183, yes: 184 },
        open: { value: 55, min: 47, max: 189 }
      },
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
        { over: 3, ball: 2, runs: 1, batsman: "Rohit Sharma", bowler: "RASHID", extras: "" }
      ]
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">🔴 Live Cricket Score</h1>
          
          {/* Main Score Board */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team A */}
              <div className="flex items-center space-x-4">
                <img 
                  src={initialMatchData.teamA.logo} 
                  alt={initialMatchData.teamA.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="text-2xl font-bold">{initialMatchData.teamA.name}</div>
                  <div className="text-xl">{initialMatchData.teamA.runs}/{initialMatchData.teamA.wickets}</div>
                  <div className="text-sm text-gray-400">({initialMatchData.teamA.overs} overs)</div>
                </div>
              </div>
              
              {/* VS & Status */}
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">VS</div>
                <div className="text-sm bg-red-500 text-white px-3 py-1 rounded-full inline-block animate-pulse">
                  🔴 LIVE
                </div>
                <div className="text-sm text-gray-400 mt-2">{initialMatchData.status}</div>
                <div className="text-xs text-gray-500">{initialMatchData.venue}</div>
              </div>
              
              {/* Team B */}
              <div className="flex items-center space-x-4 justify-end">
                <div className="text-right">
                  <div className="text-2xl font-bold">{initialMatchData.teamB.name}</div>
                  <div className="text-xl">{initialMatchData.teamB.runs}/{initialMatchData.teamB.wickets}</div>
                  <div className="text-sm text-gray-400">({initialMatchData.teamB.overs} overs)</div>
                </div>
                <img 
                  src={initialMatchData.teamB.logo} 
                  alt={initialMatchData.teamB.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Current Batsmen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-orange-500">Current Batsmen</h3>
              <div className="space-y-3">
                {initialMatchData.batsmen.map((batsman, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <span className={batsman.isOnStrike ? "text-green-400 font-bold" : ""}>{batsman.name}</span>
                      {batsman.isOnStrike && <span className="text-xs bg-green-500 px-2 py-1 rounded">*</span>}
                    </div>
                    <div className="text-right">
                      <div>{batsman.runs}({batsman.balls})</div>
                      <div className="text-sm text-gray-400">SR: {batsman.strikeRate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-orange-500">Current Bowler</h3>
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">{initialMatchData.bowler.name}</div>
                    <div className="text-sm text-gray-400">{initialMatchData.bowler.overs} overs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{initialMatchData.bowler.figures}</div>
                    <div className="text-sm text-gray-400">Economy: {initialMatchData.bowler.economy}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Over */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-orange-500">Last Over</h3>
            <div className="flex space-x-2">
              {initialMatchData.lastOver.map((ball, index) => (
                <div 
                  key={index} 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    ball === 4 ? 'bg-green-500' : 
                    ball === 6 ? 'bg-purple-500' : 
                    ball === 0 ? 'bg-gray-600' : 
                    'bg-blue-500'
                  }`}
                >
                  {ball}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Total: {initialMatchData.lastOver.reduce((a, b) => a + b, 0)} runs
            </div>
          </div>

          {/* Betting Odds */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-500">Live Betting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-sm text-gray-400 mb-2">20 Over Runs</div>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-400">No</div>
                    <div>{initialMatchData.betting.twentyOverRuns.no}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">Yes</div>
                    <div>{initialMatchData.betting.twentyOverRuns.yes}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <div className="text-sm text-gray-400 mb-2">Open Rate</div>
                <div className="text-lg font-bold">{initialMatchData.betting.open.value}</div>
                <div className="text-xs text-gray-500">
                  Min: {initialMatchData.betting.open.min} | Max: {initialMatchData.betting.open.max}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      {activeTab === 'matches' && <MatchesInfo />}
      {activeTab === 'scoreboard' && <ScoreboardView />}
      {activeTab === 'livescores' && <LiveScoresView />}
    </div>
  );
};

export default LiveScores;
