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
    innings: 2, // 1 for first innings, 2 for second innings
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialMatchData);
  const [lastScoreEvent, setLastScoreEvent] = useState("");
  const [firstInningData, setFirstInningData] = useState(initialMatchData);
  const [secondInningData, setSecondInningData] = useState({
    ...initialMatchData,
    teamA: { ...initialMatchData.teamA, runs: 0, wickets: 0, overs: 0 },
    teamB: { ...initialMatchData.teamB, runs: 142, wickets: 3, overs: 18.2 },
    innings: 2,
    target: 184,
    status: "live"
  });

  // Update form data when match data changes
  useEffect(() => {
    setFormData(matchData);
  }, [matchData]);

  // Simulate live score updates
  useEffect(() => {
    if (!isEditing && matchData.status === "live") {
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
  }, [isEditing, matchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('teamA.')) {
      const field = name.split('.')[1];
      const newTeamData = {
        ...formData.teamA,
        [field]: field === 'name' || field === 'color' || field === 'logo' ? value : Number(value)
      };
      
      // Update logo and color when team name changes
      if (field === 'name') {
        const teamInfo = getTeamInfo(value);
        newTeamData.logo = teamInfo.logo;
        newTeamData.color = teamInfo.color;
      }
      
      setFormData({
        ...formData,
        teamA: newTeamData
      });
    } else if (name.startsWith('teamB.')) {
      const field = name.split('.')[1];
      const newTeamData = {
        ...formData.teamB,
        [field]: field === 'name' || field === 'color' || field === 'logo' ? value : Number(value)
      };
      
      // Update logo and color when team name changes
      if (field === 'name') {
        const teamInfo = getTeamInfo(value);
        newTeamData.logo = teamInfo.logo;
        newTeamData.color = teamInfo.color;
      }
      
      setFormData({
        ...formData,
        teamB: newTeamData
      });
    } else if (name.startsWith('batsmen.')) {
      const [index, field] = name.split('.').slice(1);
      const updatedBatsmen = [...formData.batsmen];
      updatedBatsmen[index][field] = field === 'name' ? value : Number(value);
      setFormData({
        ...formData,
        batsmen: updatedBatsmen
      });
    } else if (name.startsWith('bowler.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        bowler: {
          ...formData.bowler,
          [field]: field === 'name' || field === 'figures' ? value : Number(value)
        }
      });
    } else if (name.startsWith('betting.')) {
      const [section, field] = name.split('.').slice(1);
      setFormData({
        ...formData,
        betting: {
          ...formData.betting,
          [section]: {
            ...formData.betting[section],
            [field]: Number(value)
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Add runs to the currently batting team and selected batsman
  const handleScoreAdd = (runs, isExtra = false) => {
    setMatchData(prev => {
      const newData = {...prev};
      
      if (newData.innings === 1) {
        // First innings - team A is batting
        newData.teamA.runs += runs;
        
        // Update the batsman on strike
        const strikerIndex = newData.batsmen.findIndex(b => b.isOnStrike);
        if (strikerIndex >= 0) {
          newData.batsmen[strikerIndex].runs += runs;
          newData.batsmen[strikerIndex].balls += 1;
          newData.batsmen[strikerIndex].strikeRate = 
            Math.round((newData.batsmen[strikerIndex].runs / newData.batsmen[strikerIndex].balls) * 100);
        }
        
        // Update overs (add 0.1 to overs)
        const currentOver = parseFloat(String(newData.teamA.overs));
        let newOver = currentOver + 0.1;
        
        // If we've completed an over (e.g., 0.6 becomes 1.0)
        if (newOver % 1 > 0.59) {
          newOver = Math.floor(newOver) + 1;
        }
        
        newData.teamA.overs = newOver > 20 ? 20 : parseFloat(newOver.toFixed(1));
        
        // Update run rate
        newData.runRate = parseFloat((newData.teamA.runs / newData.teamA.overs).toFixed(2));
      } else {
        // Second innings - team B is batting
        newData.teamB.runs += runs;
        
        // Update the batsman on strike
        const strikerIndex = newData.batsmen.findIndex(b => b.isOnStrike);
        if (strikerIndex >= 0) {
          newData.batsmen[strikerIndex].runs += runs;
          newData.batsmen[strikerIndex].balls += 1;
          newData.batsmen[strikerIndex].strikeRate = 
            Math.round((newData.batsmen[strikerIndex].runs / newData.batsmen[strikerIndex].balls) * 100);
        }
        
        // Update overs (add 0.1 to overs)
        const currentOver = parseFloat(String(newData.teamB.overs));
        let newOver = currentOver + 0.1;
        
        // If we've completed an over (e.g., 0.6 becomes 1.0)
        if (newOver % 1 > 0.59) {
          newOver = Math.floor(newOver) + 1;
        }
        
        newData.teamB.overs = newOver > 20 ? 20 : parseFloat(newOver.toFixed(1));
        
        // Update required run rate
        const remainingRuns = newData.target - newData.teamB.runs;
        const remainingOvers = 20 - newData.teamB.overs;
        newData.requiredRunRate = parseFloat((remainingRuns / remainingOvers).toFixed(2));
      }
      
      // Update partnership
      newData.partnership = `${newData.batsmen[0].runs + newData.batsmen[1].runs} (${newData.batsmen[0].balls + newData.batsmen[1].balls})`;
      
      // Add to ball-by-ball data
      const strikerIndex = newData.batsmen.findIndex(b => b.isOnStrike);
      if (strikerIndex >= 0) {
        const currentOver = Math.floor(parseFloat(String(newData.innings === 1 ? newData.teamA.overs : newData.teamB.overs)));
        const currentBall = Math.round((parseFloat(String(newData.innings === 1 ? newData.teamA.overs : newData.teamB.overs)) % 1) * 10);
        
        const ballData = {
          over: currentOver,
          ball: currentBall,
          runs: runs,
          batsman: newData.batsmen[strikerIndex].name,
          bowler: newData.bowler.name,
          extras: isExtra ? (runs === 1 ? "WD" : "NB") : ""
        };
        
        newData.ballByBall.push(ballData);
      }
      
      // Set last score event
      if (strikerIndex >= 0) {
        setLastScoreEvent(`${newData.batsmen[strikerIndex].name} scored ${runs} run${runs !== 1 ? 's' : ''}`);
      }
      
      return newData;
    });
  };

  // Handle wicket
  const handleWicket = () => {
    setMatchData(prev => {
      const newData = {...prev};
      
      if (newData.innings === 1) {
        // First innings - team A is batting
        newData.teamA.wickets += 1;
        
        // Update the batsman on strike
        const strikerIndex = newData.batsmen.findIndex(b => b.isOnStrike);
        if (strikerIndex >= 0) {
          newData.batsmen[strikerIndex].isOut = true;
          // Set last wicket
          newData.lastWicket = `${newData.batsmen[strikerIndex].name} ${newData.batsmen[strikerIndex].runs} (${newData.batsmen[strikerIndex].balls})`;
          
          // Replace with new batsman
          const availablePlayers = newData.allPlayers.filter(
            p => !newData.batsmen.some(b => b.name === p) && p !== newData.batsmen[strikerIndex].name
          );
          
          if (availablePlayers.length > 0) {
            newData.batsmen[strikerIndex] = {
              name: availablePlayers[0],
              runs: 0,
              balls: 0,
              strikeRate: 0,
              isOnStrike: true,
              isOut: false
            };
          }
        }
      } else {
        // Second innings - team B is batting
        newData.teamB.wickets += 1;
        
        // Update the batsman on strike
        const strikerIndex = newData.batsmen.findIndex(b => b.isOnStrike);
        if (strikerIndex >= 0) {
          newData.batsmen[strikerIndex].isOut = true;
          // Set last wicket
          newData.lastWicket = `${newData.batsmen[strikerIndex].name} ${newData.batsmen[strikerIndex].runs} (${newData.batsmen[strikerIndex].balls})`;
          
          // Replace with new batsman
          const availablePlayers = newData.allPlayers.filter(
            p => !newData.batsmen.some(b => b.name === p) && p !== newData.batsmen[strikerIndex].name
          );
          
          if (availablePlayers.length > 0) {
            newData.batsmen[strikerIndex] = {
              name: availablePlayers[0],
              runs: 0,
              balls: 0,
              strikeRate: 0,
              isOnStrike: true,
              isOut: false
            };
          }
        }
      }
      
      // Reset partnership
      newData.partnership = "0 (0)";
      
      // Add to ball-by-ball data
      const currentOver = Math.floor(parseFloat(String(newData.innings === 1 ? newData.teamA.overs : newData.teamB.overs)));
      const currentBall = Math.round((parseFloat(String(newData.innings === 1 ? newData.teamA.overs : newData.teamB.overs)) % 1) * 10);
      
      const ballData = {
        over: currentOver,
        ball: currentBall,
        runs: 0,
        batsman: "Wicket",
        bowler: newData.bowler.name,
        extras: "W"
      };
      
      newData.ballByBall.push(ballData);
      
      // Set last score event
      setLastScoreEvent("Wicket! 🏏");
      
      return newData;
    });
  };

  // Switch strike between batsmen
  const handleSwitchStrike = () => {
    setMatchData(prev => {
      const newData = {...prev};
      newData.batsmen = newData.batsmen.map(batsman => ({
        ...batsman,
        isOnStrike: !batsman.isOnStrike
      }));
      setLastScoreEvent("Strike switched!");
      return newData;
    });
  };

  // Change innings
  const handleInningsChange = () => {
    if (matchData.innings === 1) {
      // Save first innings data and switch to second innings
      setFirstInningData(matchData);
      setMatchData(secondInningData);
    } else {
      // Save second innings data and switch to first innings
      setSecondInningData(matchData);
      setMatchData(firstInningData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatchData(formData);
    if (formData.innings === 1) {
      setFirstInningData(formData);
    } else {
      setSecondInningData(formData);
    }
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData(matchData);
    }
  };

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

      {/* Controls Section - Mobile Responsive */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mt-2 flex flex-wrap gap-2">
        <button 
          onClick={toggleEdit}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-1 px-2 sm:px-3 rounded transition-all"
        >
          {isEditing ? "Cancel" : "Edit Match"}
        </button>
        
        <div className="text-xs sm:text-sm font-semibold ml-auto flex flex-col sm:flex-row items-end sm:items-center">
          <span className="sm:mr-2">Inning: {matchData.innings === 1 ? "1st" : "2nd"}</span>
          <span>Status: <span className="text-orange-500">{matchData.status}</span></span>
        </div>
      </div>

      {isEditing ? (
        // Edit Form
        <div className="max-w-6xl mx-auto p-4 bg-gray-800 rounded-lg my-4">
          <h2 className="text-xl font-bold text-white mb-4">Edit Match Data</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Team Selection */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Team Selection</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Team A</label>
                  <select
                    name="teamA.name"
                    value={formData.teamA.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-600 text-white rounded"
                  >
                    <option value="">Select Team</option>
                    {Object.values(allTeams).map(house => 
                      house.teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))
                    ).flat()}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Team B</label>
                  <select
                    name="teamB.name"
                    value={formData.teamB.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-600 text-white rounded"
                  >
                    <option value="">Select Team</option>
                    {Object.values(allTeams).map(house => 
                      house.teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))
                    ).flat()}
                  </select>
                </div>
              </div>
            </div>

            {/* Team A */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Team A</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Runs</label>
                  <input
                    type="number"
                    name="teamA.runs"
                    value={String(formData.teamA.runs)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Wickets</label>
                  <input
                    type="number"
                    name="teamA.wickets"
                    value={String(formData.teamA.wickets)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Overs</label>
                  <input
                    type="number"
                    step="0.1"
                    name="teamA.overs"
                    value={String(formData.teamA.overs)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Team B */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Team B</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Runs</label>
                  <input
                    type="number"
                    name="teamB.runs"
                    value={String(formData.teamB.runs)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Wickets</label>
                  <input
                    type="number"
                    name="teamB.wickets"
                    value={String(formData.teamB.wickets)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Overs</label>
                  <input
                    type="number"
                    step="0.1"
                    name="teamB.overs"
                    value={String(formData.teamB.overs)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Batsmen */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Batsmen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.batsmen.map((batsman, index) => (
                  <div key={index} className="bg-gray-600 p-3 rounded">
                    <h4 className="text-gray-300 mb-2">Batsman {index + 1} {batsman.isOnStrike && "(Striker)"}</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Name</label>
                        <select
                          name={`batsmen.${index}.name`}
                          value={batsman.name}
                          onChange={handleInputChange}
                          className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                        >
                          <option value="">Select Player</option>
                          {formData.allPlayers.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Runs</label>
                        <input
                          type="number"
                          name={`batsmen.${index}.runs`}
                          value={String(batsman.runs)}
                          onChange={handleInputChange}
                          className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Balls</label>
                        <input
                          type="number"
                          name={`batsmen.${index}.balls`}
                          value={String(batsman.balls)}
                          onChange={handleInputChange}
                          className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name={`batsmen.${index}.isOnStrike`}
                          checked={batsman.isOnStrike}
                          onChange={(e) => {
                            const updatedBatsmen = [...formData.batsmen];
                            updatedBatsmen[index].isOnStrike = e.target.checked;
                            // Ensure only one batsman is on strike
                            if (e.target.checked) {
                              updatedBatsmen.forEach((b, i) => {
                                if (i !== index) b.isOnStrike = false;
                              });
                            }
                            setFormData({
                              ...formData,
                              batsmen: updatedBatsmen
                            });
                          }}
                          className="mr-2"
                        />
                        <label className="text-gray-300 text-sm">On Strike</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bowler */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Bowler</h3>
              <div className="bg-gray-600 p-3 rounded">
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Name</label>
                    <select
                      name="bowler.name"
                      value={formData.bowler.name}
                      onChange={handleInputChange}
                      className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                    >
                      <option value="">Select Bowler</option>
                      {formData.allPlayers.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Figures (e.g., 2/28)</label>
                    <input
                      type="text"
                      name="bowler.figures"
                      value={formData.bowler.figures}
                      onChange={handleInputChange}
                      className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Overs</label>
                    <input
                      type="number"
                      step="0.1"
                      name="bowler.overs"
                      value={String(formData.bowler.overs)}
                      onChange={handleInputChange}
                      className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Economy</label>
                    <input
                      type="number"
                      step="0.1"
                      name="bowler.economy"
                      value={String(formData.bowler.economy)}
                      onChange={handleInputChange}
                      className="w-full p-1 bg-gray-500 text-white rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scoring Buttons in Edit Mode */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Scoring</h3>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4, 6, "WD", "NB", "Wicket"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (item === "Wicket") {
                        handleWicket();
                      } else if (item === "WD" || item === "NB") {
                        handleScoreAdd(1, true);
                      } else {
                        handleScoreAdd(item);
                      }
                    }}
                    className={`p-2 rounded font-semibold text-sm ${
                      item === "Wicket" 
                        ? "bg-red-500 hover:bg-red-600" 
                        : item === "WD" || item === "NB"
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {item === "Wicket" ? "W 🏏" : item === "WD" ? "Wide" : item === "NB" ? "No Ball" : item}
                  </button>
                ))}
              </div>
            </div>

            {/* Match Details */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Match Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  >
                    <option value="live">Live</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Target</label>
                  <input
                    type="number"
                    name="target"
                    value={String(formData.target)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Current Run Rate</label>
                  <input
                    type="number"
                    step="0.1"
                    name="runRate"
                    value={String(formData.runRate)}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Toss</label>
                  <input
                    type="text"
                    name="toss"
                    value={formData.toss}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Powerplay</label>
                  <input
                    type="text"
                    name="powerplay"
                    value={formData.powerplay}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Partnership</label>
                  <input
                    type="text"
                    name="partnership"
                    value={formData.partnership}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Last Wicket</label>
                  <input
                    type="text"
                    name="lastWicket"
                    value={formData.lastWicket}
                    onChange={handleInputChange}
                    className="w-full p-1 bg-gray-600 text-white rounded text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Display Scoreboard - Ultra-Compact Mobile-First
        <div className="w-full max-w-5xl mx-auto p-1 space-y-1">
          
          {/* Team Scores - Compact Mobile Grid */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            {/* Team A - Ultra Mobile Optimized */}
            <div className="grid grid-cols-[40px_1fr_60px] sm:grid-cols-[50px_1fr_80px] gap-1 sm:gap-2 p-1.5 sm:p-2 border-b border-gray-700 items-center">
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
              
              {/* Status - Compact */}
              <div className="text-xs font-medium text-gray-400 text-right">
                {matchData.innings === 1 ? (
                  <div className="bg-green-600 text-white px-1 py-0.5 rounded text-xs">BAT</div>
                ) : (
                  <div className="text-gray-500">DONE</div>
                )}
              </div>
            </div>

            {/* Team B - Ultra Mobile Optimized */}
            <div className="grid grid-cols-[40px_1fr_60px] sm:grid-cols-[50px_1fr_80px] gap-1 sm:gap-2 p-1.5 sm:p-2 items-center">
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
              
              {/* Status - Compact */}
              <div className="text-xs font-medium text-gray-400 text-right">
                {matchData.innings === 2 ? (
                  <div className="bg-green-600 text-white px-1 py-0.5 rounded text-xs">BAT</div>
                ) : (
                  <div className="text-gray-500">WAIT</div>
                )}
              </div>
            </div>
          </div>

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
              <span className="text-xs text-orange-300 animate-bounce">← Scroll for overs</span>
            </h3>
            
            {/* Ball-by-Ball - Mobile Responsive Card */}
            <div className="flex justify-center px-2 sm:px-0">
              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-xl p-2 sm:p-4 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] overflow-x-auto shadow-lg border border-orange-400/30">
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
                      <div className="text-center mb-2 sm:mb-3 md:mb-4 pb-1.5 sm:pb-2 border-b-2 border-orange-200/30">
                        <div className="text-sm sm:text-base text-orange-100 font-bold tracking-wide">
                          🏏 OVER {overNum}
                        </div>
                        <div className="text-base sm:text-lg md:text-xl font-black text-white bg-white/10 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 mt-1 sm:mt-2 inline-block shadow-md">
                          {balls.reduce((sum, ball) => sum + (ball.runs || 0), 0)} RUNS
                        </div>
                      </div>
                      
                      {/* Mobile Responsive 6 Balls Grid */}
                      <div className="grid grid-cols-6 gap-1 sm:gap-1.5 md:gap-2.5 mb-2 sm:mb-3 md:mb-4">
                        {Array.from({ length: 6 }, (_, ballIndex) => {
                          const ball = balls.find(b => b.ball === ballIndex + 1);
                          return (
                            <div key={ballIndex} className="text-center">
                              {/* Mobile Responsive Ball Circle */}
                              <div className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full flex flex-col items-center justify-center font-bold mb-1 sm:mb-1.5 md:mb-2 border border-2 shadow-md transform transition-all duration-200 hover:scale-105 ${
                                !ball ? "bg-gray-600/50 text-gray-300 border-gray-400 border-dashed animate-pulse" :
                                ball.runs === 0 && !ball.extras ? "bg-gray-700/70 text-white border-gray-400" :
                                ball.runs === 1 ? "bg-green-500/90 text-white border-green-300 shadow-green-500/30" :
                                ball.runs === 2 ? "bg-green-400/90 text-white border-green-200 shadow-green-400/30" :
                                ball.runs === 3 ? "bg-yellow-400/90 text-black border-yellow-200 shadow-yellow-400/30" :
                                ball.runs === 4 ? "bg-blue-500/90 text-white border-blue-300 shadow-blue-500/30" :
                                ball.runs === 6 ? "bg-orange-500/90 text-white border-orange-300 shadow-orange-500/30" :
                                ball.extras === "W" ? "bg-red-500/90 text-white border-red-300 shadow-red-500/30" :
                                ball.extras === "WD" ? "bg-purple-500/90 text-white border-purple-300 shadow-purple-500/30" :
                                ball.extras === "NB" ? "bg-pink-500/90 text-white border-pink-300 shadow-pink-500/30" :
                                "bg-green-500/90 text-white border-green-300 shadow-green-500/30"
                              }`}>
                                {!ball ? (
                                  <span className="text-sm sm:text-lg md:text-xl opacity-50">·</span>
                                ) : (
                                  <>
                                    <div className="text-xs opacity-90 font-medium leading-none hidden sm:block">B{ballIndex + 1}</div>
                                    <div className="text-xs sm:text-sm md:text-base font-black leading-none mt-0 sm:mt-0.5">
                                      {ball.extras === "W" ? "W" : 
                                       ball.extras ? ball.extras.charAt(0) : 
                                       ball.runs}
                                    </div>
                                  </>
                                )}
                              </div>
                              {/* Mobile Responsive Ball Details */}
                              <div className="text-xs text-orange-100 font-medium hidden sm:block">
                                {ball && ball.runs !== undefined && !ball.extras && (
                                  <div className="bg-white/15 rounded-full px-1 sm:px-1.5 py-0.5 shadow-sm text-xs">
                                    {ball.runs}r
                                  </div>
                                )}
                                {ball && ball.extras && (
                                  <div className="bg-red-500/30 rounded-full px-1 sm:px-1.5 py-0.5 text-red-200 shadow-sm text-xs">
                                    {ball.extras}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Mobile Responsive Previous Over Summary */}
                      <div className="text-xs sm:text-sm text-orange-100 text-center pt-1 sm:pt-2 border-t-2 border-orange-200/30 mt-1 sm:mt-2 bg-white/5 rounded-lg p-1 sm:p-2 shadow-md">
                        <div className="flex justify-center items-center space-x-1 sm:space-x-2 font-medium flex-wrap text-xs">
                          <span className="bg-white/15 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                            {balls.length}/6
                          </span>
                          <span className="bg-red-500/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                            {balls.filter(b => b.extras === "W").length}W
                          </span>
                          {balls.filter(b => b.runs === 4).length > 0 && (
                            <span className="bg-blue-500/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                              {balls.filter(b => b.runs === 4).length}×4
                            </span>
                          )}
                          {balls.filter(b => b.runs === 6).length > 0 && (
                            <span className="bg-orange-500/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                              {balls.filter(b => b.runs === 6).length}×6
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Current Over - Mobile Responsive Main Focus */}
                  <div className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px]">
                    {/* Current Over Header - Mobile Responsive */}
                    <div className="text-center mb-2 sm:mb-3 md:mb-4 pb-1.5 sm:pb-2 border-b-2 border-orange-200/40">
                      <div className="text-sm sm:text-base text-orange-100 font-bold tracking-wide">
                        🏏 CURRENT OVER
                      </div>
                      <div className="text-base sm:text-lg md:text-xl font-black text-white bg-white/15 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 mt-1 sm:mt-2 inline-block shadow-lg">
                        {matchData.ballByBall.slice(-6).reduce((sum, ball) => sum + (ball.runs || 0), 0)} RUNS
                      </div>
                    </div>
                    
                    {/* Mobile Responsive Perfect 6 Balls Grid */}
                    <div className="grid grid-cols-6 gap-1 sm:gap-1.5 md:gap-2.5 mb-2 sm:mb-3 md:mb-4">
                      {Array.from({ length: 6 }, (_, ballIndex) => {
                        const lastSixBalls = matchData.ballByBall.slice(-6);
                        const ball = lastSixBalls[ballIndex];
                        return (
                          <div key={ballIndex} className="text-center">
                            {/* Mobile Responsive Perfect Ball Circle */}
                            <div className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full flex flex-col items-center justify-center font-bold mb-1 sm:mb-1.5 md:mb-2 border border-2 shadow-lg transform transition-all duration-200 hover:scale-105 ${
                              !ball ? "bg-gray-600/60 text-gray-300 border-gray-400 border-dashed animate-pulse" :
                              ball.runs === 0 && !ball.extras ? "bg-gray-700/80 text-white border-gray-400" :
                              ball.runs === 1 ? "bg-green-500 text-white border-green-300 shadow-green-500/40" :
                              ball.runs === 2 ? "bg-green-400 text-white border-green-200 shadow-green-400/40" :
                              ball.runs === 3 ? "bg-yellow-400 text-black border-yellow-200 shadow-yellow-400/40" :
                              ball.runs === 4 ? "bg-blue-500 text-white border-blue-300 shadow-blue-500/40" :
                              ball.runs === 6 ? "bg-orange-500 text-white border-orange-300 shadow-orange-500/40" :
                              ball.extras === "W" ? "bg-red-500 text-white border-red-300 shadow-red-500/40" :
                              ball.extras === "WD" ? "bg-purple-500 text-white border-purple-300 shadow-purple-500/40" :
                              ball.extras === "NB" ? "bg-pink-500 text-white border-pink-300 shadow-pink-500/40" :
                              "bg-green-500 text-white border-green-300 shadow-green-500/40"
                            }`}>
                              {!ball ? (
                                <span className="text-sm sm:text-lg md:text-xl opacity-50">·</span>
                              ) : (
                                <>
                                  <div className="text-xs opacity-90 font-medium leading-none hidden sm:block">B{ballIndex + 1}</div>
                                  <div className="text-xs sm:text-sm md:text-base font-black leading-none mt-0 sm:mt-0.5">
                                    {ball.extras === "W" ? "W" : 
                                     ball.extras ? ball.extras.charAt(0) : 
                                     ball.runs}
                                  </div>
                                </>
                              )}
                            </div>
                            {/* Mobile Responsive Ball Details */}
                            <div className="text-xs text-orange-100 font-medium hidden sm:block">
                              {ball && ball.runs !== undefined && !ball.extras && (
                                <div className="bg-white/20 rounded-full px-1 sm:px-1.5 py-0.5 shadow-sm text-xs">
                                  {ball.runs}r
                                </div>
                              )}
                              {ball && ball.extras && (
                                <div className="bg-red-500/40 rounded-full px-1 sm:px-1.5 py-0.5 text-red-200 shadow-sm text-xs">
                                  {ball.extras}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Mobile Responsive Current Over Summary */}
                    <div className="text-xs sm:text-sm text-orange-100 text-center pt-1 sm:pt-2 border-t-2 border-orange-200/40 mt-1 sm:mt-2 bg-white/10 rounded-lg p-1 sm:p-2 shadow-lg">
                      <div className="flex justify-center items-center space-x-1 sm:space-x-2 font-medium flex-wrap text-xs">
                        <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                          {matchData.ballByBall.slice(-6).length}/6
                        </span>
                        <span className="bg-red-500/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                          {matchData.ballByBall.slice(-6).filter(b => b.extras === "W").length}W
                        </span>
                        {matchData.ballByBall.slice(-6).filter(b => b.runs === 4).length > 0 && (
                          <span className="bg-blue-500/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                            {matchData.ballByBall.slice(-6).filter(b => b.runs === 4).length}×4
                          </span>
                        )}
                        {matchData.ballByBall.slice(-6).filter(b => b.runs === 6).length > 0 && (
                          <span className="bg-orange-500/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-sm">
                            {matchData.ballByBall.slice(-6).filter(b => b.runs === 6).length}×6
                          </span>
                        )}
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
                        {batsman.runs}({batsman.balls}) • SR: {batsman.strikeRate.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-white">{batsman.runs}</div>
                      <div className="text-xs text-gray-400">{((batsman as any).fours || 0)}×4 {((batsman as any).sixes || 0)}×6</div>
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
      )}
    </div>
  );
};

export default LiveScores;