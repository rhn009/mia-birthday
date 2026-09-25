import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Award, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCakeProps {
  onWishMade?: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onWishMade }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const blowOutCandles = () => {
    if (!candlesLit) return;
    
    setCandlesLit(false);
    setWishMade(true);

    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF5D8F', '#FFACC7', '#FFD700', '#A9DEF9']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF5D8F', '#FFACC7', '#FFD700', '#D0F4DE']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    if (onWishMade) onWishMade();
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto py-10 px-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs font-semibold rounded-full border border-pink-500/40 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
          <Sparkles size={14} className="text-pink-400" /> Make a Birthday Wish!
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 font-cute">
          Mia's Birthday Cake 🎂
        </h2>
        <p className="text-slate-400 text-sm mt-1 font-cute">
          {candlesLit ? "Blow out the candles to unlock your special birthday wish!" : "Your wish has been granted and sent to the stars! ✨"}
        </p>
      </div>

      {/* SVG Birthday Cake */}
      <div className="relative my-4 cursor-pointer" onClick={blowOutCandles}>
        {/* Smoke Effect when blown */}
        <AnimatePresence>
          {!candlesLit && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: -50 }}
              transition={{ duration: 2 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-slate-400 text-xs font-bold flex gap-4"
            >
              <span>💨</span> <span>✨ Wish Made! ✨</span> <span>💨</span>
            </motion.div>
          )}
        </AnimatePresence>

        <svg width="260" height="240" viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cakeLayer1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF80A0" />
              <stop offset="100%" stopColor="#FF4D79" />
            </linearGradient>
            <linearGradient id="cakeLayer2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB3C6" />
              <stop offset="100%" stopColor="#FF80A0" />
            </linearGradient>
            <linearGradient id="cakeLayer3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE5EC" />
              <stop offset="100%" stopColor="#FFC2D1" />
            </linearGradient>
            <filter id="candleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Stand */}
          <ellipse cx="150" cy="250" rx="120" ry="18" fill="#334155" />
          <ellipse cx="150" cy="246" rx="115" ry="14" fill="#64748B" />

          {/* Bottom Cake Tier */}
          <path d="M 40 190 L 40 230 C 40 245 260 245 260 230 L 260 190 Z" fill="url(#cakeLayer1)" />
          <ellipse cx="150" cy="190" rx="110" ry="20" fill="#FFA6C1" />

          {/* Frosting drips */}
          <path d="M 40 190 Q 60 215 80 190 Q 100 215 120 190 Q 140 215 160 190 Q 180 215 200 190 Q 220 215 240 190 Q 250 205 260 190" fill="#FFFFFF" opacity="0.9" />

          {/* Middle Cake Tier */}
          <path d="M 65 130 L 65 180 C 65 195 235 195 235 180 L 235 130 Z" fill="url(#cakeLayer2)" />
          <ellipse cx="150" cy="130" rx="85" ry="16" fill="#FFC2D1" />

          {/* Top Cake Tier */}
          <path d="M 90 75 L 90 120 C 90 132 210 132 210 120 L 210 75 Z" fill="url(#cakeLayer3)" />
          <ellipse cx="150" cy="75" rx="60" ry="12" fill="#FFFFFF" />

          {/* Strawberries & Decorations */}
          <circle cx="100" cy="73" r="7" fill="#EF4444" />
          <circle cx="130" cy="71" r="7" fill="#EF4444" />
          <circle cx="150" cy="70" r="7.5" fill="#EF4444" />
          <circle cx="170" cy="71" r="7" fill="#EF4444" />
          <circle cx="200" cy="73" r="7" fill="#EF4444" />

          {/* Candles */}
          {[115, 150, 185].map((cx, idx) => (
            <g key={idx}>
              {/* Candle Stick */}
              <rect x={cx - 4} y="40" width="8" height="32" rx="2" fill={idx === 1 ? "#FFD700" : "#A855F7"} />
              <line x1={cx} y1="40" x2={cx} y2="34" stroke="#475569" strokeWidth="2" />

              {/* Flame */}
              {candlesLit && (
                <motion.g
                  animate={{ scale: [1, 1.15, 0.95, 1], rotate: [-2, 2, -1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d={`M ${cx} 16 C ${cx - 7} 26 ${cx - 4} 34 ${cx} 34 C ${cx + 4} 34 ${cx + 7} 26 ${cx} 16 Z`}
                    fill="#FF9900"
                    filter="url(#candleGlow)"
                  />
                  <path
                    d={`M ${cx} 22 C ${cx - 4} 28 ${cx - 2} 34 ${cx} 34 C ${cx + 2} 34 ${cx + 4} 28 ${cx} 22 Z`}
                    fill="#FFEE00"
                  />
                </motion.g>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {candlesLit ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={blowOutCandles}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/30 flex items-center gap-2 hover:brightness-110 transition-all text-base"
          >
            <Flame className="text-amber-200 animate-pulse" size={20} />
            Blow Out Candles! 🎂
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={relightCandles}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-pink-300 font-semibold rounded-xl border border-slate-700 text-sm flex items-center gap-2 transition-all"
          >
            <Sparkles size={16} /> Relight Candles 🕯️
          </motion.button>
        )}
      </div>

      {/* Secret Birthday Wish Card Modal / Reveal */}
      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/80 border border-pink-500/40 rounded-2xl shadow-2xl text-center max-w-lg"
          >
            <div className="inline-flex p-3 rounded-full bg-pink-500/20 text-pink-300 mb-3 border border-pink-500/30">
              <Award size={28} className="text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-pink-200 font-cute">
              "To My Dearest Mia 🕊️"
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed font-cute">
              May this birthday bring you endless smiles, warmth, good health, and boundless joy!
              You are the heart of our home, the light of my life, and the best mom to our kittens <strong className="text-emerald-300">Shadow 🐾🖤</strong> & <strong className="text-pink-300">Matto 🐾🤍</strong>.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-pink-400 font-handwriting text-lg flex items-center justify-center gap-2">
              <Heart size={16} fill="#FF5D8F" className="text-pink-500" /> Forever Yours, Ruhaan & The Kittens
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
