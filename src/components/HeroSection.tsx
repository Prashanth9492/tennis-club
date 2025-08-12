import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Trophy } from "lucide-react";
import cricketHero from "@/assets/cricket-hero.jpg";
import { Link } from 'react-router-dom';
import aakash from "@/assets/aakash.png";
import srkr from "@/assets/srkrec-logo.png";
import agni from "@/assets/agni.jpg";
import prudhvi from "@/assets/prudhvi.jpg";
import vayu from "@/assets/vayu.jpg";
import jal from "@/assets/jal.jpg";


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
            <Link to="/live-scores">
              <Button size="lg" className="cricket-shadow hover:scale-105 smooth-transition bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Play className="mr-2 h-5 w-5" />
                Watch Live
              </Button>
            </Link>
            <Link to="/teams">
              <Button size="lg" className="cricket-shadow hover:scale-105 smooth-transition bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Teams
              </Button>
            </Link>
          </div>

          {/* Live Score Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  Houses
                </h3>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  5 Houses
                </span>
              </div>
              
                <div className="space-y-2">
                <div className="flex justify-center items-center gap-4 text-3xl flex-wrap">
                  <img src={aakash} alt="Aaksh House" className="w-14 h-14 object-contain rounded-full border-2 border-white shadow" />
                  <img src={prudhvi} alt="Prudhvi House" className="w-14 h-14 object-contain rounded-full border-2 border-white shadow" />
                  <img src={vayu} alt="Vayu House" className="w-14 h-14 object-contain rounded-full border-2 border-white shadow" />
                  <img src={jal} alt="Jal House" className="w-14 h-14 object-contain rounded-full border-2 border-white shadow" />
                  <img src={agni} alt="Agni House" className="w-14 h-14 object-contain rounded-full border-2 border-white shadow" />
                </div>
                <div className="flex justify-center items-center text-white/70 mt-2 gap-9 flex-wrap">
                  <span>Aaksh</span>
                  <span>Prudhvi</span>
                  <span>Vayu</span>
                  <span>Jal</span>
                  <span>Agni</span>
                </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  Display
                </h3>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                  SHOWCASE
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-center items-center text-2xl font-bold text-secondary">
                  House Spirit On Display!
                </div>
                <div className="flex justify-center items-center text-white/70">
                  <span>Cheer for your house and show your colors!</span>
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

