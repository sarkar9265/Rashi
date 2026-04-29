"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Camera as CameraIcon, Music, Heart, Sparkles, Gift } from "lucide-react";

export default function GiftsMenuScreen() {
  const router = useRouter();

  const gifts = [
    { id: "letter", icon: <Mail size={40} />, label: "Love Letter", color: "from-pink-400 to-rose-500", path: "/gifts/letter" },
    { id: "gallery", icon: <CameraIcon size={40} />, label: "Memories", color: "from-sky-300 to-cyan-500", path: "/gifts/gallery" },
    { id: "music", icon: <Music size={40} />, label: "Our Song", color: "from-purple-400 to-violet-500", path: "/gifts/music" },
  ];

  // Floating emojis
  const floatingItems = ["🎁", "💝", "✨", "💖", "🌸", "💕", "🎀", "💗", "🌷", "💘"];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #f48fb1 60%, #f06292 100%)" }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 60%)" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ background: "radial-gradient(circle at 70% 70%, rgba(236,64,122,0.2) 0%, transparent 50%)" }}
      />

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingItems.map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-2xl md:text-4xl"
            style={{
              left: `${(i * 10) + 2}%`,
              bottom: -40,
            }}
            animate={{
              y: [0, -800, -1400],
              x: [0, Math.sin(i * 1.5) * 80, Math.sin(i) * 40],
              rotate: [0, 360],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + i * 1.2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center z-10 mb-12 md:mb-16"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gift className="mx-auto mb-4 text-white drop-shadow-lg" size={40} />
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
          Gifts for you
        </h1>
        <p className="text-white/80 text-base md:text-lg tracking-wide">Tap to unwrap your surprise</p>
      </motion.div>

      {/* Gift Icons */}
      <div className="grid grid-cols-3 gap-4 md:gap-12 z-10 w-full max-w-4xl px-4">
        {gifts.map((gift, index) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, scale: 0.5, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, type: "spring", bounce: 0.5 }}
            className="flex flex-col items-center relative"
          >
            {/* Pulsing glow ring behind icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] rounded-full z-0"
              style={{
                width: "120%",
                paddingBottom: "120%",
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            />

            <motion.button
              onClick={() => router.push(gift.path)}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`relative z-10 w-20 h-20 md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-gradient-to-br ${gift.color} flex items-center justify-center text-white shadow-2xl cursor-pointer border-2 md:border-4 border-white/30`}
            >
              <div className="scale-75 md:scale-100">
                {gift.icon}
              </div>
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
                initial={false}
              >
                <motion.div
                  className="absolute w-full h-full"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.1) 50%, transparent 55%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.8 + 1, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.button>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              className="mt-3 md:mt-6 text-white font-semibold text-sm md:text-xl tracking-wide drop-shadow-md"
            >
              {gift.label}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Decorative floating circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border border-white/20"
            style={{
              width: 60 + i * 30,
              height: 60 + i * 30,
              top: `${15 + i * 10}%`,
              left: `${10 + i * 11}%`,
            }}
            animate={{
              y: [0, -30, 0, 30, 0],
              x: [0, 20, 0, -20, 0],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}

