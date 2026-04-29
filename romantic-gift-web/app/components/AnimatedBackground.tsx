"use client";

import { motion } from "framer-motion";

const hearts = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 6 + 8,
  size: Math.random() * 20 + 10,
  opacity: Math.random() * 0.15 + 0.05,
}));

const sparkles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 6,
  duration: Math.random() * 3 + 2,
  size: Math.random() * 4 + 2,
}));

const blobs = [
  { x: "20%", y: "30%", size: 300, color: "rgba(244,143,177,0.2)", duration: 18 },
  { x: "70%", y: "60%", size: 400, color: "rgba(236,64,122,0.12)", duration: 22 },
  { x: "50%", y: "80%", size: 250, color: "rgba(248,187,208,0.18)", duration: 15 },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            background: blob.color,
          }}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -60, 40, -80, 0],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating hearts rising upward */}
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: -30,
            opacity: heart.opacity,
            fontSize: heart.size,
          }}
          animate={{
            y: [0, -1200],
            x: [0, Math.sin(heart.id) * 60],
            rotate: [0, Math.sin(heart.id) * 30],
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ❤
        </motion.div>
      ))}

      {/* Twinkling sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
