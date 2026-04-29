"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function GalleryScreen() {
  const router = useRouter();

  const photos = [
    { id: 1, src: "/images/polaroid-2.jpg", caption: "Our first date ❤️", rotate: -4 },
    { id: 2, src: "/images/polaroid-1.jpg", caption: "Best Moment!", rotate: 3 },
    { id: 3, src: "/images/camera-bg.jpg", caption: "Forever together", rotate: -2 },
  ];

  return (
    <div className="flex-1 flex flex-col items-center p-4 md:p-12 relative min-h-screen bg-pink-200">
      <button
        onClick={() => router.push("/gifts")}
        className="absolute top-6 left-6 text-white hover:bg-white/20 p-2 rounded-full transition-all z-20"
      >
        <ChevronLeft size={32} />
      </button>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-16 text-center mt-8 drop-shadow-lg"
      >
        Our Memories
      </motion.h1>

      <div className="flex flex-col items-center gap-10 md:gap-24 w-full max-w-4xl pb-12 md:pb-24">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="polaroid w-full max-w-md shadow-2xl"
          >
            <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden group">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-6 flex flex-col items-center">
              <p className="text-gray-800 font-handwriting text-2xl md:text-3xl font-bold text-center">
                {photo.caption}
              </p>
              <div className="flex gap-1 mt-2 text-blue-500">
                <span>★</span><span>★</span><span>★</span>
              </div>
            </div>

            {/* Tape effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-2 z-10 border border-white/50"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
