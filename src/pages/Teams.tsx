  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Trophy, Users, Star, TrendingUp, ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
  import { motion } from "framer-motion";
  import { useState, useEffect } from "react";
  import aakash from "@/assets/aakash.png";
  import srkr from "@/assets/srkrec-logo.png";
  import agni from "@/assets/agni.jpg";
  
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";

  // Mock data for the 5 teams (without past matches)
  const teams = [
    {
      id: "1",
      name: "AGNI",
      logo: agni,
      captain: "Arun Sharma",
      home_ground: "Fire Stadium",
      founded: 2010,
      description: "AGNI brings fiery passion to the cricket field with aggressive batting.",
    },
    {
      id: "2",
      name: "AAKASH",
      logo: aakash,
      captain: "Vikram Singh",
      home_ground: "Sky Arena",
      founded: 2012,
      description: "AAKASH soars high with strategic gameplay and swift fielding.",
    },
    {
      id: "3",
      name: "VAYU",
      logo: vayu,
      captain: "Rahul Verma",
      home_ground: "Wind Park",
      founded: 2008,
      description: "VAYU moves like the wind, with fast bowlers dominating the pitch.",
    },
    {
      id: "4",
      name: "JAL",
      logo: jal,
      captain: "Sameer Patel",
      home_ground: "Waterfront Ground",
      founded: 2015,
      description: "JAL flows smoothly with consistent all-round performance.",
    },
    {
      id: "5",
      name: "PRUDHVI",
      logo: prudhvi,
      captain: "Kiran Reddy",
      home_ground: "Earth Oval",
      founded: 2005,
      description: "PRUDHVI stands firm with solid defense and powerful batting.",
    },
  ];

  // Animation variants for card landing effect
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation variants for details page
  const detailsVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  export default function Teams() {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Function to fetch matches
    const fetchMatches = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/matches`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMatches(data);
        setError(null);
        setLastUpdated(new Date());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchMatches();
    }, []);

    // Refresh data when page becomes visible (when navigating from other pages)
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
        // console.log("Page became visible, refreshing matches...");
          fetchMatches();
        }
      };

      const handleFocus = () => {
        //console.log("Window focused, refreshing matches...");
        fetchMatches();
      };

      // Periodic refresh every 30 seconds
      const interval = setInterval(() => {
        //console.log("Periodic refresh of matches...");
        fetchMatches();
      }, 30000);

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
        clearInterval(interval);
      };
    }, []);

    // Function to get matches for a specific team
    const getTeamMatches = (teamName) => {
      // Normalize team name for matching (case-insensitive, sub-team support)
      const normalized = teamName.toLowerCase();
      const teamMatches = matches.filter(match =>
        match.team1.toLowerCase().startsWith(normalized) ||
        match.team2.toLowerCase().startsWith(normalized)
      );
      return teamMatches;
    };

    const showDetails = (teamId) => {
      const team = teams.find((team) => team.id === teamId);
      
      // Get all matches where this team is involved
      const teamMatches = matches.filter(match => 
        match.team1 === team.name || match.team2 === team.name
      );
      
      // Separate upcoming and completed matches
      const upcomingMatches = teamMatches.filter(match => 
        match.status === 'upcoming' || match.status === 'scheduled'
      );
      
      const completedMatches = teamMatches.filter(match => 
        match.status === 'completed' || match.status === 'finished'
      );
      
      // For now, we'll show all matches as fixtures since we don't have winner/score data
      const pastMatches = completedMatches.map(match => ({
        opponent: match.team1 === team.name ? match.team2 : match.team1,
        venue: match.venue,
        date: match.date,
        status: match.status,
        type: match.type
      }));
      
      setSelectedTeam({
        ...team,
        pastMatches,
        upcomingMatches
      });
    };

    const hideDetails = () => {
      setSelectedTeam(null);
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading teams and matches...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">Error: {error}</div>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return (
    <div className="relative min-h-screen">
        {/* Main Teams Grid */}
        <div className={`space-y-6 p-6 ${selectedTeam ? "hidden" : "block"}`}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Teams</h1>
              <p className="text-muted-foreground mt-2">
                Meet the 5 elemental teams competing in the championship
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setLoading(true);
                  fetchMatches();
                }}
                disabled={loading}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {loading ? "Refreshing..." : "Refresh Matches"}
              </Button>
              
              <Badge className="shadow-lg text-lg px-4 py-2 bg-primary text-primary-foreground">
                <Trophy className="mr-2 h-5 w-5" />
                5 Teams
              </Badge>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {/* Status indicator */}
            {lastUpdated && (
              <div className="col-span-full text-center text-sm text-muted-foreground mb-2">
                Last updated: {lastUpdated.toLocaleTimeString()} • {matches.length} matches loaded
              </div>
            )}

            {teams.map((team, index) => {
            // Get matches for this team (for card summary)
            const cardTeamMatches = getTeamMatches(team.name);
            const cardLiveMatches = cardTeamMatches.filter(match => match.status && match.status.toLowerCase() === 'live');
            const cardUpcomingMatches = cardTeamMatches.filter(match => match.status && (match.status.toLowerCase() === 'upcoming' || match.status.toLowerCase() === 'scheduled'));
            const cardRecentMatches = cardTeamMatches.filter(match => match.status && (match.status.toLowerCase() === 'completed' || match.status.toLowerCase() === 'finished')).slice(0, 3);
              const teamMatches = getTeamMatches(team.name);
              const upcomingMatches = teamMatches.filter(match => 
                match.status.toLowerCase() === 'upcoming' || match.status.toLowerCase() === 'scheduled'
              );
              const recentMatches = teamMatches.filter(match => 
                match.status.toLowerCase() === 'completed' || match.status.toLowerCase() === 'finished'
              ).slice(0, 3); // Show only 3 recent matches
              const liveMatches = teamMatches.filter(match => 
                match.status.toLowerCase() === 'live'
              );
              return (
                <motion.div
                  key={team.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="space-y-4"
                >
                  {/* Professional Team Card Layout */}
                  <Card className="shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row items-stretch">
                    {/* Logo Half */}
                    <div className="md:w-1/2 flex items-center justify-center bg-white p-6 relative">
                      <img
                        src={team.logo}
                        alt={`${team.name} logo`}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-100 shadow-xl md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                        style={{ zIndex: 2 }}
                      />
                    </div>
                    {/* Details Half */}
                    <div className="md:w-1/2 flex flex-col justify-center p-6 bg-white">
                      <CardTitle className="text-2xl font-bold text-black mb-2">{team.name}</CardTitle>
                      <div className="text-gray-700 mb-2">{team.description}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                        <div>
                          <div className="text-gray-500">Captain</div>
                          <div className="font-medium text-black">{team.captain}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Founded</div>
                          <div className="font-medium text-black">{team.founded}</div>
                        </div>
                      </div>
                      <div className="text-sm mb-2">
                        <div className="text-gray-500">Home Ground</div>
                        <div className="font-medium text-black">{team.home_ground}</div>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        <Button variant="outline" size="sm" className="bg-white text-black border-gray-300 hover:bg-gray-100 shadow-sm">TEAM-A</Button>
                        <Button variant="outline" size="sm" className="bg-white text-black border-gray-300 hover:bg-gray-100 shadow-sm">TEAM-B</Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white text-black border-gray-300 hover:bg-gray-100 shadow-sm"
                          onClick={() => setSelectedTeam(team)}
                        >
                          See Details
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Fixtures Card below team card, only if selectedTeam is this team */}
                  {selectedTeam && selectedTeam.id === team.id && (
                    <Card className="shadow border border-gray-200 mt-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          {team.name} Fixtures
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Live Matches */}
                        {cardLiveMatches.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm text-green-600 mb-2">Live</h4>
                            <div className="space-y-2">
                              {cardLiveMatches.map((match, idx) => (
                                <div key={`live-${idx}`} className="p-3 bg-green-50 rounded-lg border border-green-200">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium text-sm">
                                      vs {match.team1.toLowerCase().startsWith(team.name.toLowerCase()) ? match.team2 : match.team1}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {match.type}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>{new Date(match.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{match.venue}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Upcoming Matches */}
                        {cardUpcomingMatches.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm text-primary mb-2">Upcoming</h4>
                            <div className="space-y-2">
                              {cardUpcomingMatches.map((match, idx) => (
                                <div key={`upcoming-${idx}`} className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium text-sm">
                                      vs {match.team1.toLowerCase().startsWith(team.name.toLowerCase()) ? match.team2 : match.team1}
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      {match.type}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>{new Date(match.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{match.venue}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recent Matches */}
                        {cardRecentMatches.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Recent</h4>
                            <div className="space-y-2">
                              {cardRecentMatches.map((match, idx) => (
                                <div key={`recent-${idx}`} className="p-3 bg-muted/30 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium text-sm">
                                      vs {match.team1.toLowerCase().startsWith(team.name.toLowerCase()) ? match.team2 : match.team1}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {match.type}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>{new Date(match.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{match.venue}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* No matches message */}
                        {!loading && cardTeamMatches.length === 0 && (
                          <div className="text-center py-4 text-muted-foreground">
                            <Calendar className="h-6 w-6 mx-auto mb-2" />
                            <p className="text-sm">No fixtures available for {team.name}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Modal for Fixtures */}
                  {selectedTeam && selectedTeam.id === team.id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-black"
                          onClick={() => setSelectedTeam(null)}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-black">{team.name} Fixtures</h2>
                        {teamMatches.length === 0 ? (
                          <p className="text-gray-500">No fixtures available for {team.name}</p>
                        ) : (
                          <div className="space-y-4">
                            {teamMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((match, idx) => (
                              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-black">vs {match.team1.toLowerCase().startsWith(team.name.toLowerCase()) ? match.team2 : match.team1}</span>
                                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{match.type}</span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600">
                                  <span><Calendar className="inline h-4 w-4 mr-1" />{new Date(match.date).toLocaleDateString()}</span>
                                  <span><MapPin className="inline h-4 w-4 mr-1" />{match.venue}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* No matches message (always hidden, fixtures only in details) */}
                  {!loading && teamMatches.length === 0 && (
                    <Card className="shadow-md border border-muted/20">
                      <CardContent className="text-center py-6">
                        <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No fixtures available for {team.name}</p>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Details Page */}
        {selectedTeam && (
          <motion.div
            className="fixed inset-0 bg-background z-50 overflow-y-auto"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <div className="p-6 max-w-4xl mx-auto min-h-screen">
              <Card className="shadow-lg border border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Trophy className="h-6 w-6 text-primary" />
                      {selectedTeam.name} Details
                    </CardTitle>
                    <Button
                      variant="outline"
                      className="shadow-sm hover:bg-primary/10"
                      onClick={hideDetails}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Teams
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      {selectedTeam.logo ? (
                        <img
                          src={selectedTeam.logo}
                          alt={`${selectedTeam.name} logo`}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <Trophy className="h-12 w-12 text-primary" />
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{selectedTeam.name}</h2>
                    {selectedTeam.description && (
                      <p className="text-sm text-muted-foreground mt-2">{selectedTeam.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {selectedTeam.captain && (
                      <div>
                        <div className="text-muted-foreground">Captain</div>
                        <div className="font-medium">{selectedTeam.captain}</div>
                      </div>
                    )}
                    {selectedTeam.founded && (
                      <div>
                        <div className="text-muted-foreground">Founded</div>
                        <div className="font-medium">{selectedTeam.founded}</div>
                      </div>
                    )}
                    {selectedTeam.home_ground && (
                      <div>
                        <div className="text-muted-foreground">Home Ground</div>
                        <div className="font-medium">{selectedTeam.home_ground}</div>
                      </div>
                    )}
                  </div>

                  {/* All related matches for this team */}
                  <div className="space-y-4 mt-8">
                    <div className="text-lg font-semibold text-center mb-3 flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      All Related Matches
                    </div>
                    {(() => {
                      const relatedMatches = getTeamMatches(selectedTeam.name).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                      if (relatedMatches.length === 0) {
                        return (
                          <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No fixtures available for this team.</p>
                          </div>
                        );
                      }
                      return (
                        <div className="space-y-3">
                          {relatedMatches.map((match, idx) => (
                            <Card key={`related-${idx}`} className="p-4 border border-gray-200 bg-white">
                              <div className="flex flex-col space-y-2">
                                <div className="font-medium text-center">
                                  {selectedTeam.name} vs {match.team1.toLowerCase().startsWith(selectedTeam.name.toLowerCase()) ? match.team2 : match.team1}
                                </div>
                                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(match.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{match.venue}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Trophy className="h-4 w-4" />
                                    <span>{match.type}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
        
      </div>
    );
  }