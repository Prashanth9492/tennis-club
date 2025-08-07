import { HeroSection } from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, Trophy, TrendingUp, Users, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-8">
      <HeroSection />
      
      {/* Quick Stats Dashboard */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="text-center p-6 cricket-shadow hover:scale-105 smooth-transition">
          <Zap className="h-8 w-8 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">3</div>
          <div className="text-sm text-muted-foreground">Live Matches</div>
        </Card>
        
        <Card className="text-center p-6 cricket-shadow hover:scale-105 smooth-transition">
          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">4</div>
          <div className="text-sm text-muted-foreground">Teams</div>
        </Card>
        
        <Card className="text-center p-6 cricket-shadow hover:scale-105 smooth-transition">
          <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Championships</div>
        </Card>
        
        <Card className="text-center p-6 cricket-shadow hover:scale-105 smooth-transition">
          <Star className="h-8 w-8 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">120</div>
          <div className="text-sm text-muted-foreground">Players</div>
        </Card>
      </div>

      {/* Featured Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Matches */}
        <Card className="cricket-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Matches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-field-gradient rounded-lg">
              <div>
                <div className="font-semibold">St. Johns vs Christ University</div>
                <div className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</div>
              </div>
              <Badge>Semifinal</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <div className="font-semibold">Mount Carmel vs Bangalore Univ</div>
                <div className="text-sm text-muted-foreground">Dec 25, 2:00 PM</div>
              </div>
              <Badge variant="outline">League</Badge>
            </div>
            
            <Button variant="outline" className="w-full">
              View All Fixtures
            </Button>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="cricket-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-field-gradient rounded-lg">
              <div>
                <div className="font-semibold">Rahul Sharma</div>
                <div className="text-sm text-muted-foreground">Highest Scorer</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-secondary">1,245 runs</div>
                <div className="text-sm text-muted-foreground">Avg: 52.1</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <div className="font-semibold">Arjun Patel</div>
                <div className="text-sm text-muted-foreground">Best Bowler</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-secondary">45 wickets</div>
                <div className="text-sm text-muted-foreground">Avg: 18.2</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              View Player Rankings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
