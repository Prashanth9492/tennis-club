import React, { useEffect, useState } from 'react';

interface TennisLoadingAnimationProps {
  isLoading: boolean;
}

export const TennisLoadingAnimation: React.FC<TennisLoadingAnimationProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [ballPosition, setBallPosition] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const ballInterval = setInterval(() => {
      setBallPosition((prev) => (prev + 1) % 100);
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(ballInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-yellow-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-200/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-pink-200/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative flex flex-col items-center space-y-8 p-8">
        {/* Enhanced Tennis Court with Moving Ball */}
        <div className="relative w-80 h-20">
          {/* Tennis Court with Net */}
          <div className="w-full h-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 rounded-lg shadow-2xl relative overflow-hidden">
            {/* Court lines */}
            <div className="absolute top-1 left-4 right-4 h-0.5 bg-white/60"></div>
            <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-white/60"></div>
            <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-white/40"></div>
            <div className="absolute top-0 bottom-0 right-1/4 w-0.5 bg-white/40"></div>
            
            {/* Net in center */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/80 transform -translate-x-1/2">
              <div className="absolute top-1 bottom-1 left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
            </div>
            
            {/* Court surface texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent"></div>
          </div>
          
          {/* Moving Tennis Ball */}
          <div 
            className="absolute -top-4 transition-all duration-75 ease-linear"
            style={{ left: `${ballPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-radial from-yellow-200 via-yellow-300 to-yellow-500 rounded-full border-2 border-yellow-400 shadow-xl animate-spin-ball">
                {/* Tennis ball curves */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/90 rounded transform -translate-y-1/2 rotate-45"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/90 rounded transform -translate-y-1/2 -rotate-45"></div>
                {/* Ball highlight */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-100/80 rounded-full blur-sm"></div>
              </div>
              {/* Ball shadow */}
              <div className="absolute -bottom-1 left-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Animated Tennis Rackets */}
        <div className="relative flex space-x-8">
          <div className="animate-swing-left">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-600 dark:text-green-400 drop-shadow-lg">
              {/* Racket Handle with Grip */}
              <rect x="35" y="50" width="10" height="28" fill="currentColor" rx="5"/>
              <rect x="37" y="52" width="6" height="24" fill="#8B4513" rx="3"/>
              <g stroke="#654321" strokeWidth="0.5">
                <line x1="37" y1="55" x2="43" y2="55"/>
                <line x1="37" y1="58" x2="43" y2="58"/>
                <line x1="37" y1="61" x2="43" y2="61"/>
                <line x1="37" y1="64" x2="43" y2="64"/>
                <line x1="37" y1="67" x2="43" y2="67"/>
                <line x1="37" y1="70" x2="43" y2="70"/>
                <line x1="37" y1="73" x2="43" y2="73"/>
              </g>
              
              {/* Racket Head Frame */}
              <ellipse cx="40" cy="30" rx="22" ry="25" fill="none" stroke="currentColor" strokeWidth="4"/>
              <ellipse cx="40" cy="30" rx="19" ry="22" fill="none" stroke="#2d5016" strokeWidth="1"/>
              
              {/* Strings with vibration effect */}
              <g stroke="currentColor" strokeWidth="0.8" opacity="0.8" className="animate-pulse">
                <line x1="22" y1="15" x2="22" y2="45"/>
                <line x1="27" y1="8" x2="27" y2="52"/>
                <line x1="32" y1="6" x2="32" y2="54"/>
                <line x1="37" y1="5" x2="37" y2="55"/>
                <line x1="42" y1="5" x2="42" y2="55"/>
                <line x1="47" y1="6" x2="47" y2="54"/>
                <line x1="52" y1="8" x2="52" y2="52"/>
                <line x1="57" y1="15" x2="57" y2="45"/>
                
                <line x1="22" y1="15" x2="57" y2="15"/>
                <line x1="19" y1="20" x2="60" y2="20"/>
                <line x1="18" y1="25" x2="61" y2="25"/>
                <line x1="18" y1="30" x2="61" y2="30"/>
                <line x1="18" y1="35" x2="61" y2="35"/>
                <line x1="19" y1="40" x2="60" y2="40"/>
                <line x1="22" y1="45" x2="57" y2="45"/>
              </g>
            </svg>
          </div>
          
          <div className="animate-swing-right">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-blue-600 dark:text-blue-400 drop-shadow-lg">
              {/* Racket Handle with Grip */}
              <rect x="35" y="50" width="10" height="28" fill="currentColor" rx="5"/>
              <rect x="37" y="52" width="6" height="24" fill="#8B4513" rx="3"/>
              <g stroke="#654321" strokeWidth="0.5">
                <line x1="37" y1="55" x2="43" y2="55"/>
                <line x1="37" y1="58" x2="43" y2="58"/>
                <line x1="37" y1="61" x2="43" y2="61"/>
                <line x1="37" y1="64" x2="43" y2="64"/>
                <line x1="37" y1="67" x2="43" y2="67"/>
                <line x1="37" y1="70" x2="43" y2="70"/>
                <line x1="37" y1="73" x2="43" y2="73"/>
              </g>
              
              {/* Racket Head Frame */}
              <ellipse cx="40" cy="30" rx="22" ry="25" fill="none" stroke="currentColor" strokeWidth="4"/>
              <ellipse cx="40" cy="30" rx="19" ry="22" fill="none" stroke="#1e3a8a" strokeWidth="1"/>
              
              {/* Strings */}
              <g stroke="currentColor" strokeWidth="0.8" opacity="0.8" className="animate-pulse">
                <line x1="22" y1="15" x2="22" y2="45"/>
                <line x1="27" y1="8" x2="27" y2="52"/>
                <line x1="32" y1="6" x2="32" y2="54"/>
                <line x1="37" y1="5" x2="37" y2="55"/>
                <line x1="42" y1="5" x2="42" y2="55"/>
                <line x1="47" y1="6" x2="47" y2="54"/>
                <line x1="52" y1="8" x2="52" y2="52"/>
                <line x1="57" y1="15" x2="57" y2="45"/>
                
                <line x1="22" y1="15" x2="57" y2="15"/>
                <line x1="19" y1="20" x2="60" y2="20"/>
                <line x1="18" y1="25" x2="61" y2="25"/>
                <line x1="18" y1="30" x2="61" y2="30"/>
                <line x1="18" y1="35" x2="61" y2="35"/>
                <line x1="19" y1="40" x2="60" y2="40"/>
                <line x1="22" y1="45" x2="57" y2="45"/>
              </g>
            </svg>
          </div>
        </div>

        {/* Enhanced Loading Text */}
        <div className="text-center space-y-4">
          <div className="relative">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x">
              Bhimavaram Tennis Club
            </h3>
            <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 animate-expand transform -translate-x-1/2"></div>
          </div>
          
          {/* Animated Loading Message */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce-dots" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dots" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce-dots" style={{animationDelay: '300ms'}}></div>
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium animate-fade-in-out">
              Loading your experience
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dots" style={{animationDelay: '450ms'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce-dots" style={{animationDelay: '600ms'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dots" style={{animationDelay: '750ms'}}></div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative w-80">
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-green-600 rounded-full transition-all duration-100 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {progress}% Complete
            </span>
          </div>
        </div>

        {/* Floating Trophy with Sparkles */}
        <div className="relative animate-trophy-float">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-yellow-500 drop-shadow-lg">
            {/* Trophy base */}
            <rect x="20" y="45" width="20" height="6" fill="currentColor" rx="3"/>
            <rect x="15" y="51" width="30" height="4" fill="currentColor" rx="2"/>
            
            {/* Trophy cup */}
            <path d="M15 25 L15 35 Q15 40 20 40 L40 40 Q45 40 45 35 L45 25 Z" fill="currentColor"/>
            <rect x="17" y="20" width="26" height="20" fill="currentColor" rx="2"/>
            
            {/* Trophy handles */}
            <path d="M12 28 Q8 28 8 32 Q8 36 12 36" fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d="M48 28 Q52 28 52 32 Q52 36 48 36" fill="none" stroke="currentColor" strokeWidth="3"/>
            
            {/* Star on trophy */}
            <path d="M30 10 L32 16 L38 16 L33 20 L35 26 L30 22 L25 26 L27 20 L22 16 L28 16 Z" fill="#FFD700"/>
          </svg>
          
          {/* Sparkles around trophy */}
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-sparkle-1"></div>
          <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-sparkle-2"></div>
          <div className="absolute -bottom-2 -right-1 w-2 h-2 bg-green-400 rounded-full animate-sparkle-3"></div>
          <div className="absolute -bottom-1 -left-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-sparkle-4"></div>
          <div className="absolute top-2 -right-4 w-1 h-1 bg-purple-400 rounded-full animate-sparkle-5"></div>
          <div className="absolute top-4 -left-4 w-1 h-1 bg-orange-400 rounded-full animate-sparkle-6"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes expand {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes bounce-dots {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes spin-ball {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes swing-left {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        
        @keyframes swing-right {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-10deg); }
        }
        
        @keyframes trophy-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        
        @keyframes sparkle-1 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes sparkle-2 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          60% { opacity: 1; transform: scale(1.2) rotate(270deg); }
        }
        
        @keyframes sparkle-3 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          40% { opacity: 1; transform: scale(1) rotate(90deg); }
        }
        
        @keyframes sparkle-4 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          70% { opacity: 1; transform: scale(1.1) rotate(45deg); }
        }
        
        @keyframes sparkle-5 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          30% { opacity: 1; transform: scale(0.8) rotate(135deg); }
        }
        
        @keyframes sparkle-6 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          80% { opacity: 1; transform: scale(1.3) rotate(225deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-25px) translateX(8px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-expand {
          animation: expand 2s ease-out;
        }
        
        .animate-bounce-dots {
          animation: bounce-dots 1s ease-in-out infinite;
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out infinite;
        }
        
        .animate-spin-ball {
          animation: spin-ball 1.5s linear infinite;
        }
        
        .animate-swing-left {
          animation: swing-left 2s ease-in-out infinite;
        }
        
        .animate-swing-right {
          animation: swing-right 2s ease-in-out infinite 0.5s;
        }
        
        .animate-trophy-float {
          animation: trophy-float 3s ease-in-out infinite;
        }
        
        .animate-sparkle-1 {
          animation: sparkle-1 2s ease-in-out infinite;
        }
        
        .animate-sparkle-2 {
          animation: sparkle-2 2.2s ease-in-out infinite 0.2s;
        }
        
        .animate-sparkle-3 {
          animation: sparkle-3 1.8s ease-in-out infinite 0.4s;
        }
        
        .animate-sparkle-4 {
          animation: sparkle-4 2.1s ease-in-out infinite 0.6s;
        }
        
        .animate-sparkle-5 {
          animation: sparkle-5 1.9s ease-in-out infinite 0.8s;
        }
        
        .animate-sparkle-6 {
          animation: sparkle-6 2.3s ease-in-out infinite 1s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at 30% 30%, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default TennisLoadingAnimation;