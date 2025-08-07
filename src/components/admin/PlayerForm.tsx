import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addDocument } from "@/hooks/useFirebase";

const PlayerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    role: "",
    age: "",
    batting_average: "",
    bowling_average: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDocument("players", {
        ...formData,
        age: parseInt(formData.age),
        batting_average: parseFloat(formData.batting_average) || 0,
        bowling_average: parseFloat(formData.bowling_average) || 0,
      });

      toast({
        title: "Success",
        description: "Player added successfully",
      });

      setFormData({
        name: "",
        team: "",
        role: "",
        age: "",
        batting_average: "",
        bowling_average: "",
        image: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add player",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Player</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Player Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Input
                id="team"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Batsman">Batsman</SelectItem>
                  <SelectItem value="Bowler">Bowler</SelectItem>
                  <SelectItem value="All-rounder">All-rounder</SelectItem>
                  <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batting_average">Batting Average</Label>
              <Input
                id="batting_average"
                type="number"
                step="0.01"
                value={formData.batting_average}
                onChange={(e) => setFormData({ ...formData, batting_average: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bowling_average">Bowling Average</Label>
              <Input
                id="bowling_average"
                type="number"
                step="0.01"
                value={formData.bowling_average}
                onChange={(e) => setFormData({ ...formData, bowling_average: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/player-image.jpg"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Player"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlayerForm;