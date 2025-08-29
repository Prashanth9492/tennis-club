import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import cricks from "../assets/logos/Cricket.mp4";
import crick from "../assets/logos/Cricket Reward.mp4";

import JalImage from '../assets/logos/1.jpg';
import AakashImage from '../assets/logos/5.jpg';
import AgniImage from '../assets/logos/3.jpg';
import VayuImage from '../assets/logos/2.jpg';
import PrudhviImage from '../assets/logos/4.jpg';
import SrkrLogo from '../assets/logos/srkrlogo.png';

type ValidHouse = 'aakash' | 'agni' | 'vayu' | 'jal' | 'prudhvi';

interface House {
  name: ValidHouse;
  imageSrc: string;
}

const houses: House[] = [
  { name: 'aakash', imageSrc: AakashImage },
  { name: 'agni', imageSrc: AgniImage },
  { name: 'vayu', imageSrc: VayuImage },
  { name: 'jal', imageSrc: JalImage },
  { name: 'prudhvi', imageSrc: PrudhviImage },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [circleSize, setCircleSize] = useState("w-[300px] h-[300px]");

  const handleHouseClick = (house: ValidHouse) => {
    navigate(`/house/${house}`);
  };

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
    <div className="flex flex-col lg:flex-row">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="mt-8 md:mt-16 lg:mt-24"
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
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            {/* Logo + Title */}
            <div className="inline-block animate-fade-in">
              <span className="flex items-center gap-2 text-foreground">
                <img src={SrkrLogo} alt="SRKR Logo" className="h-10 w-auto" />
                <span className="text-red-700 dark:text-red-400 font-bold text-lg md:text-xl">
                  SRKREC
                </span>
                <span className="text-gray-800 dark:text-gray-200 font-bold text-sm md:text-base lg:text-lg">
                  <span className="hidden md:inline">CSD & CSIT Department</span>
                  <span className="md:hidden">CSD & CSIT Dept</span>
                </span>
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight 
                         text-gray-900 dark:text-gray-100 animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              College <span className="text-house-aakash">Cricket</span>{" "}
              <span className="text-house-aakash">Championship</span>
            </h1>

            {/* Buttons */}
            <div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                to="/players"
                className="inline-flex items-center justify-center rounded-md 
                           bg-primary px-6 py-3 text-sm font-medium text-primary-foreground 
                           shadow transition-colors hover:bg-primary/90"
              >
                Explore Players
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                to="/teams"
                className="inline-flex items-center justify-center rounded-md 
                           bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground 
                           shadow-sm transition-colors hover:bg-secondary/80"
              >
                View Teams
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* Video Section */}
<section className="py-12 lg:py-16 lg:w-1/2 flex items-center justify-center">
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


    </div>
  );
}
