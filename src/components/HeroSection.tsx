import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Trophy, Users, Calendar, Award, Clock, DollarSign, 
  MapPin, Star, TrendingUp, Shield, Video, Phone, Mail,
  Facebook, Twitter, Instagram, Play, Pause
} from 'lucide-react';

export function HeroSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const tournamentFeatures = [
    {
      icon: Trophy,
      title: "Grand Prize",
      value: "₹1,00,000",
      description: "Total Prize Money"
    },
    {
      icon: Users,
      title: "Participants",
      value: "100+",
      description: "Registered Players"
    },
    {
      icon: Shield,
      title: "Categories",
      value: "8",
      description: "Tournament Events"
    },
    {
      icon: Star,
      title: "Rating",
      value: "ATP 250",
      description: "Tournament Level"
    }
  ];

  const matchSchedule = [
    { time: "06:00 AM", event: "Morning Session Begins", category: "All Categories" },
    { time: "08:00 AM", event: "Break", category: "Court Maintenance" },
    { time: "04:00 PM", event: "Evening Session Begins", category: "All Categories" },
    { time: "08:00 PM", event: "Day Session Ends", category: "All Categories" }
  ];

  const sponsors = [
    { name: "SRKR Engineering College", tier: "Platinum" },
    { name: "Bhimavaram Municipality", tier: "Gold" },
    { name: "Andhra Tennis Association", tier: "Silver" },
    { name: "Sports Authority of Andhra Pradesh", tier: "Silver" }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % tournamentFeatures.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, tournamentFeatures.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-800/20 rounded-full blur-3xl animate-bounce slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/10 dark:bg-green-700/10 rounded-full blur-2xl"></div>
        
        {/* Tennis Court Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSI1MCUiIHkxPSIwIiB4Mj0iNTAlIiB5Mj0iMTAwJSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        {/* Top Bar - Contact and Social */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 lg:mb-12">
          <div className="flex items-center gap-6 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>info@bhimavaramtennis.com</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Follow us:</span>
            <div className="flex gap-3">
              <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Club Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm mb-8 backdrop-blur-sm border border-green-200 dark:border-green-800">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Est. 1985 • Bhimavaram Tennis Club
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Bhimavaram{' '}
              <span className="text-green-600 dark:text-green-400">Open</span>{' '}
              2025
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              39th Annual Tennis Championship
              <br />
              <span className="text-green-600 dark:text-green-400 font-semibold">
                October 18-26, 2025 • L.H Bhimavaram Town Hall
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/live-scores"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Video className="w-5 h-5" />
                Live Stream
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/schedule"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                View Schedule
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              {tournamentFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                    activeFeature === index 
                      ? 'border-green-500 shadow-lg scale-105' 
                      : 'border-white/20 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <feature.icon className={`w-8 h-8 mx-auto mb-2 ${
                    activeFeature === index 
                      ? 'text-green-600 dark:text-green-400 scale-110' 
                      : 'text-gray-600 dark:text-gray-400'
                  } transition-all duration-300`} />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{feature.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{feature.title}</div>
                </div>
              ))}
            </div>

            {/* Play/Pause Controls */}
            <div className="flex justify-center lg:justify-start mt-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Auto-rotate' : 'Play Auto-rotate'}
              </button>
            </div>
          </div>

          {/* Right Column - Tournament Categories */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Tournament Categories
              </h2>
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>

            {/* Category Cards */}
            <div className="grid gap-4">
              {[
                { 
                  name: "Men's Singles", 
                  description: "Individual Championship", 
                  icon: Award, 
                  color: "green",
                  entries: "45 Players",
                  prize: "₹25,000"
                },
                { 
                  name: "Women's Singles", 
                  description: "Individual Championship", 
                  icon: Trophy, 
                  color: "pink",
                  entries: "32 Players", 
                  prize: "₹20,000"
                },
                { 
                  name: "Men's Doubles", 
                  description: "Team Championship", 
                  icon: Users, 
                  color: "blue",
                  entries: "24 Teams", 
                  prize: "₹30,000"
                },
                { 
                  name: "Mixed Doubles", 
                  description: "Mixed Team Event", 
                  icon: Trophy, 
                  color: "purple",
                  entries: "16 Teams", 
                  prize: "₹25,000"
                }
              ].map((category, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm cursor-pointer"
                  style={{ borderLeftColor: `var(--color-${category.color}-500)` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                          {category.entries}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Prize: {category.prize}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Click for details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Tournament Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Match Schedule */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
              Daily Schedule
            </h3>
            <div className="space-y-3">
              {matchSchedule.map((session, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                    {session.time}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{session.event}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{session.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entry Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              Entry Details
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Entry Fees</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Singles Event</span>
                    <span className="font-medium text-green-600 dark:text-green-400">₹1,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Doubles Event</span>
                    <span className="font-medium text-green-600 dark:text-green-400">₹1,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Junior Events</span>
                    <span className="font-medium text-green-600 dark:text-green-400">₹500</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Registration Deadline</h4>
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium">
                  <Calendar className="w-4 h-4" />
                  October 15, 2025 • 11:59 PM
                </div>
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              Venue Details
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">L.H Bhimavaram Town Hall</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Main Road, Bhimavaram<br />
                  West Godavari District, Andhra Pradesh<br />
                  PIN: 534201
                </p>
              </div>
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Facilities</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 4 Professional Clay Courts</li>
                  <li>• Electronic Scoreboards</li>
                  <li>• Player Lounge & Refreshments</li>
                  <li>• Medical Support Team</li>
                  <li>• Ample Parking Space</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Tournament Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-lg font-semibold mb-1">{sponsor.name}</div>
                <div className="text-sm opacity-80">{sponsor.tier} Sponsor</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Compete?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Watch the most prestigious tennis tournament in Coastal Andhra Pradesh live! 
            Catch all the exciting matches and follow your favorite players in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/live-scores"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Video className="w-5 h-5" />
              Watch Live Stream
            </Link>
            <Link
              to="/rules"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Tournament Rules
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`   
        .animate-bounce.slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}