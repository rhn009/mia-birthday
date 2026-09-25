import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    if (!isOpen) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF5D8F', '#FFACC7', '#FFD700']
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-8">
        <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-xs font-semibold rounded-full border border-rose-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
          <Feather size={14} className="text-rose-400" /> Private & Confidential
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 font-cute">
          Ruhaan's Sealed Birthday Letter 💌
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-cute">
          Tap the wax seal to unseal your secret birthday love letter!
        </p>
      </div>

      {/* Envelope / Letter Container */}
      <div className="relative flex justify-center">
        {!isOpen ? (
          /* Sealed Envelope View */
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleLetter}
            className="w-full max-w-lg p-8 md:p-12 bg-gradient-to-b from-rose-950/80 via-slate-900 to-slate-950 border-2 border-rose-500/40 rounded-3xl shadow-2xl cursor-pointer flex flex-col items-center text-center relative overflow-hidden backdrop-blur-xl group"
          >
            {/* Subtle Stamps */}
            <div className="absolute top-4 right-6 border-2 border-dashed border-pink-400/40 p-2 rounded-lg text-pink-300 font-mono text-xs rotate-6 flex flex-col items-center">
              <span>POSTAL 🕊️</span>
              <span className="font-bold text-xs">MIA & RUHAAN</span>
            </div>

            <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-6 group-hover:scale-110 transition-all">
              <Mail size={48} className="text-rose-400" />
            </div>

            <h3 className="text-2xl font-bold text-rose-100 font-cute">
              To My Beloved Wife, Mia 🕊️
            </h3>
            <p className="text-slate-400 text-xs mt-1 font-cute">
              From: Your Husband, Ruhaan ❤️ (With Shadow & Matto 🐾)
            </p>

            {/* Wax Seal Button */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold rounded-full shadow-xl shadow-red-600/40 flex items-center gap-2 border border-red-400 text-sm"
            >
              <Lock size={16} /> Tap Wax Seal to Unseal 🌹
            </motion.div>
          </motion.div>
        ) : (
          /* Unsealed Open Letter View */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl p-8 md:p-12 bg-gradient-to-br from-amber-50/95 via-rose-50/95 to-pink-50/95 text-slate-900 border-4 border-rose-300 rounded-3xl shadow-2xl relative font-cute leading-relaxed"
          >
            {/* Stamp Detail */}
            <div className="flex justify-between items-center border-b border-rose-200 pb-4 mb-6">
              <div className="text-xs text-rose-700 font-semibold font-mono">
                DATE: September 2026 • BIRTHDAY SPECIAL
              </div>
              <button
                onClick={toggleLetter}
                className="px-3 py-1 bg-rose-200 hover:bg-rose-300 text-rose-800 text-xs font-bold rounded-lg transition-all"
              >
                Close Letter ✉️
              </button>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-base text-slate-800 font-cute">
              <p className="text-2xl font-handwriting text-rose-700 font-bold">
                My Dearest Mia, Meri Jan 🕊️❤️,
              </p>

              <p>
                Happy Birthday, my love! Today is the day the world was blessed with the most beautiful, kind, caring, and gentle soul—my wife.
              </p>

              <p>
                Looking back at where we started—from late-night conversations and studying together, to you telling me about your dream of having cats after marriage... to now living that dream with our two precious fur babies, <strong className="text-emerald-800">Shadow 🐈‍⬛</strong> and <strong className="text-pink-800">Matto 🐈‍⬛🤍</strong>—every single moment with you has been a blessing.
              </p>

              <p>
                Shadow loves his Mom who rescued him in spirit and gave him a home. Matto adores her Mom who pampers her every day. And I, Ruhaan, love you more than words, code, or time can ever measure.
              </p>

              <p>
                I pray this year brings you endless happiness, good health, all the sweet success you deserve, and millions of warm hugs. Thank you for being my wife, my best friend, my shadow in the dark, and my light in every moment.
              </p>

              <p className="text-xl font-handwriting text-rose-700 font-bold pt-4 text-right">
                I love you the most, Meri Jan ❤️<br />
                Yours Forever & Always,<br />
                Ruhaan 💖
              </p>
            </div>

            {/* Cat Paw Signatures */}
            <div className="mt-8 pt-4 border-t border-rose-200 flex justify-around text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">🐾 Shadow Approved</span>
              <span className="flex items-center gap-1">🐾 Matto Approved</span>
              <span className="flex items-center gap-1">❤️ Ruhaan Approved</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
