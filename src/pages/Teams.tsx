import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, ArrowLeft, Flame, Cloud, Wind, Waves, Mountain, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Team logos - Replace these URLs with your actual logo URLs
const teamLogos = {
  "AGNI": "https://csd-it-house-website-swapanths-projects.vercel.app/assets/3-DkQreqV5.jpg",
  "AAKASH": "https://csd-it-house-website-swapanths-projects.vercel.app/assets/5-CyKUY8ow.jpg",
  "VAYU": "https://csd-it-house-website-swapanths-projects.vercel.app/assets/2-DzUbxBBu.jpg",
  "JAL": "https://csd-it-house-website-swapanths-projects.vercel.app/assets/1-UA3p0Axg.jpg",
  "PRUDHVI": "https://csd-it-house-website-swapanths-projects.vercel.app/assets/4-CiJ3fDLl.jpg"
};

// Fallback icons
const teamIcons = {
  "AGNI": Flame,
  "AAKASH": Cloud, 
  "VAYU": Wind,
  "JAL": Waves,
  "PRUDHVI": Mountain
};

const teams = [
  { id: "1", name: "AGNI", icon: "AGNI", description: "AGNI brings fiery passion to the cricket field.", wins: 12 },
  { id: "2", name: "AAKASH", icon: "AAKASH", description: "AAKASH soars high with strategic gameplay.", wins: 8 },
  { id: "3", name: "VAYU", icon: "VAYU", description: "VAYU moves like the wind with fast bowlers.", wins: 15 },
  { id: "4", name: "JAL", icon: "JAL", description: "JAL flows smoothly with consistent performance.", wins: 10 },
  { id: "5", name: "PRUDHVI", icon: "PRUDHVI", description: "PRUDHVI stands firm with solid defense.", wins: 7 }
];

const generateAllTeams = () => {
  const captainsA = ["P.PRASANTH", "R.KUMAR", "S.REDDY", "A.SHARMA", "V.KRISHNA"];
  const captainsB = ["K.KIRAN", "M.RAVI", "D.MOHAN", "N.SURESH", "T.VENKAT"];
  const Grounds = ["B-HUB", "B-HUB", "B-HUB", "B-HUB", "B-HUB"];
  
  const allTeams = [];
  
  teams.forEach((houseTeam, index) => {
    const teamA = {
      id: `${houseTeam.id}_A`,
      name: `${houseTeam.name} TEAM-A`,
      icon: houseTeam.icon,
      captain: captainsA[index],
      home_ground: Grounds[index],
      description: `${houseTeam.name} TEAM-A specializes in aggressive gameplay and strategic plays.`,
      wins: houseTeam.wins + 2,
      teamType: "A",
      houseTeam: houseTeam.name,
      ranking: index + 3,
      speciality: "Power Play",
      pastMatches: [
        { opponent: "VAYU TEAM-B", result: "Won", score: "145/6 vs 132/8", date: "15 Aug 2023" },
        { opponent: "JAL TEAM-A", result: "Lost", score: "120/10 vs 125/7", date: "10 Aug 2023" }
      ]
    };

    const teamB = {
      id: `${houseTeam.id}_B`,
      name: `${houseTeam.name} TEAM-B`,
      icon: houseTeam.icon,
      captain: captainsB[index],
      home_ground: Grounds[(index + 2) % Grounds.length],
      description: `${houseTeam.name} TEAM-B focuses on tactical gameplay and team coordination.`,
      wins: houseTeam.wins + 4,
      teamType: "B",
      houseTeam: houseTeam.name,
      ranking: index + 1,
      speciality: "Strategic Play",
      pastMatches: [
        { opponent: "AGNI TEAM-A", result: "Lost", score: "110/8 vs 115/5", date: "14 Aug 2023" },
        { opponent: "AAKASH TEAM-B", result: "Won", score: "130/7 vs 125/9", date: "8 Aug 2023" }
      ]
    };

    allTeams.push(teamA, teamB);
  });

  return allTeams;
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3 }
  },
  hover: { y: -4, transition: { duration: 0.2 } }
};

const logoVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
};

const detailsVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } }
};

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [expandedHouse, setExpandedHouse] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const allTeams = generateAllTeams();

  const showDetails = (teamId) => {
    setSelectedTeam(allTeams.find((team) => team.id === teamId));
  };

  const hideDetails = () => {
    setSelectedTeam(null);
  };

  const toggleHouse = (houseName) => {
    setExpandedHouse(expandedHouse === houseName ? null : houseName);
  };

  const handleImageError = (teamName) => {
    setImageErrors(prev => ({ ...prev, [teamName]: true }));
  };

  const TeamLogo = ({ team }) => {
    const IconComponent = teamIcons[team.icon] || Trophy;
    const logoUrl = teamLogos[team.icon];
    
    return (
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden"
      >
        {!imageErrors[team.icon] && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${team.name} logo`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(team.icon)}
          />
        ) : (
          <IconComponent className="h-8 w-8 text-gray-600" />
        )}
      </motion.div>
    );
  };

  const HouseCard = ({ house }) => {
    const IconComponent = teamIcons[house.name] || Trophy;
    const logoUrl = teamLogos[house.name];
    const isExpanded = expandedHouse === house.name;
    
    return (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                  {!imageErrors[house.name] && logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={`${house.name} logo`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(house.name)}
                    />
                  ) : (
                    <IconComponent className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {house.name} HOUSE
                  </CardTitle>
                  <p className="text-sm text-gray-600">{house.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleHouse(house.name)}
                className="flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Teams
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    View Teams
                  </>
                )}
              </Button>
            </div>
          </CardHeader>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <TeamCard team={allTeams.find(t => t.id === `${house.id}_A`)} />
                    <TeamCard team={allTeams.find(t => t.id === `${house.id}_B`)} />
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  };

  const TeamCard = ({ team }) => {
    return (
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <TeamLogo team={team} />
            </div>
            
            <CardTitle className="text-lg font-semibold text-gray-900">
              {team.name}
            </CardTitle>
            
            <Badge variant="outline" className="mt-2 text-xs font-medium">
              TEAM {team.teamType}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 text-center">{team.description}</p>

            <div className="grid grid-cols-2 gap-3">
              {team.captain && (
                <div className="text-center p-2 border border-gray-100 rounded">
                  <div className="text-xs text-gray-500 mb-1">Captain</div>
                  <div className="text-sm font-medium">{team.captain}</div>
                </div>
              )}
              {team.ranking && (
                <div className="text-center p-2 border border-gray-100 rounded">
                  <div className="text-xs text-gray-500 mb-1">Ranking</div>
                  <div className="text-sm font-bold">#{team.ranking}</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {team.home_ground && (
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500 mb-1">Home Ground</div>
                  <div className="text-xs font-medium">{team.home_ground}</div>
                </div>
              )}
              {team.speciality && (
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500 mb-1">Speciality</div>
                  <div className="text-xs font-medium">{team.speciality}</div>
                </div>
              )}
            </div>

            <div className="text-center p-3 border border-gray-200 rounded">
              <div className="text-xs text-gray-500 mb-1">Total Wins</div>
              <div className="text-2xl font-bold text-gray-900">{team.wins}</div>
            </div>

            <div className="flex justify-center space-x-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => window.location.href = "/players"}
              >
                <Users className="mr-1 h-3 w-3" />
                Players
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => showDetails(team.id)}
              >
                <Trophy className="mr-1 h-3 w-3" />
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {!selectedTeam && (
          <motion.div 
            className="space-y-8 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cricket Teams</h1>
                <p className="text-gray-600 mt-1">
                  All teams from the 5 elemental houses - Team A and Team B for each house
                </p>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                <Trophy className="mr-2 h-4 w-4" />
                10 Teams
              </Badge>
            </div>

            <div className="space-y-4">
              {teams.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Page */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6 max-w-4xl mx-auto">
              <Card className="border border-gray-200 bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Trophy className="h-5 w-5 text-gray-600" />
                      {selectedTeam.name} Details
                    </CardTitle>
                    <Button variant="outline" onClick={hideDetails}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Teams
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center mb-4">
                    <TeamLogo team={selectedTeam} />
                  </div>

                  <div className="text-center">
                    <h2 className="text-lg font-semibold">{selectedTeam.name}</h2>
                    <Badge variant="outline" className="mt-2">
                      TEAM {selectedTeam.teamType}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">{selectedTeam.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border border-gray-200 rounded">
                      <div className="text-sm text-gray-500">Captain</div>
                      <div className="font-medium">{selectedTeam.captain}</div>
                    </div>
                    <div className="text-center p-3 border border-gray-200 rounded">
                      <div className="text-sm text-gray-500">House</div>
                      <div className="font-medium">{selectedTeam.houseTeam}</div>
                    </div>
                    <div className="text-center p-3 border border-gray-200 rounded">
                      <div className="text-sm text-gray-500">Ranking</div>
                      <div className="font-medium">#{selectedTeam.ranking}</div>
                    </div>
                    <div className="text-center p-3 border border-gray-200 rounded">
                      <div className="text-sm text-gray-500">Home Ground</div>
                      <div className="font-medium">{selectedTeam.home_ground}</div>
                    </div>
                  </div>

                  <div className="text-center p-4 border border-gray-200 rounded">
                    <div className="text-sm text-gray-500">Total Wins</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedTeam.wins}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 text-center mb-3">Past Matches</div>
                    <div className="space-y-3">
                      {selectedTeam.pastMatches?.map((match, idx) => (
                        <div key={idx} className="p-3 border border-gray-200 rounded">
                          <div className="font-medium">
                            vs {match.opponent} - 
                            <span className={match.result === 'Won' ? 'text-green-600' : 'text-red-600'}>
                              {' '}{match.result}
                            </span>
                          </div>
                          <div className="text-gray-600">{match.score}</div>
                          <div className="text-gray-400 text-sm">{match.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}