import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Fish, Milk, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KittenPlaygroundProps {
  onUnlockReward?: () => void;
}

export const KittenPlayground: React.FC<KittenPlaygroundProps> = ({ onUnlockReward }) => {
  const [loveMeter, setLoveMeter] = useState<number>(40);
  const [shadowHunger, setShadowHunger] = useState<number>(70);
  const [mattoHunger, setMattoHunger] = useState<number>(65);
  const [unlockedCertificate, setUnlockedCertificate] = useState(false);
  const [recentAction, setRecentAction] = useState<string | null>("Tap treats to feed Shadow & Matto!");

  const feedShadow = () => {
    setShadowHunger((prev) => Math.min(100, prev + 15));
    setLoveMeter((prev) => {
      const next = Math.min(100, prev + 12);
      if (next >= 100 && !unlockedCertificate) triggerCertificateUnlock();
      return next;
    });
    setRecentAction("Fed Shadow tasty tuna fish! 🐟 Shadow purrs happily!");

    confetti({
      particleCount: 12,
      spread: 50,
      origin: { x: 0.3, y: 0.6 },
      colors: ['#10B981', '#34D399', '#FFD700']
    });
  };

  const feedMatto = () => {
    setMattoHunger((prev) => Math.min(100, prev + 15));
    setLoveMeter((prev) => {
      const next = Math.min(100, prev + 12);
      if (next >= 100 && !unlockedCertificate) triggerCertificateUnlock();
      return next;
    });
    setRecentAction("Gave Matto warm cat milk! 🥛 Matto licks her paws in joy!");

    confetti({
      particleCount: 12,
      spread: 50,
      origin: { x: 0.7, y: 0.6 },
      colors: ['#FFACC7', '#F472B6', '#FFD700']
    });
  };

  const petBoth = () => {
    setLoveMeter((prev) => {
      const next = Math.min(100, prev + 15);
      if (next >= 100 && !unlockedCertificate) triggerCertificateUnlock();
      return next;
    });
    setRecentAction("Petted Shadow & Matto together! Double purrs! 🐾💕");

    confetti({
      particleCount: 20,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5D8F', '#FFFFFF', '#1A1A24', '#FFD700']
    });
  };

  const triggerCertificateUnlock = () => {
    setUnlockedCertificate(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF5D8F', '#FFACC7', '#FFD700', '#A9DEF9', '#D0F4DE']
    });
    if (onUnlockReward) onUnlockReward();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-6">
      <div className="p-8 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="text-center mb-6">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-emerald-400" /> Mascot Playground
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-pink-300 font-cute">
            Shadow & Matto's Care Station 🐾
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-cute">
            Feed, pet, & pamper Shadow & Matto to fill Mia's Love Meter to 100%!
          </p>
        </div>

        {/* Love Meter Bar */}
        <div className="mb-8 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
          <div className="flex justify-between items-center mb-2 font-bold text-sm">
            <span className="text-pink-300 font-cute flex items-center gap-1.5">
              <Heart fill="#FF5D8F" size={18} className="text-pink-500 animate-pulse" />
              Mia & Kittens Love Meter
            </span>
            <span className="text-amber-300 font-mono">{loveMeter}%</span>
          </div>
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <motion.div
              initial={{ width: '40%' }}
              animate={{ width: `${loveMeter}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 rounded-full shadow-lg"
            ></motion.div>
          </div>
          <div className="mt-2 text-center text-xs text-slate-400 font-cute">
            {recentAction}
          </div>
        </div>

        {/* Kitten Care Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shadow's Box */}
          <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-emerald-500/40 flex items-center justify-center text-2xl mb-3 shadow-md">
              🐈‍⬛
            </div>
            <h4 className="font-bold text-slate-200 font-cute text-lg">Shadow (Black Kitten)</h4>
            <div className="w-full bg-slate-900 h-2 rounded-full my-2 overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-400" style={{ width: `${shadowHunger}%` }}></div>
            </div>
            <span className="text-xs text-slate-400 mb-4">Happiness: {shadowHunger}%</span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={feedShadow}
              className="w-full py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold rounded-xl border border-emerald-500/40 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Fish size={16} /> Feed Shadow Tuna 🐟
            </motion.button>
          </div>

          {/* Matto's Box */}
          <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-pink-500/40 flex items-center justify-center text-2xl mb-3 shadow-md">
              🐈‍⬛🤍
            </div>
            <h4 className="font-bold text-slate-200 font-cute text-lg">Matto (White Kitten)</h4>
            <div className="w-full bg-slate-900 h-2 rounded-full my-2 overflow-hidden border border-slate-800">
              <div className="h-full bg-pink-400" style={{ width: `${mattoHunger}%` }}></div>
            </div>
            <span className="text-xs text-slate-400 mb-4">Happiness: {mattoHunger}%</span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={feedMatto}
              className="w-full py-2.5 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 font-semibold rounded-xl border border-pink-500/40 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Milk size={16} /> Feed Matto Milk 🥛
            </motion.button>
          </div>
        </div>

        {/* Pet Both Combo Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={petBoth}
            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/25 flex items-center gap-2 text-base"
          >
            <Heart fill="#FFFFFF" size={20} /> Pet Both Shadow & Matto! 🐾💕
          </motion.button>
        </div>

        {/* Certificate Pop-up when Love Meter = 100% */}
        <AnimatePresence>
          {unlockedCertificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="mt-8 p-6 md:p-8 bg-gradient-to-br from-amber-950/90 via-slate-900 to-pink-950/90 border-2 border-amber-400/80 rounded-3xl shadow-2xl text-center relative"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-lg flex items-center gap-1">
                <Trophy size={14} /> Official Award Unlocked!
              </div>

              <div className="mt-2 text-amber-300 font-handwriting text-3xl">
                Certificate of Ultimate Love 📜✨
              </div>
              <h3 className="text-2xl font-extrabold text-white font-cute mt-1">
                Presented to Mia 🕊️
              </h3>
              <p className="text-slate-200 text-sm md:text-base mt-3 leading-relaxed font-cute max-w-lg mx-auto">
                "Officially certified as the <strong>World's Greatest Cat Mom & Most Loved Wife</strong>! Shadow & Matto award you 1,000,000 extra cuddles & purrs on your birthday!"
              </p>
              <div className="mt-5 flex items-center justify-center gap-4 text-xs text-amber-300 font-cute">
                <span>Signed: Ruhaan ❤️</span>
                <span>•</span>
                <span>Paws: Shadow 🐾🖤</span>
                <span>•</span>
                <span>Paws: Matto 🐾🤍</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
