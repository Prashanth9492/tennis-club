import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import agni from "@/assets/agni.jpg";
import aakash from "@/assets/aakash.png";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";
import prudhvi from "@/assets/prudhvi.jpg";

const houses = [
  {
    name: "AGNI",
    description: "AGNI is known for its fiery spirit and aggressive gameplay.",
    logo: agni,
    teams: [
      {
        name: "Team A",
        captain: "Arun Sharma",
        logo: agni,
        home_ground: "Fire Stadium",
        players: ["Player 1", "Player 2", "Player 3"],
        matches: [
          { opponent: "Team B", result: "Won", score: "180/4 - 165/8" },
        ],
      },
      {
        name: "Team B",
        captain: "Ravi Kumar",
        logo: agni,
        home_ground: "Fire Stadium",
        players: ["Player 4", "Player 5", "Player 6"],
        matches: [
          { opponent: "Team A", result: "Lost", score: "165/8 - 180/4" },
        ],
      },
    ],
  },
  {
    name: "AAKASH",
    description: "AAKASH soars high with strategic gameplay and swift fielding.",
    logo: aakash,
    teams: [
      {
        name: "Team A",
        captain: "Vikram Singh",
        logo: aakash,
        home_ground: "Sky Arena",
        players: ["Player 7", "Player 8", "Player 9"],
        matches: [
          { opponent: "Team B", result: "Won", score: "200/5 - 190/6" },
        ],
      },
      {
        name: "Team B",
        captain: "Amit Patel",
        logo: aakash,
        home_ground: "Sky Arena",
        players: ["Player 10", "Player 11", "Player 12"],
        matches: [
          { opponent: "Team A", result: "Lost", score: "190/6 - 200/5" },
        ],
      },
    ],
  },
  {
    name: "VAYU",
    description: "VAYU moves like the wind, with fast bowlers dominating the pitch.",
    logo: vayu,
    teams: [
      {
        name: "Team A",
        captain: "Rahul Verma",
        logo: vayu,
        home_ground: "Wind Park",
        players: ["Player 13", "Player 14", "Player 15"],
        matches: [
          { opponent: "Team B", result: "Won", score: "175/5 - 160/9" },
        ],
      },
      {
        name: "Team B",
        captain: "Suresh Das",
        logo: vayu,
        home_ground: "Wind Park",
        players: ["Player 16", "Player 17", "Player 18"],
        matches: [
          { opponent: "Team A", result: "Lost", score: "160/9 - 175/5" },
        ],
      },
    ],
  },
  {
    name: "JAL",
    description: "JAL flows smoothly with consistent all-round performance.",
    logo: jal,
    teams: [
      {
        name: "Team A",
        captain: "Sameer Patel",
        logo: jal,
        home_ground: "Waterfront Ground",
        players: ["Player 19", "Player 20", "Player 21"],
        matches: [
          { opponent: "Team B", result: "Won", score: "155/4 - 150/8" },
        ],
      },
      {
        name: "Team B",
        captain: "Rohan Mehta",
        logo: jal,
        home_ground: "Waterfront Ground",
        players: ["Player 22", "Player 23", "Player 24"],
        matches: [
          { opponent: "Team A", result: "Lost", score: "150/8 - 155/4" },
        ],
      },
    ],
  },
  {
    name: "PRUDHVI",
    description: "PRUDHVI stands firm with solid defense and powerful batting.",
    logo: prudhvi,
    teams: [
      {
        name: "Team A",
        captain: "Kiran Reddy",
        logo: prudhvi,
        home_ground: "Earth Oval",
        players: ["Player 25", "Player 26", "Player 27"],
        matches: [
          { opponent: "Team B", result: "Lost", score: "160/9 - 175/5" },
        ],
      },
      {
        name: "Team B",
        captain: "Manoj Rao",
        logo: prudhvi,
        home_ground: "Earth Oval",
        players: ["Player 28", "Player 29", "Player 30"],
        matches: [
          { opponent: "Team A", result: "Won", score: "175/5 - 160/9" },
        ],
      },
    ],
  },
];

export default function Houses() {
  const [selectedHouse, setSelectedHouse] = useState(null);

  return (
    <div className="min-h-screen p-8">
      {!selectedHouse ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {houses.map((house, idx) => (
            <Card key={house.name} className="shadow-lg border border-primary/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <img src={house.logo} alt={house.name} className="w-16 h-16 rounded-full object-cover" />
                </div>
                <CardTitle className="text-xl">{house.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">{house.description}</p>
                <Button onClick={() => setSelectedHouse(house)} variant="outline">
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button className="mb-6" variant="outline" onClick={() => setSelectedHouse(null)}>
            Back
          </Button>
          <div className="grid gap-6 md:grid-cols-2">
            {selectedHouse.teams.map((team) => (
              <Card key={team.name} className="shadow-lg border border-primary/20">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-center">
                    <div className="text-muted-foreground">Captain</div>
                    <div className="font-medium">{team.captain}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Home Ground</div>
                    <div className="font-medium">{team.home_ground}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Players</div>
                    <div>{team.players.join(", ")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">Matches</div>
                    {team.matches.map((match, idx) => (
                      <div key={idx} className="text-xs">
                        vs {match.opponent} - {match.result} ({match.score})
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
