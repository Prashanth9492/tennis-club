import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface Player {
  _id?: string;
  name: string;
  team: string;
  matches: number;
  innings: number;
  runs: number;
  highest_score: number;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  balls_faced: number;
  outs: number;
  age?: string;
  position?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  description?: string;
  photoUrl?: string;
  pinno: string;
}

export default function PlayerManagement() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [playerForm, setPlayerForm] = useState<Player>({
    name: '',
    team: '',
    matches: 0,
    innings: 0,
    runs: 0,
    highest_score: 0,
    hundreds: 0,
    fifties: 0,
    fours: 0,
    sixes: 0,
    balls_faced: 0,
    outs: 0,
    age: '',
    position: '',
    battingStyle: '',
    bowlingStyle: '',
    description: '',
    photoUrl: '',
    pinno: ''
  });

  const teams = ['AGNI', 'AAKASH', 'VAYU', 'JAL', 'PRUDHVI'];
  const positions = ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'];
  const battingStyles = ['Right-handed', 'Left-handed'];
  const bowlingStyles = ['Right-arm fast', 'Left-arm fast', 'Right-arm medium', 'Left-arm medium', 'Right-arm spin', 'Left-arm spin'];

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      toast({
        title: "Error",
        description: "Failed to fetch players",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedPlayer) {
        // Update existing player
        await axios.put(`http://localhost:5001/api/players/${selectedPlayer._id}`, playerForm);
        toast({
          title: "Success",
          description: "Player updated successfully",
        });
      } else {
        // Create new player
        await axios.post('http://localhost:5001/api/players', playerForm);
        toast({
          title: "Success",
          description: "Player created successfully",
        });
      }
      
      fetchPlayers();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving player:', error);
      toast({
        title: "Error",
        description: "Failed to save player",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
    setPlayerForm(player);
    setIsDialogOpen(true);
  };

  const handleDelete = async (playerId: string) => {
    if (!confirm('Are you sure you want to delete this player?')) return;

    try {
      await axios.delete(`http://localhost:5001/api/players/${playerId}`);
      toast({
        title: "Success",
        description: "Player deleted successfully",
      });
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
      toast({
        title: "Error",
        description: "Failed to delete player",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setPlayerForm({
      name: '',
      team: '',
      matches: 0,
      innings: 0,
      runs: 0,
      highest_score: 0,
      hundreds: 0,
      fifties: 0,
      fours: 0,
      sixes: 0,
      balls_faced: 0,
      outs: 0,
      age: '',
      position: '',
      battingStyle: '',
      bowlingStyle: '',
      description: '',
      photoUrl: '',
      pinno: ''
    });
    setSelectedPlayer(null);
  };

  const handleInputChange = (field: keyof Player, value: string | number) => {
    setPlayerForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Player Management</h2>
          <p className="text-muted-foreground">Manage player profiles and statistics</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPlayer ? 'Edit Player' : 'Add New Player'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Basic Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={playerForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="team">Team *</Label>
                    <Select value={playerForm.team} onValueChange={(value) => handleInputChange('team', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map(team => (
                          <SelectItem key={team} value={team}>{team}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pinno">PIN Number *</Label>
                    <Input
                      id="pinno"
                      value={playerForm.pinno}
                      onChange={(e) => handleInputChange('pinno', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={playerForm.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Select value={playerForm.position} onValueChange={(value) => handleInputChange('position', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(pos => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="matches">Matches</Label>
                      <Input
                        id="matches"
                        type="number"
                        value={playerForm.matches}
                        onChange={(e) => handleInputChange('matches', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="innings">Innings</Label>
                      <Input
                        id="innings"
                        type="number"
                        value={playerForm.innings}
                        onChange={(e) => handleInputChange('innings', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="runs">Runs</Label>
                      <Input
                        id="runs"
                        type="number"
                        value={playerForm.runs}
                        onChange={(e) => handleInputChange('runs', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="highest_score">Highest Score</Label>
                      <Input
                        id="highest_score"
                        type="number"
                        value={playerForm.highest_score}
                        onChange={(e) => handleInputChange('highest_score', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <Label htmlFor="hundreds">100s</Label>
                      <Input
                        id="hundreds"
                        type="number"
                        value={playerForm.hundreds}
                        onChange={(e) => handleInputChange('hundreds', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fifties">50s</Label>
                      <Input
                        id="fifties"
                        type="number"
                        value={playerForm.fifties}
                        onChange={(e) => handleInputChange('fifties', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fours">4s</Label>
                      <Input
                        id="fours"
                        type="number"
                        value={playerForm.fours}
                        onChange={(e) => handleInputChange('fours', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sixes">6s</Label>
                      <Input
                        id="sixes"
                        type="number"
                        value={playerForm.sixes}
                        onChange={(e) => handleInputChange('sixes', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="balls_faced">Balls Faced</Label>
                      <Input
                        id="balls_faced"
                        type="number"
                        value={playerForm.balls_faced}
                        onChange={(e) => handleInputChange('balls_faced', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="outs">Outs</Label>
                      <Input
                        id="outs"
                        type="number"
                        value={playerForm.outs}
                        onChange={(e) => handleInputChange('outs', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Players Table */}
      <Card>
        <CardHeader>
          <CardTitle>Players ({players.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Runs</TableHead>
                  <TableHead>Avg</TableHead>
                  <TableHead>SR</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player._id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{player.runs}</TableCell>
                    <TableCell>{player.outs > 0 ? (player.runs / player.outs).toFixed(2) : player.runs}</TableCell>
                    <TableCell>{player.balls_faced > 0 ? ((player.runs / player.balls_faced) * 100).toFixed(2) : 0}</TableCell>
                    <TableCell>{player.matches}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(player)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(player._id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
