import { useCollection } from "@/hooks/useFirebase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Trophy, Play, Pause } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const LiveScores = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl p-4" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/x6OaIcF3hbQ?si=6kO5rjs1WJC6S_6e"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default LiveScores;