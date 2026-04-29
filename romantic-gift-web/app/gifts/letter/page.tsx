"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Heart } from "lucide-react";

export default function LoveLetterScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-pink-200 min-h-screen">
      <button
        onClick={() => router.push("/gifts")}
        className="absolute top-6 left-6 text-white hover:bg-white/20 p-2 rounded-full transition-all z-30"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
              scale: [0.5, Math.random() + 0.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <Heart size={Math.random() * 40 + 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        {!isOpen ? (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* Envelope Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-2xl blur-2xl z-0"
              style={{ background: "radial-gradient(circle, rgba(255,200,150,0.4) 0%, transparent 70%)" }}
            />

            {/* Envelope Body */}
            <motion.div
              whileHover={{ scale: 1.06, rotateZ: -1 }}
              whileTap={{ scale: 0.97 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.2 } }}
              className="relative w-80 h-60 md:w-[420px] md:h-72 rounded-xl overflow-hidden shadow-2xl group z-10"
              style={{ perspective: "800px" }}
            >
              {/* Envelope back */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(145deg, #b91c1c 0%, #991b1b 30%, #7f1d1d 100%)",
                  boxShadow: "inset 0 2px 20px rgba(0,0,0,0.3)",
                }}
              />

              {/* Gold border trim */}
              <div className="absolute inset-[3px] rounded-xl border-2 border-yellow-500/30 pointer-events-none z-30" />

              {/* Decorative lace pattern along bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 z-20 flex justify-center overflow-hidden opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-yellow-200/60 -mb-3" />
                ))}
              </div>

              {/* Letter peeking out */}
              <motion.div
                className="absolute left-[10%] right-[10%] top-3 bottom-[40%] bg-[#fef9ef] rounded-t-md shadow-md z-0"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                {/* Faux text lines */}
                <div className="pt-8 px-6 space-y-3">
                  <div className="h-2 bg-red-200/40 rounded w-1/2 mx-auto" />
                  <div className="h-1.5 bg-gray-300/30 rounded w-3/4 mx-auto" />
                  <div className="h-1.5 bg-gray-300/30 rounded w-2/3 mx-auto" />
                  <div className="h-1.5 bg-gray-300/30 rounded w-3/4 mx-auto" />
                </div>
              </motion.div>

              {/* Envelope flap (triangle) */}
              <div
                className="absolute top-0 left-0 right-0 z-20 transition-transform duration-700 origin-top group-hover:[transform:rotateX(25deg)]"
                style={{
                  height: "55%",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #991b1b 0%, #b91c1c 60%, #dc2626 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              />

              {/* Envelope front bottom fold */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10"
                style={{
                  height: "55%",
                  clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
                  background: "linear-gradient(0deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)",
                }}
              />

              {/* Side folds */}
              <div
                className="absolute top-0 left-0 bottom-0 z-10 opacity-60"
                style={{
                  width: "50%",
                  clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                  background: "linear-gradient(90deg, #7f1d1d, #991b1b)",
                }}
              />
              <div
                className="absolute top-0 right-0 bottom-0 z-10 opacity-60"
                style={{
                  width: "50%",
                  clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
                  background: "linear-gradient(-90deg, #7f1d1d, #991b1b)",
                }}
              />

              {/* Wax Seal */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="w-20 h-20 rounded-full relative flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                >
                  {/* Seal scalloped edge */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        background: "radial-gradient(circle at 35% 35%, #ef4444, #991b1b)",
                        transform: `rotate(${i * 30}deg) translateY(-38px)`,
                      }}
                    />
                  ))}
                  {/* Heart on the seal */}
                  <span className="text-2xl drop-shadow-md z-10">❤️</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Ribbon decorations on sides */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-1/3 w-8 h-20 z-20 hidden md:block"
            >
              <div className="w-3 h-full bg-yellow-400/70 rounded-full mx-auto shadow-md" />
              <div className="w-6 h-6 bg-yellow-400/70 rounded-full -mt-1 mx-auto shadow-sm" />
            </motion.div>
            <motion.div
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 top-1/3 w-8 h-20 z-20 hidden md:block"
            >
              <div className="w-3 h-full bg-yellow-400/70 rounded-full mx-auto shadow-md" />
              <div className="w-6 h-6 bg-yellow-400/70 rounded-full -mt-1 mx-auto shadow-sm" />
            </motion.div>

            {/* Title */}
            <motion.h2
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white text-center mt-10 text-3xl md:text-4xl font-bold drop-shadow-lg font-serif tracking-wide"
            >
              ✉️ A Love Letter
            </motion.h2>
            <p className="text-red-200/80 text-center mt-2 text-sm tracking-widest uppercase animate-pulse">Tap to open</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 90 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
            className="bg-[#fdfbf7] w-full p-8 md:p-12 rounded-lg shadow-2xl relative border-8 border-double border-red-200"
            style={{
              backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {/* Stamp / Decor */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-4 right-4 text-red-500 opacity-60 rotate-12 border-2 border-red-500 p-1.5 rounded-sm font-bold tracking-widest uppercase text-sm shadow-sm"
            >
              Sent with Love
            </motion.div>

            <h1 className="text-4xl md:text-6xl text-red-600 mb-8 text-center border-b-2 border-red-100 pb-6 drop-shadow-sm" style={{ fontFamily: "var(--font-cursive)" }}>
              Tamatarrrrr,
            </h1>

            <div className="space-y-6 text-gray-800 text-lg md:text-2xl leading-relaxed px-2 md:px-6" style={{ fontFamily: "var(--font-cursive)" }}>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                My love, words fall short when trying to explain what you mean to me. You are my greatest joy, my brightest light, and the most beautiful part of my life.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Every moment spent with you feels like a beautiful dream. Your smile, your kindness, and your unconditional love have transformed my world.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                I promise to always hold your hand, to support your dreams, and to love you more with each passing day. Here is to our past, our present, and our beautiful future together.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-16 flex items-end justify-between px-2 md:px-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 0.85, scale: 1, rotate: -6 }}
                transition={{ delay: 2.8, duration: 0.8, type: "spring" }}
                className="flex-shrink-0"
              >
                <img 
                  src="/images/stamp.png" 
                  alt="Stamp" 
                  className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-lg"
                />
              </motion.div>
              <div className="text-right">
                <p className="text-red-500 text-3xl italic mb-2" style={{ fontFamily: "var(--font-cursive)" }}>Forever yours,</p>
                <p className="text-gray-900 font-bold text-2xl" style={{ fontFamily: "var(--font-cursive)" }}>Sarkar</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
