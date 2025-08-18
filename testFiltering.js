// Test the filtering logic with our current data
const matches = [
  {
    team1: "AGNI",
    team2: "AAKASH", 
    date: "2025-08-20T00:00:00.000Z",
    time: "14:00",
    venue: "Fire Stadium",
    type: "League",
    status: "upcoming"
  },
  {
    team1: "VAYU",
    team2: "JAL", 
    date: "2025-08-15T00:00:00.000Z",
    time: "16:00",
    venue: "Wind Park",
    type: "League",
    status: "completed"
  },
  {
    team1: "PRUDHVI",
    team2: "AGNI", 
    date: "2025-08-25T00:00:00.000Z",
    time: "18:00",
    venue: "Earth Oval",
    type: "T20",
    status: "upcoming"
  }
];

const teams = ["AGNI", "AAKASH", "VAYU", "JAL", "PRUDHVI"];

const getTeamMatches = (teamName) => {
  const teamMatches = matches.filter(match => 
    match.team1 === teamName || match.team2 === teamName
  );
  console.log(`Team: ${teamName}, Found matches:`, teamMatches);
  return teamMatches;
};

// Test each team
teams.forEach(teamName => {
  const teamMatches = getTeamMatches(teamName);
  const upcomingMatches = teamMatches.filter(match => 
    match.status === 'upcoming' || match.status === 'scheduled'
  );
  const recentMatches = teamMatches.filter(match => 
    match.status === 'completed' || match.status === 'finished'
  ).slice(0, 3);
  
  console.log(`Team ${teamName}: ${teamMatches.length} total, ${upcomingMatches.length} upcoming, ${recentMatches.length} recent`);
  console.log('---');
});
