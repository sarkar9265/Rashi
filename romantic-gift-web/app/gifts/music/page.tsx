"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Play, Pause, SkipForward, SkipBack, Heart } from "lucide-react";

export default function MusicScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 relative min-h-screen bg-pink-200">
      <button
        onClick={() => router.push("/gifts")}
        className="absolute top-6 left-6 text-white hover:bg-white/20 p-2 rounded-full transition-all z-20"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/music/dummy-audio.mp3" loop />

      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 drop-shadow-lg text-center">
          Our Special Song
        </h1>

        {/* Vinyl Record */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative w-48 h-48 md:w-80 md:h-80 rounded-full bg-gray-900 border-8 border-gray-800 shadow-2xl flex items-center justify-center mb-8 md:mb-12"
        >
          {/* Grooves */}
          <div className="absolute inset-4 rounded-full border border-gray-700/50"></div>
          <div className="absolute inset-8 rounded-full border border-gray-700/50"></div>
          <div className="absolute inset-12 rounded-full border border-gray-700/50"></div>
          <div className="absolute inset-16 rounded-full border border-gray-700/50"></div>

          {/* Center Label */}
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-red-500 border-4 border-white flex items-center justify-center overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 bg-black/10"></div>
            <Heart fill="white" className="text-white w-8 h-8 z-10" />
            <div className="w-4 h-4 rounded-full bg-black absolute z-20"></div>
          </div>
        </motion.div>

        {/* Player UI */}
        <div className="glass-panel w-full p-4 md:p-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-white mb-1"> Kasturi </h2>
              <p className="text-red-200 text-sm md:text-base">Arijit Singh ft. Pritam </p>
            </div>
            <Heart className="text-red-300" fill="currentColor" />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 md:gap-8">
            <button className="text-white hover:text-red-200 transition-colors">
              <SkipBack size={32} />
            </button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>
            <button className="text-white hover:text-red-200 transition-colors">
              <SkipForward size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
