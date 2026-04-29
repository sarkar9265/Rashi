"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronRight, Heart } from "lucide-react";

export default function CameraScreen() {
  const [photoTaken, setPhotoTaken] = useState(false);
  const router = useRouter();

  const handleTakePicture = () => {
    setPhotoTaken(true);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-pink-200">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%)' }}></div>
      
      {/* Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-white/10"
      >
        <Heart size={60} className="md:hidden" fill="currentColor" />
        <Heart size={120} className="hidden md:block" fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 text-white/10"
      >
        <Heart size={80} className="md:hidden" fill="currentColor" />
        <Heart size={160} className="hidden md:block" fill="currentColor" />
      </motion.div>

      <div className="z-10 flex flex-col items-center w-full max-w-md">
        
        <AnimatePresence mode="wait">
          {!photoTaken ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center drop-shadow-md">
                Get ready to take a picture!
              </h1>
              
              {/* Instax Camera UI */}
              <div className="relative bg-[#7dd3fc] rounded-3xl p-4 md:p-6 shadow-2xl w-52 h-60 md:w-64 md:h-72 border-4 border-[#38bdf8] flex flex-col items-center justify-start">
                <div className="w-full flex justify-between px-2 mb-4">
                  <div className="w-8 h-8 bg-black rounded-full shadow-inner border-2 border-gray-700"></div>
                  <div className="w-10 h-6 bg-yellow-200 rounded-sm shadow-inner opacity-80"></div>
                </div>
                
                <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-900 rounded-full border-8 border-gray-800 flex items-center justify-center shadow-inner relative overflow-hidden">
                  {/* Lens reflections */}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-white/10 rounded-full"></div>
                  <div className="w-16 h-16 bg-black rounded-full border-2 border-gray-700"></div>
                </div>

                <button 
                  onClick={handleTakePicture}
                  className="mt-6 md:mt-8 bg-white text-gray-900 font-bold py-2.5 md:py-3 px-5 md:px-6 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all w-full flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Camera size={20} />
                  Take Picture
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Flash effect */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed inset-0 bg-white z-50 pointer-events-none"
              />

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center drop-shadow-md z-10">
                Who is this beautiful?
              </h2>

              <motion.div 
                initial={{ rotate: -5, scale: 0.8 }}
                animate={{ rotate: 3, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="polaroid w-60 md:w-80 shadow-2xl rotate-3 z-10"
              >
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden flex items-center justify-center text-gray-500">
                   <img 
                    src="/images/beautiful.jpg" 
                    alt="Beautiful person" 
                    className="w-full h-full object-cover"
                  />
                  {!photoTaken && <span className="absolute">Loading...</span>}
                </div>
                <div className="mt-4 text-center font-handwriting text-xl text-gray-800">
                  ❤️
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={() => router.push("/gifts")}
                className="mt-12 btn-primary flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
