import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Star, TrendingUp, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import aakash from "@/assets/aakash.png";
import srkr from "@/assets/srkrec-logo.png";
import agni from "@/assets/agni.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import prudhvi from "@/assets/prudhvi.jpg";

// Mock data for the 5 teams with wins and past matches
const teams = [
  {
    id: "1",
    name: "AGNI",
    logo: agni,
    captain: "Arun Sharma",
    home_ground: "Fire Stadium",
    founded: 2010,
    description: "",
    wins: 12,
    pastMatches: [
      { opponent: "AAKASH", result: "Won", score: "AGNI 180/4 - AAKASH 165/8", date: "2024-03-15" },
      { opponent: "VAYU", result: "Lost", score: "AGNI 140/7 - VAYU 142/3", date: "2024-04-10" },
    ],
  },
  {
    id: "2",
    name: "AAKASH",
    logo: aakash,
    captain: "Vikram Singh",
    home_ground: "Sky Arena",
    founded: 2012,
    description: "AAKASH soars high with strategic gameplay and swift fielding.",
    wins: 8,
    pastMatches: [
      { opponent: "AGNI", result: "Lost", score: "AAKASH 165/8 - AGNI 180/4", date: "2024-03-15" },
      { opponent: "JAL", result: "Won", score: "AAKASH 200/5 - JAL 190/6", date: "2024-05-20" },
    ],
  },
  {
    id: "3",
    name: "VAYU",
    logo: vayu,
    captain: "Rahul Verma",
    home_ground: "Wind Park",
    founded: 2008,
    description: "VAYU moves like the wind, with fast bowlers dominating the pitch.",
    wins: 15,
    pastMatches: [
      { opponent: "AGNI", result: "Won", score: "VAYU 142/3 - AGNI 140/7", date: "2024-04-10" },
      { opponent: "PRUDHVI", result: "Won", score: "VAYU 175/5 - PRUDHVI 160/9", date: "2024-06-05" },
    ],
  },
  {
    id: "4",
    name: "JAL",
    logo: jal,
    captain: "Sameer Patel",
    home_ground: "Waterfront Ground",
    founded: 2015,
    description: "JAL flows smoothly with consistent all-round performance.",
    wins: 10,
    pastMatches: [
      { opponent: "AAKASH", result: "Lost", score: "JAL 190/6 - AAKASH 200/5", date: "2024-05-20" },
      { opponent: "PRUDHVI", result: "Won", score: "JAL 155/4 - PRUDHVI 150/8", date: "2024-07-12" },
    ],
  },
  {
    id: "5",
    name: "PRUDHVI",
    logo: prudhvi,
    captain: "Kiran Reddy",
    home_ground: "Earth Oval",
    founded: 2005,
    description: "PRUDHVI stands firm with solid defense and powerful batting.",
    wins: 7,
    pastMatches: [
      { opponent: "VAYU", result: "Lost", score: "PRUDHVI 160/9 - VAYU 175/5", date: "2024-06-05" },
      { opponent: "JAL", result: "Lost", score: "PRUDHVI 150/8 - JAL 155/4", date: "2024-07-12" },
    ],
  },
];

// Animation variants for card landing effect
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // use a string value for ease
    },
  },
};

// Animation variants for details page
const detailsVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // use a string value for ease
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.5,
      ease: "easeIn", // use a string value for ease
    },
  },
};

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const showDetails = (teamId) => {
    setSelectedTeam(teams.find((team) => team.id === teamId));
  };

  const hideDetails = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Teams Grid */}
      <div className={`space-y-6 p-6 ${selectedTeam ? "hidden" : "block"}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cricket Teams</h1>
            <p className="text-muted-foreground mt-2">
              Meet the 5 elemental teams competing in the championship
            </p>
          </div>

          <Badge className="shadow-lg text-lg px-4 py-2 bg-primary text-primary-foreground">
            <Trophy className="mr-2 h-5 w-5" />
            5 Teams
          </Badge>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <Card className="shadow-lg hover:scale-105 transition-transform duration-200 border border-primary/20">
                <CardHeader className="text-center pb-2">
                  <div className="relative mx-auto mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={`${team.name} logo`}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <Trophy className="h-10 w-10 text-primary" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  {team.description && (
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {team.captain && (
                      <div className="space-y-1">
                        <div className="text-muted-foreground">Captain</div>
                        <div className="font-medium">{team.captain}</div>
                      </div>
                    )}

                    {team.founded && (
                      <div className="space-y-1">
                        <div className="text-muted-foreground">Founded</div>
                        <div className="font-medium">{team.founded}</div>
                      </div>
                    )}
                  </div>

                  {team.home_ground && (
                    <div className="text-sm">
                      <div className="text-muted-foreground">Home Ground</div>
                      <div className="font-medium">{team.home_ground}</div>
                    </div>
                  )}

                  <div className="flex justify-center space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="shadow-sm hover:bg-primary/10"
                      onClick={() => window.location.href = "/players"}
                    >
                      <Users className="mr-1 h-4 w-4" />
                      Players
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="shadow-sm hover:bg-primary/10"
                      onClick={() => showDetails(team.id)}
                    >
                      <Trophy className="mr-1 h-4 w-4" />
                      See Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Championship Summary 
        <Card className="shadow-lg border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Championship Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Total Teams</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">2024</div>
                <div className="text-sm text-muted-foreground">Season</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">Active</div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>*/}
      </div>

      {/* Details Page */}
      {selectedTeam && (
        <motion.div
          className="fixed inset-0 bg-background z-50 overflow-y-auto"
          variants={detailsVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
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

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-muted-foreground">Total Wins</div>
                    <div className="text-2xl font-bold text-primary">{selectedTeam.wins}</div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-center mb-2">Past Matches</div>
                    {selectedTeam.pastMatches.length > 0 ? (
                      <div className="space-y-2">
                        {selectedTeam.pastMatches.map((match, idx) => (
                          <Card key={idx} className="p-4 bg-muted/50">
                            <div className="font-medium">
                              vs {match.opponent} - {match.result}
                            </div>
                            <div className="text-muted-foreground">{match.score}</div>
                            <div className="text-muted-foreground text-xs">{match.date}</div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">No past matches recorded.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}