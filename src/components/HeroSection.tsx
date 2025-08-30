import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import crick from "../assets/logos/Cricket Reward.mp4";

import JalImage from '../assets/logos/1.jpg';
import AakashImage from '../assets/logos/5.jpg';
import AgniImage from '../assets/logos/3.jpg';
import VayuImage from '../assets/logos/2.jpg';
import PrudhviImage from '../assets/logos/4.jpg';
import SrkrLogo from '../assets/logos/srkrlogo.png';
import Teams from '@/pages/Teams';

type ValidHouse = 'aakash' | 'agni' | 'vayu' | 'jal' | 'prudhvi';

interface House {
  name: ValidHouse;
  imageSrc: string;
  displayName: string;
  colorClass: string;
}

const houses: House[] = [
  { 
    name: 'aakash', 
    imageSrc: AakashImage, 
    displayName: 'Aakash', 
    colorClass: 'bg-house-aakash/20 border-house-aakash' 
  },
  { 
    name: 'agni', 
    imageSrc: AgniImage, 
    displayName: 'Agni', 
    colorClass: 'bg-house-agni/20 border-house-agni' 
  },
  { 
    name: 'vayu', 
    imageSrc: VayuImage, 
    displayName: 'Vayu', 
    colorClass: 'bg-house-vayu/20 border-house-vayu' 
  },
  { 
    name: 'jal', 
    imageSrc: JalImage, 
    displayName: 'Jal', 
    colorClass: 'bg-house-jal/20 border-house-jal' 
  },
  { 
    name: 'prudhvi', 
    imageSrc: PrudhviImage, 
    displayName: 'Prudhvi', 
    colorClass: 'bg-house-prudhvi/20 border-house-prudhvi' 
  },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [circleSize, setCircleSize] = useState("w-[300px] h-[300px]");
  const [currentHouseIndex, setCurrentHouseIndex] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleHouseClick = (house: ValidHouse) => {
    navigate(`/house/${house}`);
  };

  // Auto-scroll functionality for mobile horizontal carousel
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      
      autoScrollRef.current = setInterval(() => {
        setCurrentHouseIndex((prevIndex) => {
          const nextIndex = prevIndex === houses.length - 1 ? 0 : prevIndex + 1;
          
          // Scroll to the next house logo
          if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            const scrollAmount = scrollContainer.children[0].clientWidth + 16; // width + margin
            scrollContainer.scrollTo({
              left: nextIndex * scrollAmount,
              behavior: 'smooth'
            });
          }
          
          return nextIndex;
        });
      }, 2500); // Change house every 2.5 seconds
    };

    // Only auto-scroll on mobile screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    if (mediaQuery.matches) {
      startAutoScroll();
      
      // Initialize scroll position to first house
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }, 100);
    }

    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateCircleSize = () => {
      if (window.innerWidth >= 1024) setCircleSize("w-[500px] h-[500px]");
      else if (window.innerWidth >= 768) setCircleSize("w-[400px] h-[400px]");
      else setCircleSize("w-[300px] h-[300px]");
    };
    updateCircleSize();
    window.addEventListener("resize", updateCircleSize);
    return () => window.removeEventListener("resize", updateCircleSize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="mt-4 md:mt-8 lg:mt-12 w-full"
        style={{
          '--move-x': '0px',
          '--move-y': '0px'
        } as React.CSSProperties}
      >
        {/* Background blurred orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 
                          bg-house-aakash/20 rounded-full filter blur-3xl opacity-60 animate-float" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 
                          bg-house-agni/20 rounded-full filter blur-3xl opacity-60 animate-float" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 
                          bg-house-vayu/20 rounded-full filter blur-3xl opacity-60 animate-float" />
        </div>

        {/* Text Section */}
        <div className="relative z-10 px-4 md:px-6 lg:px-8 xl:px-12 text-center lg:text-left">
          <div className="max-w-3xl">
            {/* Logo + Title */}
            <div className="inline-block animate-fade-in">
              <span className="flex items-center gap-2 text-foreground">
                <img src={SrkrLogo} alt="SRKR Logo" className="h-8 w-auto" />
                <span className="text-red-700 dark:text-red-400 font-bold text-md md:text-lg">
                  SRKREC
                </span>
                <span className="text-gray-800 dark:text-gray-200 font-bold text-xs md:text-sm lg:text-md">
                  <span className="hidden md:inline">CSD & CSIT Department</span>
                  <span className="md:hidden">CSD & CSIT Dept</span>
                </span>
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight 
                         text-gray-900 dark:text-gray-100 animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              College <span className="text-house-aakash">Cricket</span>{" "}
              <span className="text-house-aakash">Championship</span>
            </h1>

            {/* Buttons */}
            <div
              className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                to="/players"
                className="inline-flex items-center justify-center rounded-md 
                           bg-primary px-5 py-2 text-sm font-medium text-primary-foreground 
                           shadow transition-colors hover:bg-primary/90"
              >
                Explore Players
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                to="/teams"
                className="inline-flex items-center justify-center rounded-md 
                           bg-secondary px-5 py-2 text-sm font-medium text-secondary-foreground 
                           shadow-sm transition-colors hover:bg-secondary/80"
              >
                View Teams
              </Link>
            </div>

            {/* Houses Section - Grid on desktop, hidden on mobile */}
            <div className="mt-8 hidden md:block">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
                Tournament Houses
              </h2>
              
              {/* Desktop View - Grid Layout */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {houses.map((house, index) => (
                    <div
                    key={house.name}
                    className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${house.colorClass}`}
                    onClick={() => navigate('/teams')}
                    style={{ animationDelay: `${index * 100}ms` }}
                    >
                    <div className="flex flex-col items-center">
                      <div className="mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-white shadow-md">
                      <img
                        src={house.imageSrc}
                        alt={house.displayName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {house.displayName}
                      </h3>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-8 lg:py-10 lg:w-1/2 flex items-center justify-center">
        <div className={`relative ${circleSize} flex items-center justify-center`}>
          <div className="video-wrapper">
            <video
              src={crick}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        <style>
          {`
            .video-wrapper {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              overflow: hidden;
              background: transparent;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .video-wrapper video {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            /* Force white parts to blend in dark mode */
            .dark .video-wrapper {
              background: radial-gradient(circle, rgba(0,0,0,0.9) 80%, transparent 100%);
            }
          `}
        </style>
      </section>

      {/* Mobile Houses Carousel - Only visible on mobile */}
      <div className="block md:hidden w-full px-4 pb-6">
        <h2 className="text-xl font-bold text-center mb-3 text-gray-900 dark:text-gray-100">
          Tournament Houses
        </h2>
        
        {/* Horizontal auto-scrolling carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {houses.map((house, index) => (
            <div
              key={house.name}
              className="flex-shrink-0 w-4/5 mx-2 first:ml-4 last:mr-4"
            >
              <div 
                className={`cursor-pointer overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${house.colorClass}`}
                onClick={() => navigate('/teams')}

              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-white shadow-md">
                    <img
                      src={house.imageSrc}
                      alt={house.displayName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {house.displayName}
                  </h3>
                  <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
                    House of {house.displayName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {houses.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentHouseIndex 
                  ? 'bg-house-aakash scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center mt-3 text-xs text-gray-600 dark:text-gray-400">
          <p>Tap on a house to explore its players and team</p>
        </div>
      </div>
    </div>
  );
}