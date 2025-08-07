import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addDocument } from "@/hooks/useFirebase";

const TeamForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    founded: "",
    captain: "",
    home_ground: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDocument("teams", {
        ...formData,
        founded: parseInt(formData.founded),
      });

      toast({
        title: "Success",
        description: "Team added successfully",
      });

      setFormData({
        name: "",
        logo: "",
        description: "",
        founded: "",
        captain: "",
        home_ground: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add team",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Team</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="captain">Captain</Label>
              <Input
                id="captain"
                value={formData.captain}
                onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded">Founded Year</Label>
              <Input
                id="founded"
                type="number"
                value={formData.founded}
                onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home_ground">Home Ground</Label>
              <Input
                id="home_ground"
                value={formData.home_ground}
                onChange={(e) => setFormData({ ...formData, home_ground: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://example.com/team-logo.png"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Team"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeamForm;