"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";

const PASSCODE = "8287";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleInput = (digit: string) => {
    if (input.length < 4) {
      setInput((prev) => prev + digit);
      setError(false);
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleSubmit = () => {
    if (input === PASSCODE) {
      router.push("/camera");
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 relative overflow-hidden min-h-screen">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 1 }}
        className="absolute top-4 left-2 md:top-10 md:left-10"
      >
        <div className="polaroid w-24 md:w-48 shadow-2xl rotate-[-6deg]">
          <img src="/images/passcode-1.jpg" alt="Memory" className="w-full h-auto object-cover aspect-[3/4] bg-gray-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 10 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-4 right-2 md:bottom-10 md:right-10"
      >
        <div className="polaroid w-28 md:w-56 shadow-2xl rotate-[8deg]">
          <img src="/images/passcode-2.jpg" alt="Memory" className="w-full h-auto object-cover aspect-[3/4] bg-gray-200" />
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="glass-panel p-6 md:p-12 max-w-sm md:max-w-md w-full flex flex-col items-center z-10"
      >
        <div className="bg-white/20 p-3 md:p-4 rounded-full mb-4 md:mb-6">
          <Lock size={36} className="text-white md:hidden" />
          <Lock size={48} className="text-white hidden md:block" />
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 text-center text-white">Enter Passcode</h1>
        <p className="text-red-100 mb-4 md:mb-8 text-center text-xs md:text-base">Hint: Your usual code (don&apos;t use 0000)</p>

        {/* Passcode Display */}
        <div className="flex space-x-3 md:space-x-4 mb-4 md:mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-11 h-11 md:w-14 md:h-14 rounded-xl border-2 flex items-center justify-center text-xl md:text-2xl font-bold transition-all
                ${error ? 'border-red-400 bg-red-400/20' : 'border-white/50 bg-white/10'}
                ${input.length > i ? 'text-white border-white bg-white/30' : 'text-transparent'}
              `}
            >
              {input.length > i ? '●' : ''}
            </div>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-200 bg-red-900/40 px-4 py-2 rounded-full mb-6"
          >
            <AlertCircle size={16} />
            <span className="text-sm">Incorrect passcode, try again.</span>
          </motion.div>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-4 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num.toString())}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-lg md:text-2xl py-2 md:py-4 rounded-full transition-all active:scale-95 border border-white/5"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm md:text-lg py-2 md:py-4 rounded-full transition-all active:scale-95 border border-white/5 col-start-1"
          >
            DEL
          </button>
          <button
            onClick={() => handleInput("0")}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-lg md:text-2xl py-2 md:py-4 rounded-full transition-all active:scale-95 border border-white/5 col-start-2"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            className="bg-white text-pink-500 hover:bg-pink-50 font-semibold text-sm md:text-lg py-2 md:py-4 rounded-full transition-all active:scale-95 shadow-lg col-start-3"
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
}
