import React, { useState } from 'react';

const LiveScores: React.FC = () => {
  // State for tab navigation - reordered as requested
  const [activeTab, setActiveTab] = useState<'livescores' | 'matches' | 'scoreboard'>('livescores');
  
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

  // Bat and Bowl Icons Components
  const BatIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.5 20.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5H3.5M7.91 17.89c-.39-.39-.39-1.02 0-1.41l8.48-8.48c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-8.48 8.48c-.39.39-1.02.39-1.41 0M12.5 2.5L21 11l-1.5 1.5-8.5-8.5L12.5 2.5z"/>
    </svg>
  );

  const BallIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2c-1.5 2.5-1.5 7.5 0 10 1.5-2.5 1.5-7.5 0-10z" fill="white" opacity="0.3"/>
      <path d="M2 12c2.5-1.5 7.5-1.5 10 0-2.5 1.5-7.5 1.5-10 0z" fill="white" opacity="0.3"/>
    </svg>
  );

  // Mobile-responsive Navigation Component with normal navbar styling
  const Navigation = () => (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-2 sm:space-x-6">
            {[
              { id: 'livescores', label: 'Live Scores', icon: '🔴' },
              { id: 'matches', label: 'Matches Info', icon: '📋' },
              { id: 'scoreboard', label: 'Scoreboard', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-1 py-3 px-2 text-xs sm:text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-300 border-transparent hover:text-white hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  // Matches Info Component with improved mobile responsiveness
  const MatchesInfo = () => {
    const [filter, setFilter] = useState<'all' | 'live' | 'completed' | 'upcoming'>('all');
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

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
        venue: "Ground 1",
        winner: "Aakash-A"
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
        venue: "Ground 2",
        winner: null
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
        venue: "Ground 1",
        winner: null
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
        venue: "Ground 2",
        winner: null
      },
      // Historical matches for team statistics
      {
        id: 5,
        teamA: "Aakash-A",
        teamB: "Agni-B",
        scoreA: "167/7 (20)",
        scoreB: "165/9 (20)",
        status: "completed",
        result: "Aakash-A won by 2 runs",
        date: "2025-08-20",
        time: "2:00 PM",
        venue: "Ground 2",
        winner: "Aakash-A"
      },
      {
        id: 6,
        teamA: "Vayu-A",
        teamB: "Jal-B",
        scoreA: "145/8 (20)",
        scoreB: "146/4 (19.3)",
        status: "completed",
        result: "Jal-B won by 6 wickets",
        date: "2025-08-19",
        time: "10:00 AM",
        venue: "Ground 1",
        winner: "Jal-B"
      },
      {
        id: 7,
        teamA: "Prudhvi-A",
        teamB: "Aakash-A",
        scoreA: "134/9 (20)",
        scoreB: "135/3 (18.2)",
        status: "completed",
        result: "Aakash-A won by 7 wickets",
        date: "2025-08-18",
        time: "6:00 PM",
        venue: "Ground 1",
        winner: "Aakash-A"
      },
      {
        id: 8,
        teamA: "Vayu-B",
        teamB: "Vayu-A",
        scoreA: "152/6 (20)",
        scoreB: "152/7 (20)",
        status: "completed",
        result: "Match Tied",
        date: "2025-08-17",
        time: "2:00 PM",
        venue: "Ground 2",
        winner: "tie"
      },
      {
        id: 9,
        teamA: "Agni-A",
        teamB: "Jal-A",
        scoreA: "178/5 (20)",
        scoreB: "162/8 (20)",
        status: "completed",
        result: "Agni-A won by 16 runs",
        date: "2025-08-16",
        time: "10:00 AM",
        venue: "Ground 1",
        winner: "Agni-A"
      },
      {
        id: 10,
        teamA: "Prudhvi-B",
        teamB: "Aakash-B",
        scoreA: "143/9 (20)",
        scoreB: "144/3 (19.1)",
        status: "completed",
        result: "Aakash-B won by 7 wickets",
        date: "2025-08-15",
        time: "2:00 PM",
        venue: "Ground 2",
        winner: "Aakash-B"
      }
    ];

    // Team statistics calculation
    const getTeamStats = (teamName: string) => {
      const teamMatches = allMatches.filter(match => 
        (match.teamA === teamName || match.teamB === teamName) && match.status === 'completed'
      );
      
      let wins = 0;
      let losses = 0;
      let ties = 0;
      let totalRuns = 0;
      let totalMatches = 0;

      teamMatches.forEach(match => {
        if (match.winner === teamName) {
          wins++;
        } else if (match.winner === 'tie') {
          ties++;
        } else if (match.winner) {
          losses++;
        }

        // Calculate total runs scored by this team
        if (match.teamA === teamName && match.scoreA !== 'TBD') {
          const scoreMatch = match.scoreA.match(/(\d+)/);
          if (scoreMatch) {
            totalRuns += parseInt(scoreMatch[1]);
            totalMatches++;
          }
        } else if (match.teamB === teamName && match.scoreB !== 'TBD' && match.scoreB !== 'Yet to bat') {
          const scoreMatch = match.scoreB.match(/(\d+)/);
          if (scoreMatch) {
            totalRuns += parseInt(scoreMatch[1]);
            totalMatches++;
          }
        }
      });

      const winPercentage = teamMatches.length > 0 ? ((wins / teamMatches.length) * 100).toFixed(1) : '0.0';
      const avgRuns = totalMatches > 0 ? (totalRuns / totalMatches).toFixed(1) : '0.0';

      return {
        totalMatches: teamMatches.length,
        wins,
        losses,
        ties,
        winPercentage,
        avgRuns,
        recentForm: teamMatches.slice(-5).map(match => {
          if (match.winner === teamName) return 'W';
          if (match.winner === 'tie') return 'T';
          return 'L';
        }).reverse()
      };
    };

    // Get all unique teams
    const allTeamNames = Array.from(new Set([
      ...allMatches.map(match => match.teamA),
      ...allMatches.map(match => match.teamB)
    ])).sort();

    const filteredMatches = selectedTeam 
      ? allMatches.filter(match => match.teamA === selectedTeam || match.teamB === selectedTeam)
      : filter === 'all' 
        ? allMatches 
        : allMatches.filter(match => match.status === filter);

    const handleMatchCardClick = (matchId: string) => {
      setSelectedMatchForScoreboard(matchId);
      setActiveTab('scoreboard');
    };

    // Team History View
    if (selectedTeam) {
      const teamStats = getTeamStats(selectedTeam);
      const teamInfo = getTeamInfo(selectedTeam);
      const teamMatches = allMatches.filter(match => 
        match.teamA === selectedTeam || match.teamB === selectedTeam
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedTeam(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <span>←</span>
                <span>Back to All Teams</span>
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
                Team History
              </h1>
              <div></div>
            </div>

            {/* Team Header */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mb-6 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={teamInfo.logo} 
                  alt={selectedTeam}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-600 mr-6"
                />
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold">{selectedTeam}</h2>
                  <p className="text-gray-400 font-semibold">Team Statistics</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{teamStats.totalMatches}</div>
                  <div className="text-xs text-gray-400">Matches</div>
                </div>
                <div className="text-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{teamStats.wins}</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="text-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-gray-400">{teamStats.losses}</div>
                  <div className="text-xs text-gray-400">Losses</div>
                </div>
                <div className="text-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{teamStats.ties}</div>
                  <div className="text-xs text-gray-400">Ties</div>
                </div>
                <div className="text-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{teamStats.winPercentage}%</div>
                  <div className="text-xs text-gray-400">Win Rate</div>
                </div>
                <div className="text-center bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{teamStats.avgRuns}</div>
                  <div className="text-xs text-gray-400">Avg Runs</div>
                </div>
              </div>

              {teamStats.recentForm.length > 0 && (
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-bold mb-3">Recent Form</h3>
                  <div className="flex justify-center space-x-2">
                    {teamStats.recentForm.map((result, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          result === 'W' ? 'bg-green-500 text-white' :
                          result === 'L' ? 'bg-gray-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Match History */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Match History ({teamMatches.length} matches)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {teamMatches.map((match) => {
                  const isTeamA = match.teamA === selectedTeam;
                  const opponent = isTeamA ? match.teamB : match.teamA;
                  const teamScore = isTeamA ? match.scoreA : match.scoreB;
                  const oppScore = isTeamA ? match.scoreB : match.scoreA;
                  const opponentInfo = getTeamInfo(opponent);
                  
                  return (
                    <div key={match.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                      <div className="flex justify-between items-center mb-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          match.status === 'completed' ? 'bg-green-500 text-white' :
                          match.status === 'live' ? 'bg-gray-600 text-white animate-pulse' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {match.status.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {match.date} • {match.time}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={teamInfo.logo} 
                            alt={selectedTeam}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                          />
                          <div>
                            <div className="font-bold">{selectedTeam}</div>
                            <div className="text-sm text-gray-400">{teamScore}</div>
                          </div>
                        </div>
                        
                        <div className="text-gray-400 font-bold">VS</div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="font-bold">{opponent}</div>
                            <div className="text-sm text-gray-400">{oppScore}</div>
                          </div>
                          <img 
                            src={opponentInfo.logo} 
                            alt={opponent}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                          />
                        </div>
                      </div>
                      
                      <div className={`text-center p-2 rounded-lg font-semibold text-sm ${
                        match.winner === selectedTeam ? 'bg-green-500/20 text-green-400' :
                        match.winner === 'tie' ? 'bg-yellow-500/20 text-yellow-400' :
                        match.winner ? 'bg-gray-600/20 text-gray-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {match.result}
                      </div>
                      
                      <div className="text-xs text-gray-500 text-center mt-2">
                        📍 {match.venue}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-white">
            🏏 Cricket Tournament
          </h1>
          
          {/* Filter Buttons - Mobile Responsive */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
            {[
              { id: 'all', label: 'All Matches', count: allMatches.length, icon: '📋' },
              { id: 'live', label: 'Live', count: allMatches.filter(m => m.status === 'live').length, icon: '🔴' },
              { id: 'completed', label: 'Completed', count: allMatches.filter(m => m.status === 'completed').length, icon: '✅' },
              { id: 'upcoming', label: 'Upcoming', count: allMatches.filter(m => m.status === 'upcoming').length, icon: '⏰' }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as typeof filter)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm border ${
                  filter === filterOption.id
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border-gray-600 hover:border-gray-500'
                }`}
              >
                <span className="text-sm">{filterOption.icon}</span>
                <span className="font-semibold">{filterOption.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  filter === filterOption.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {filterOption.count}
                </span>
              </button>
            ))}
          </div>

          {/* Team Filter Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">🏏 Select Team to View History:</label>
            <select
              value={selectedTeam || ''}
              onChange={(e) => setSelectedTeam(e.target.value || null)}
              className="w-full sm:w-auto bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors min-w-[300px]"
            >
              <option value="">All Teams - Show All Matches</option>
              {allTeamNames.map((teamName) => (
                <option key={teamName} value={teamName}>
                  {teamName}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Team Indicator */}
          {selectedTeam && (
            <div className="mb-6 bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={getTeamInfo(selectedTeam).logo} 
                    alt={selectedTeam}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">Viewing {selectedTeam} History</h3>
                    <p className="text-sm text-gray-300">
                      {(() => {
                        const stats = getTeamStats(selectedTeam);
                        return `${stats.totalMatches} total matches | ${stats.wins} wins | ${stats.losses} losses${stats.ties > 0 ? ` | ${stats.ties} ties` : ''} | ${stats.winPercentage}% win rate`;
                      })()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}

          {/* Matches Section Title */}
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              {selectedTeam 
                ? `${selectedTeam} Match History (${filteredMatches.length} matches)` 
                : `All Tournament Matches (${filteredMatches.length} matches)`
              }
            </h2>
            {selectedTeam && (
              <p className="text-center text-gray-400 text-sm mt-2">
                Showing all matches involving {selectedTeam}
              </p>
            )}
          </div>

          {/* Matches Grid - Enhanced Mobile Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredMatches.map((match) => {
              const teamAInfo = getTeamInfo(match.teamA);
              const teamBInfo = getTeamInfo(match.teamB);
              
              return (
                <div 
                  key={match.id} 
                  className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 cursor-pointer hover:bg-gray-750 hover:border-gray-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10"
                  onClick={() => handleMatchCardClick(match.id.toString())}
                >
                  {/* Match Status Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                      match.status === 'live' ? 'bg-gray-600 text-white animate-pulse' :
                      match.status === 'completed' ? 'bg-green-500 text-white' :
                      'bg-yellow-500 text-black'
                    }`}>
                      <span>
                        {match.status === 'live' ? '🔴' :
                         match.status === 'completed' ? '✅' : '⏰'}
                      </span>
                      <span>{match.status.toUpperCase()}</span>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>{match.date}</div>
                      <div>{match.time}</div>
                    </div>
                  </div>
                  
                  {/* Teams Section - Mobile Optimized */}
                  <div className="space-y-3 mb-4">
                    {/* Team A */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <img 
                          src={teamAInfo.logo} 
                          alt={match.teamA}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-600"
                        />
                        <div className="flex-1">
                          <div className={`font-bold text-sm sm:text-base ${
                            selectedTeam && match.teamA === selectedTeam 
                              ? 'text-blue-400 bg-blue-500/20 px-2 py-1 rounded' 
                              : ''
                          }`}>
                            {match.teamA}
                            {selectedTeam && match.teamA === selectedTeam && ' ⭐'}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center space-x-1">
                            <BatIcon className="w-3 h-3" />
                            <span>Batting</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-base sm:text-lg">{match.scoreA}</div>
                      </div>
                    </div>
                    
                    {/* VS Divider */}
                    <div className="flex items-center justify-center">
                      <div className="flex-1 h-px bg-gray-600"></div>
                      <div className="px-3 text-xs font-bold text-gray-400">VS</div>
                      <div className="flex-1 h-px bg-gray-600"></div>
                    </div>
                    
                    {/* Team B */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <img 
                          src={teamBInfo.logo} 
                          alt={match.teamB}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-600"
                        />
                        <div className="flex-1">
                          <div className={`font-bold text-sm sm:text-base ${
                            selectedTeam && match.teamB === selectedTeam 
                              ? 'text-blue-400 bg-blue-500/20 px-2 py-1 rounded' 
                              : ''
                          }`}>
                            {match.teamB}
                            {selectedTeam && match.teamB === selectedTeam && ' ⭐'}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center space-x-1">
                            <BallIcon className="w-3 h-3" />
                            <span>Bowling</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-base sm:text-lg">{match.scoreB}</div>
                      </div>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="border-t border-gray-700 pt-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-2">
                      <div>
                        <span className="font-medium">📍 Venue:</span> {match.venue}
                      </div>
                      <div>
                        <span className="font-medium">🕐 Time:</span> {match.time}
                      </div>
                    </div>
                    <div className={`text-sm font-semibold text-center p-2 rounded-lg ${
                      match.status === 'live' ? 'bg-gray-600/20 text-gray-400' :
                      match.status === 'completed' ? (
                        selectedTeam ? (
                          match.winner === selectedTeam ? 'bg-green-500/20 text-green-400' :
                          match.winner === 'tie' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        ) : 'bg-green-500/20 text-green-400'
                      ) :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedTeam && match.status === 'completed' ? (
                        match.winner === selectedTeam ? `🏆 ${selectedTeam} WON - ${match.result}` :
                        match.winner === 'tie' ? `🤝 TIE - ${match.result}` :
                        `❌ ${selectedTeam} LOST - ${match.result}`
                      ) : match.result}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏏</div>
              <h3 className="text-xl font-bold mb-2">No matches found</h3>
              <p className="text-gray-400">No matches match your current filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Scoreboard Component - Enhanced with mobile responsiveness
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
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">📊 Match Scoreboard</h1>
          </div>
          
          {/* Match Selector - Mobile Responsive */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Match:</label>
            <select
              value={selectedMatchForScoreboard}
              onChange={(e) => setSelectedMatchForScoreboard(e.target.value)}
              className="w-full sm:w-auto bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="1">✅ Completed</option>
              <option value="2">🔴 Live</option>
              <option value="3">⏰ Upcoming</option>
            </select>
          </div>

          {/* Current Match Display */}
          {currentMatch && (
            <>
              {/* Match Info Header - Enhanced Mobile */}
              <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 mb-6 border-l-4 shadow-xl ${
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
                  <span className={`font-bold text-sm sm:text-base ${
                    currentMatch.status === 'live' ? 'text-red-500' :
                    currentMatch.status === 'completed' ? 'text-green-500' :
                    'text-yellow-500'
                  }`}>
                    {currentMatch.status === 'live' ? 'LIVE MATCH' :
                     currentMatch.status === 'completed' ? 'COMPLETED MATCH' :
                     'UPCOMING MATCH'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center sm:text-left">
                    <div className="text-xs sm:text-sm text-gray-400">Date & Time</div>
                    <div className="font-semibold text-sm sm:text-base">{currentMatch.date} • {currentMatch.time}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-400">Venue</div>
                    <div className="font-semibold text-sm sm:text-base">{currentMatch.venue}</div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-xs sm:text-sm text-gray-400">Toss</div>
                    <div className="font-semibold text-sm sm:text-base">{currentMatch.toss}</div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={currentMatch.teamA.logo} 
                      alt={currentMatch.teamA.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">{currentMatch.teamA.name}</div>
                      {currentMatch.status !== 'upcoming' && (
                        <div className="text-base sm:text-lg lg:text-xl flex items-center space-x-2">
                          <BatIcon className="w-4 h-4 text-orange-500" />
                          <span>{currentMatch.teamA.runs}/{currentMatch.teamA.wickets} ({currentMatch.teamA.overs})</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-500 mb-2">VS</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      currentMatch.status === 'live' ? 'bg-red-500 text-white animate-pulse' :
                      currentMatch.status === 'completed' ? 'bg-green-500 text-white' :
                      'bg-yellow-500 text-black'
                    }`}>
                      {currentMatch.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">{currentMatch.teamB.name}</div>
                      {currentMatch.status !== 'upcoming' && (
                        <div className="text-base sm:text-lg lg:text-xl flex items-center space-x-2 justify-end">
                          <span>{currentMatch.teamB.runs}/{currentMatch.teamB.wickets} ({currentMatch.teamB.overs})</span>
                          <BallIcon className="w-4 h-4 text-orange-500" />
                        </div>
                      )}
                    </div>
                    <img 
                      src={currentMatch.teamB.logo} 
                      alt={currentMatch.teamB.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                  </div>
                </div>
                
                <div className="text-center text-base sm:text-lg font-semibold text-green-400 bg-green-500/10 rounded-lg p-3">
                  {currentMatch.result}
                </div>
              </div>

              {/* Conditional Content Based on Match Status */}
              {currentMatch.status === 'upcoming' ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center">
                  <div className="text-4xl sm:text-6xl mb-4">⏰</div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Match Yet to Start</h2>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base">
                    This match is scheduled for {currentMatch.date} at {currentMatch.time}
                  </p>
                  <div className="text-base sm:text-lg text-orange-500 font-semibold">
                    {currentMatch.toss}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Show detailed scorecards for completed and live matches */}
                  
                  {/* Team A Batting Scorecard */}
                  {currentMatch.batsmen && currentMatch.batsmen.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 shadow-xl">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamA.logo} 
                          alt={currentMatch.teamA.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <BatIcon className="w-5 h-5 text-orange-500 mr-2" />
                        {currentMatch.teamA.name} Batting - {currentMatch.teamA.runs}/{currentMatch.teamA.wickets} ({currentMatch.teamA.overs})
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2 px-1">Batsman</th>
                              <th className="text-right py-2 px-1">R</th>
                              <th className="text-right py-2 px-1">B</th>
                              <th className="text-right py-2 px-1">4s</th>
                              <th className="text-right py-2 px-1">6s</th>
                              <th className="text-right py-2 px-1">S/R</th>
                              <th className="text-left py-2 px-1 hidden sm:table-cell">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.batsmen.map((batsman, index) => (
                              <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                <td className="py-2 px-1 font-medium flex items-center">
                                  <span className="truncate">{batsman.name}</span>
                                  {batsman.isOnStrike && <span className="ml-1 text-xs bg-green-500 px-1 py-0.5 rounded">*</span>}
                                </td>
                                <td className="text-right py-2 px-1 font-bold">{batsman.runs}</td>
                                <td className="text-right py-2 px-1">{batsman.balls}</td>
                                <td className="text-right py-2 px-1 text-green-400">{batsman.fours}</td>
                                <td className="text-right py-2 px-1 text-purple-400">{batsman.sixes}</td>
                                <td className="text-right py-2 px-1">{batsman.strikeRate.toFixed(1)}</td>
                                <td className="py-2 px-1 text-gray-400 text-xs truncate hidden sm:table-cell">{batsman.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Team B Bowling Scorecard */}
                  {currentMatch.bowlers && currentMatch.bowlers.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 shadow-xl">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamB.logo} 
                          alt={currentMatch.teamB.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <BallIcon className="w-5 h-5 text-orange-500 mr-2" />
                        {currentMatch.teamB.name} Bowling
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2 px-1">Bowler</th>
                              <th className="text-right py-2 px-1">O</th>
                              <th className="text-right py-2 px-1">M</th>
                              <th className="text-right py-2 px-1">R</th>
                              <th className="text-right py-2 px-1">W</th>
                              <th className="text-right py-2 px-1">Eco</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.bowlers.map((bowler, index) => (
                              <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                <td className="py-2 px-1 font-medium truncate">{bowler.name}</td>
                                <td className="text-right py-2 px-1">{bowler.overs}</td>
                                <td className="text-right py-2 px-1">{bowler.maidens}</td>
                                <td className="text-right py-2 px-1">{bowler.runs}</td>
                                <td className="text-right py-2 px-1 font-bold text-red-400">{bowler.wickets}</td>
                                <td className="text-right py-2 px-1">{bowler.economy.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Team B Batting Scorecard (if available) */}
                  {currentMatch.batsmenTeamB && currentMatch.batsmenTeamB.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 shadow-xl">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamB.logo} 
                          alt={currentMatch.teamB.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <BatIcon className="w-5 h-5 text-orange-500 mr-2" />
                        {currentMatch.teamB.name} Batting - {currentMatch.teamB.runs}/{currentMatch.teamB.wickets} ({currentMatch.teamB.overs})
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2 px-1">Batsman</th>
                              <th className="text-right py-2 px-1">R</th>
                              <th className="text-right py-2 px-1">B</th>
                              <th className="text-right py-2 px-1">4s</th>
                              <th className="text-right py-2 px-1">6s</th>
                              <th className="text-right py-2 px-1">S/R</th>
                              <th className="text-left py-2 px-1 hidden sm:table-cell">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.batsmenTeamB.map((batsman, index) => (
                              <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                <td className="py-2 px-1 font-medium truncate">{batsman.name}</td>
                                <td className="text-right py-2 px-1 font-bold">{batsman.runs}</td>
                                <td className="text-right py-2 px-1">{batsman.balls}</td>
                                <td className="text-right py-2 px-1 text-green-400">{batsman.fours}</td>
                                <td className="text-right py-2 px-1 text-purple-400">{batsman.sixes}</td>
                                <td className="text-right py-2 px-1">{batsman.strikeRate.toFixed(1)}</td>
                                <td className="py-2 px-1 text-gray-400 text-xs truncate hidden sm:table-cell">{batsman.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Team A Bowling Scorecard (if available) */}
                  {currentMatch.bowlersTeamA && currentMatch.bowlersTeamA.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 shadow-xl">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                        <img 
                          src={currentMatch.teamA.logo} 
                          alt={currentMatch.teamA.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <BallIcon className="w-5 h-5 text-orange-500 mr-2" />
                        {currentMatch.teamA.name} Bowling
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-2 px-1">Bowler</th>
                              <th className="text-right py-2 px-1">O</th>
                              <th className="text-right py-2 px-1">M</th>
                              <th className="text-right py-2 px-1">R</th>
                              <th className="text-right py-2 px-1">W</th>
                              <th className="text-right py-2 px-1">Eco</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMatch.bowlersTeamA.map((bowler, index) => (
                              <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                <td className="py-2 px-1 font-medium truncate">{bowler.name}</td>
                                <td className="text-right py-2 px-1">{bowler.overs}</td>
                                <td className="text-right py-2 px-1">{bowler.maidens}</td>
                                <td className="text-right py-2 px-1">{bowler.runs}</td>
                                <td className="text-right py-2 px-1 font-bold text-red-400">{bowler.wickets}</td>
                                <td className="text-right py-2 px-1">{bowler.economy.toFixed(2)}</td>
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

  // Live Scores Component - Enhanced with mobile responsiveness
  const LiveScoresView = () => {
    // Professional cricket match data matching the image
    const matchData = {
      teams: {
        teamA: { 
          name: "Aakash-A", 
          runs: 184, 
          wickets: 0, 
          overs: "(20)",
          logo: "/src/assets/aakash.png",
          status: "DONE"
        },
        teamB: { 
          name: "Vayu-A", 
          runs: 166, 
          wickets: 4, 
          overs: "(18.1)",
          logo: "/src/assets/vayu.jpg",
          status: "BAT"
        }
      },
      match: {
        result: "3 RUNS",
        bowlerName: "Jasprit Bumrah",
        currentOver: "4.3",
        target: 184,
        need: 18,
        crr: 3.00,
        rrr: 9.47
      },
      currentBatsmen: [
        {
          name: "Arpit Rana",
          runs: 48,
          balls: 32,
          strikeRate: 150.0,
          facing: 0,
          sixes: 1,
          fours: 6,
          isOnStrike: true
        },
        {
          name: "Rohit Sharma", 
          runs: 28,
          balls: 19,
          strikeRate: 147.4,
          facing: 0,
          sixes: 1,
          fours: 3,
          isOnStrike: false
        }
      ],
      currentBowler: {
        name: "PRASHANTH",
        figures: "2/28",
        overs: 4,
        economy: 7.0
      },
      currentOverDetails: {
        overNumber: 4,
        runs: 14,
        balls: [
          { ball: 1, runs: 1, color: 'green', display: '1' },
          { ball: 2, runs: 'W', color: 'red', display: 'W' },
          { ball: 3, runs: 4, color: 'blue', display: '4' },
          { ball: 4, runs: 1, color: 'green', display: '1' },
          { ball: 5, runs: 'W', color: 'red', display: 'W' },
          { ball: 6, runs: 4, color: 'blue', display: '4' },
          { ball: 7, runs: 'W', color: 'red', display: 'W' },
          { ball: 8, runs: 6, color: 'orange', display: '6' },
          { ball: 9, runs: 3, color: 'yellow', display: '3' }
        ]
      },
      previousOver: {
        balls: [
          { ball: 1, runs: 1, color: 'green', label: '1r' },
          { ball: 2, runs: 'W', color: 'red', label: 'W' },
          { ball: 3, runs: 4, color: 'blue', label: '4r' },
          { ball: 4, runs: 'W', color: 'red', label: 'W' },
          { ball: 5, runs: 6, color: 'orange', label: '6r' },
          { ball: 6, runs: 3, color: 'yellow', label: '3r' }
        ],
        summary: {
          boundaries: '6/6',
          wickets: '2W',
          ones: '1×4',
          twos: '1×6'
        }
      },
      liveStatus: "Live - Over 4",
      totalBalls: 21,
      totalOvers: 3.3
    };

    const getBallColor = (color: string) => {
      switch(color) {
        case 'red': return 'bg-red-500';
        case 'green': return 'bg-green-500';
        case 'blue': return 'bg-blue-500';
        case 'orange': return 'bg-orange-500';
        case 'yellow': return 'bg-yellow-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div className="min-h-screen bg-gray-800 text-white p-2 sm:p-4">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          
          {/* Team Scores Header */}
          <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
            {/* Team A */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={matchData.teams.teamA.logo} 
                  alt={matchData.teams.teamA.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-base sm:text-lg font-medium text-white">Aakash-A</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">184-0 <span className="text-xs sm:text-sm text-gray-300">(20)</span></div>
                </div>
              </div>
              <span className="bg-gray-600 px-2 py-1 rounded text-xs sm:text-sm text-white font-medium">DONE</span>
            </div>
            
            {/* Team B */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={matchData.teams.teamB.logo} 
                  alt={matchData.teams.teamB.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-base sm:text-lg font-medium text-white">Vayu-A</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">180-4 <span className="text-xs sm:text-sm text-gray-300">(18.1)</span></div>
                </div>
              </div>
              <span className="bg-green-600 px-2 py-1 rounded text-xs sm:text-sm text-white font-medium">BAT</span>
            </div>
          </div>

          {/* Match Result */}
          <div className="bg-gray-700 rounded-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold mb-2">{matchData.match.result}</div>
            <div className="text-base sm:text-lg text-gray-300">Over {matchData.match.currentOver} • {matchData.match.bowlerName}</div>
          </div>

          {/* Match Stats */}
          <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-xs sm:text-sm text-gray-400">CRR</div>
                <div className="text-base sm:text-lg font-bold">{matchData.match.crr}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-400">RRR</div>
                <div className="text-base sm:text-lg font-bold">{matchData.match.rrr}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-400">Target</div>
                <div className="text-base sm:text-lg font-bold">{matchData.match.target}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-400">Need</div>
                <div className="text-base sm:text-lg font-bold text-orange-400">{matchData.match.need}</div>
              </div>
            </div>
          </div>

          {/* Live Status - Removed */}

          {/* Scrollable Overs Display */}
          <div className="bg-gray-700 rounded-lg p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-bold text-orange-400">{matchData.liveStatus}</span>
              </div>
              <div className="text-gray-400 text-xs">← Scroll for overs</div>
            </div>

            {/* Horizontal Scrollable Container */}
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                
                {/* Over 1 */}
                <div className="min-w-72 bg-white/5 rounded-lg p-3 border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">6 BALLS</span>
                      <span className="text-sm font-medium text-white">OVER 1</span>
                    </div>
                    <span className="text-lg font-semibold text-white bg-emerald-500/20 px-2 py-1 rounded text-emerald-300">13 RUNS</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-400/80 flex items-center justify-center text-white text-xs font-medium">1</div>
                      <div className="text-xs text-gray-400 mt-1">1r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-slate-400/80 flex items-center justify-center text-white text-xs font-medium">0</div>
                      <div className="text-xs text-gray-400 mt-1">0r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-sky-400/80 flex items-center justify-center text-white text-xs font-medium">4</div>
                      <div className="text-xs text-gray-400 mt-1">4r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-400/80 flex items-center justify-center text-white text-xs font-medium">2</div>
                      <div className="text-xs text-gray-400 mt-1">2r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-slate-400/80 flex items-center justify-center text-white text-xs font-medium">0</div>
                      <div className="text-xs text-gray-400 mt-1">0r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-violet-400/80 flex items-center justify-center text-white text-xs font-medium">6</div>
                      <div className="text-xs text-gray-400 mt-1">6r</div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-400 bg-gray-800/30 px-2 py-1 rounded">1×4 • 1×6 • 0W</div>
                </div>

                {/* Over 2 */}
                <div className="min-w-72 bg-white/5 rounded-lg p-3 border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">6 BALLS</span>
                      <span className="text-sm font-medium text-white">OVER 2</span>
                    </div>
                    <span className="text-lg font-semibold text-white bg-sky-500/20 px-2 py-1 rounded text-sky-300">8 RUNS</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-emerald-200">1</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">1r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-rose-200">W</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">W</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-emerald-200">3</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">3r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 to-sky-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-sky-200">4</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">4r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-slate-200">0</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">0r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-slate-200">0</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">0r</div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-bold text-slate-200 bg-slate-700 px-3 py-1 rounded-lg">1×4 • 0×6 • 1W</div>
                </div>

                {/* Over 3 */}
                <div className="min-w-72 bg-white/5 rounded-lg p-3 border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">6 BALLS</span>
                      <span className="text-sm font-medium text-white">OVER 3</span>
                    </div>
                    <span className="text-lg font-semibold text-white bg-violet-500/20 px-2 py-1 rounded text-violet-300">12 RUNS</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-amber-200">6</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">6r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-emerald-200">2</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">2r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 to-sky-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-sky-200">4</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">4r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-slate-200">0</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">0r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-slate-200">0</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">0r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 text-sm font-black shadow-lg border-2 border-slate-200">0</div>
                      <div className="text-xs font-bold text-slate-200 mt-1">0r</div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-bold text-slate-200 bg-slate-700 px-3 py-1 rounded-lg">1×4 • 1×6 • 0W</div>
                </div>

                {/* Over 4 (Current) */}
                <div className="min-w-72 bg-white/5 rounded-lg p-3 border border-gray-600/30 hover:border-orange-400/60 hover:bg-orange-500/5 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">4 BALLS</span>
                      <span className="text-sm font-medium text-orange-300 hover:text-orange-200 transition-colors duration-200">OVER 4 • LIVE</span>
                    </div>
                    <span className="text-lg font-semibold text-white bg-orange-500/20 px-2 py-1 rounded text-orange-300">9 RUNS</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-400/80 flex items-center justify-center text-white text-xs font-medium">1</div>
                      <div className="text-xs text-gray-400 mt-1">1r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-rose-400/80 flex items-center justify-center text-white text-xs font-medium">W</div>
                      <div className="text-xs text-gray-400 mt-1">W</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-400/80 flex items-center justify-center text-white text-xs font-medium">2</div>
                      <div className="text-xs text-gray-400 mt-1">2r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-violet-400/80 flex items-center justify-center text-white text-xs font-medium">6</div>
                      <div className="text-xs text-gray-400 mt-1">6r</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-gray-600/60 border border-orange-400/50 flex items-center justify-center text-white text-xs font-medium">?</div>
                      <div className="text-xs text-orange-400 mt-1">Next</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-gray-600/60 flex items-center justify-center text-white text-xs font-medium">?</div>
                      <div className="text-xs text-gray-400 mt-1">-</div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-orange-400 bg-orange-900/20 px-2 py-1 rounded">0×4 • 1×6 • 1W</div>
                </div>

                {/* Over 5 (Upcoming) */}
                <div className="min-w-72 bg-white/5 rounded-lg p-3 border border-gray-600/30 opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">0 BALLS</span>
                      <span className="text-sm font-medium text-gray-400">OVER 5</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-400 bg-gray-700/30 px-2 py-1 rounded">- RUNS</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    {Array(6).fill(0).map((_, index) => (
                      <div key={index} className="text-center">
                        <div className="w-8 h-8 rounded-full bg-gray-500/50 flex items-center justify-center text-gray-400 text-xs font-medium">-</div>
                        <div className="text-xs text-gray-500 mt-1">-</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-xs text-gray-500 bg-gray-800/20 px-2 py-1 rounded">Upcoming</div>
                </div>

              </div>

              {/* Scroll Buttons */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Stats - Removed */}
          
          {/* Players Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Current Batters */}
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-white text-sm sm:text-base">Batters</span>
              </div>
              
              {/* Batsman 1 - On Strike */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                    <BatIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-orange-400 text-sm sm:text-base">Arpit Rana *</div>
                    <div className="text-xs text-gray-400">7(15) • SR: 47.0 • On Strike</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-white">7</div>
                  <div className="text-xs text-gray-400">0×4 0×6</div>
                </div>
              </div>

              {/* Batsman 2 - Non-striker */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm sm:text-base">Sujal Singh</div>
                    <div className="text-xs text-gray-400">0(0) • SR: 0.0 • Non-striker</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-white">0</div>
                  <div className="text-xs text-gray-400">0×4 0×6</div>
                </div>
              </div>
            </div>

            {/* Current Bowler */}
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium text-white text-sm sm:text-base">Current Bowler</span>
              </div>
              
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                    <BallIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm sm:text-base">PRASHANTH</div>
                    <div className="text-xs text-gray-400">Bowling</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-bold text-white">2/28</div>
                  <div className="text-xs text-gray-400">4 ov • Econ: 7</div>
                </div>
              </div>

              {/* Status and Inning Info */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gray-600 rounded p-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className="text-xs sm:text-sm font-medium text-orange-400">Live</div>
                </div>
                <div className="bg-gray-600 rounded p-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Inning</div>
                  <div className="text-xs sm:text-sm font-medium text-white">2nd</div>
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
      
      {activeTab === 'livescores' && <LiveScoresView />}
      {activeTab === 'matches' && <MatchesInfo />}
      {activeTab === 'scoreboard' && <ScoreboardView />}
    </div>
  );
};

export default LiveScores;
