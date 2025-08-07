import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Trophy } from "lucide-react";
import cricketHero from "@/assets/cricket-hero.jpg";

export function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cricketHero} 
          alt="Cricket Stadium" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        <div className="animate-hero-fade">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            College Cricket
            <span className="block text-secondary animate-cricket-bounce inline-block ml-4">
              Champions
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Experience the thrill of college cricket with live scores, player statistics, 
            team rankings, and comprehensive match coverage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="cricket-shadow hover:scale-105 smooth-transition bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Play className="mr-2 h-5 w-5" />
              Watch Live
            </Button>
            
            <Button size="lg" className="cricket-shadow hover:scale-105 smooth-transition bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Statistics
            </Button>
          </div>

          {/* Live Score Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  Live Match
                </h3>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  LIVE
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">St. Johns College</span>
                  <span className="text-2xl font-bold text-secondary">156/4</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span>vs Christ University</span>
                  <span className="text-sm">18.2 overs</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  Recent Result
                </h3>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                  COMPLETED
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Mount Carmel</span>
                  <span className="text-2xl font-bold text-secondary">189/6</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span>beat Bangalore University</span>
                  <span className="text-sm">Won by 34 runs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Cricket Ball */}
      <div className="absolute bottom-10 right-10 w-12 h-12 bg-red-600 rounded-full animate-cricket-bounce opacity-80 hidden lg:block shadow-lg">
        <div className="w-full h-full rounded-full border-2 border-white relative overflow-hidden">
          {/* Cricket ball seam */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-white rounded-full"></div>
          {/* Curved seam lines */}
          <div className="absolute top-2 left-2 w-8 h-8 border border-white/50 rounded-full"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border border-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}