import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Trophy, Target, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Player {
  id: string;
  name: string;
  role?: string;
  team?: string;
  age?: number;
  batting_average?: number;
  bowling_average?: number;
  image?: string;
}

export default function Players() {
  // Sample mock data for demo mode
  const mockPlayers: Player[] = [
    {
      id: '1',
      name: 'Rohit Sharma',
      role: 'Batsman',
      team: 'SRKR Tigers',
      age: 28,
      batting_average: 45.2,
      bowling_average: 0,
      image: '',
    },
    {
      id: '2',
      name: 'Jasprit Bumrah',
      role: 'Bowler',
      team: 'SRKR Lions',
      age: 26,
      batting_average: 12.5,
      bowling_average: 21.3,
      image: '',
    },
    {
      id: '2',
      name: 'Jasprit Bumrah',
      role: 'Bowler',
      team: 'SRKR Lions',
      age: 26,
      batting_average: 12.5,
      bowling_average: 21.3,
      image: '',
    },
    {
      id: '3',
      name: 'Hardik Pandya',
      role: 'All-rounder',
      team: 'SRKR Eagles',
      age: 27,
      batting_average: 32.8,
      bowling_average: 28.7,
      image: '',
    },
    {
      id: '4',
      name: 'MS Dhoni',
      role: 'Wicket Keeper',
      team: 'SRKR Tigers',
      age: 34,
      batting_average: 39.4,
      bowling_average: 0,
      image: '',
    },
  ];
  // Always use mock data for display
  const displayPlayers = mockPlayers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Players</h1>
          <p className="text-muted-foreground mt-2">
            Discover the {displayPlayers.length} talented cricketers in our championship
          </p>
        </div>
        <Badge className="cricket-shadow text-lg px-4 py-2">
          <User className="mr-2 h-5 w-5" />
          {displayPlayers.length} Players
        </Badge>
      </div>

      {/* Players Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayPlayers.map((player) => (
          <Card key={player.id} className="cricket-shadow hover:scale-105 transition-transform duration-200">
            <CardHeader className="text-center pb-2">
              <Avatar className="w-20 h-20 mx-auto mb-2">
                <AvatarImage src={player.image} alt={player.name} />
                <AvatarFallback className="text-lg">
                  {player.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{player.name}</CardTitle>
              {player.team && (
                <Badge variant="secondary" className="mt-1">
                  {player.team}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="text-center space-y-3">
              {player.role && (
                <div className="text-sm">
                  <Badge variant="outline">{player.role}</Badge>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {player.age && (
                  <div className="bg-muted/50 p-2 rounded">
                    <div className="font-medium">{player.age}</div>
                    <div className="text-muted-foreground">Age</div>
                  </div>
                )}
                {player.batting_average && (
                  <div className="bg-muted/50 p-2 rounded">
                    <div className="font-medium">{player.batting_average.toFixed(1)}</div>
                    <div className="text-muted-foreground">Bat Avg</div>
                  </div>
                )}
                {player.bowling_average && (
                  <div className="bg-muted/50 p-2 rounded">
                    <div className="font-medium">{player.bowling_average.toFixed(1)}</div>
                    <div className="text-muted-foreground">Bowl Avg</div>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full cricket-shadow">
                <TrendingUp className="mr-1 h-4 w-4" />
                View Stats
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Summary */}
      <Card className="cricket-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Player Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{displayPlayers.length}</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {displayPlayers.filter(p => p.role === 'Batsman').length}
              </div>
              <div className="text-sm text-muted-foreground">Batsmen</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {displayPlayers.filter(p => p.role === 'Bowler').length}
              </div>
              <div className="text-sm text-muted-foreground">Bowlers</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">
                {displayPlayers.filter(p => p.role === 'All-rounder').length}
              </div>
              <div className="text-sm text-muted-foreground">All-rounders</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}