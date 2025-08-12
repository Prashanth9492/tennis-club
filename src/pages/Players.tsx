import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Trophy, TrendingUp } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

interface Player {
  _id: string;
  name: string;
  position?: string;
  team?: string;
  age?: number;
  battingStyle?: string;
  bowlingStyle?: string;
  description?: string;
  image?: string;
  batting_average?: number;
  bowling_average?: number;
  house?: string;
}

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5001/api/players")
      .then(res => setPlayers(res.data))
      .catch(() => setPlayers([]));
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Players</h1>
          <p className="text-muted-foreground mt-2">
            Discover the {players.length} talented cricketers in our championship
          </p>
        </div>
        <Badge className="cricket-shadow text-lg px-4 py-2">
          <User className="mr-2 h-5 w-5" />
          {players.length} Players
        </Badge>
      </div>
 {/* Statistics Summary */}
      <Card className="cricket-shadow mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Player Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{players.length}</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {players.filter(p => p.position === 'batsman').length}
              </div>
              <div className="text-sm text-muted-foreground">Batsmen</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {players.filter(p => p.position === 'bowler').length}
              </div>
              <div className="text-sm text-muted-foreground">Bowlers</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">
                {players.filter(p => p.position === 'all-rounder').length}
              </div>
              <div className="text-sm text-muted-foreground">All-rounders</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Players Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {players.map((player) => (
          <Card key={player._id} className="cricket-shadow hover:scale-105 transition-transform duration-200">
  <CardHeader className="text-center pb-2">
    <Avatar className="w-20 h-20 mx-auto mb-2">
      <AvatarImage src={player.image} alt={player.name} />
      <AvatarFallback className="text-lg">
        {player.name.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
    <CardTitle className="text-lg">{player.name}</CardTitle>
  {player.team && <Badge variant="secondary" className="mt-1">{player.team}</Badge>}
  {player.house && <div className="text-xs mt-1 text-muted-foreground">🏠 House: {player.house.charAt(0).toUpperCase() + player.house.slice(1)}</div>}
  </CardHeader>

  <CardContent className="text-center space-y-3">
    {player.position && (
      <div className="text-sm">
        <Badge variant="outline">{player.position}</Badge>
      </div>
    )}
    <div className="grid grid-cols-2 gap-2 text-xs">
      {player.age && (
        <div className="bg-muted/50 p-2 rounded">
          <div className="font-medium">{player.age}</div>
          <div className="text-muted-foreground">Age</div>
        </div>
      )}
      {player.battingStyle && (
        <div className="bg-muted/50 p-2 rounded">
          <div className="font-medium">{player.battingStyle}</div>
          <div className="text-muted-foreground">Bat Style</div>
        </div>
      )}
      {player.bowlingStyle && (
        <div className="bg-muted/50 p-2 rounded">
          <div className="font-medium">{player.bowlingStyle}</div>
          <div className="text-muted-foreground">Bowl Style</div>
        </div>
      )}
    </div>
    {player.description && (
      <p className="text-xs text-muted-foreground">{player.description}</p>
    )}
    <Button variant="outline" size="sm" className="w-full cricket-shadow">
      <TrendingUp className="mr-1 h-4 w-4" />
      View Stats
    </Button>
  </CardContent>
</Card>

        ))}
      </div>

     
    </div>
  );
};

export default Players;