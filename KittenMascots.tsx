import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KittenMascotsProps {
  onPet?: (kitten: 'shadow' | 'matto') => void;
}

export const KittenMascots: React.FC<KittenMascotsProps> = ({ onPet }) => {
  const [shadowSpeech, setShadowSpeech] = useState<string | null>("Meow! Happy Birthday Mom Mia! 🐾🖤");
  const [mattoSpeech, setMattoSpeech] = useState<string | null>("Meow! Dad Ruhaan & I love you! 🐾🤍");
  const [shadowPurring, setShadowPurring] = useState(false);
  const [mattoPurring, setMattoPurring] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; kitten: string }[]>([]);

  const shadowQuotes = [
    "Meow! Thank you for rescuing me, Mom Mia! 🐾🖤",
    "Ruhaan & Mia are the best cat parents ever! 💕",
    "Purrr... Can I get a birthday treat? 🐟",
    "Shadow loves Mom Mia so much! Happy Birthday! 🎉",
    "Meow! I'm guarding your happiness forever! ✨"
  ];

  const mattoQuotes = [
    "Meow! Happy Birthday to the prettiest mom! 🌸🤍",
    "Shadow & I made a birthday wish for you! 🎂",
    "Purrr... Unlimited cat cuddles today! 🐾",
    "Matto loves Mia & Ruhaan the most! 💖",
    "Meow meow! Today is Mia Day! 👑"
  ];

  const handleShadowClick = (e: React.MouseEvent) => {
    setShadowPurring(true);
    setTimeout(() => setShadowPurring(false), 1200);

    const randomQuote = shadowQuotes[Math.floor(Math.random() * shadowQuotes.length)];
    setShadowSpeech(randomQuote);

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      kitten: 'shadow'
    };
    setHearts((prev) => [...prev.slice(-10), newHeart]);

    confetti({
      particleCount: 15,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF5D8F', '#1A1A24', '#FFD700']
    });

    if (onPet) onPet('shadow');
  };

  const handleMattoClick = (e: React.MouseEvent) => {
    setMattoPurring(true);
    setTimeout(() => setMattoPurring(false), 1200);

    const randomQuote = mattoQuotes[Math.floor(Math.random() * mattoQuotes.length)];
    setMattoSpeech(randomQuote);

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      kitten: 'matto'
    };
    setHearts((prev) => [...prev.slice(-10), newHeart]);

    confetti({
      particleCount: 15,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFFFFF', '#FFACC7', '#FFD700']
    });

    if (onPet) onPet('matto');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-around gap-8">
      {/* Floating Hearts Container */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none text-pink-500"
            style={{ left: `${h.x}px`, top: `${h.y}px` }}
          >
            <Heart fill="#FF5D8F" size={28} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* SHADOW - Black Kitten Mascot */}
      <div className="flex flex-col items-center group relative">
        <AnimatePresence mode="wait">
          {shadowSpeech && (
            <motion.div
              key={shadowSpeech}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 px-4 py-2 bg-slate-900/90 border border-slate-700 text-pink-300 font-cute text-sm md:text-base rounded-2xl shadow-xl relative max-w-xs text-center backdrop-blur-md"
            >
              <span>{shadowSpeech}</span>
              <div className="w-3 h-3 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={shadowPurring ? { y: [0, -6, 0, -6, 0], scale: [1, 1.04, 1] } : { y: [0, -8, 0] }}
          transition={shadowPurring ? { duration: 0.3, repeat: 4 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          onClick={handleShadowClick}
          className="cursor-pointer relative p-4 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-pink-500/50 shadow-2xl transition-all"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 border border-emerald-400 text-emerald-300 px-3 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Shadow (Rescued Kitten)
          </div>

          <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shadowBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A2A38" />
                <stop offset="100%" stopColor="#121218" />
              </linearGradient>
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <motion.path
              d="M 150 140 C 180 120 190 70 160 60 C 145 55 140 80 150 110"
              stroke="#1E1E28"
              strokeWidth="14"
              strokeLinecap="round"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            <ellipse cx="100" cy="140" rx="55" ry="45" fill="url(#shadowBody)" stroke="#3A3A4A" strokeWidth="2" />
            <ellipse cx="100" cy="145" rx="35" ry="25" fill="#181822" />

            <ellipse cx="70" cy="175" rx="14" ry="10" fill="#2A2A38" stroke="#3A3A4A" />
            <ellipse cx="130" cy="175" rx="14" ry="10" fill="#2A2A38" stroke="#3A3A4A" />
            <circle cx="70" cy="177" r="4" fill="#FF9EB5" />
            <circle cx="130" cy="177" r="4" fill="#FF9EB5" />

            <circle cx="100" cy="90" r="48" fill="url(#shadowBody)" stroke="#3A3A4A" strokeWidth="2" />

            <path d="M 60 60 L 40 15 L 80 48 Z" fill="#1A1A24" stroke="#3A3A4A" strokeWidth="2" />
            <path d="M 62 55 L 47 25 L 76 47 Z" fill="#FF9EB5" opacity="0.8" />
            <path d="M 140 60 L 160 15 L 120 48 Z" fill="#1A1A24" stroke="#3A3A4A" strokeWidth="2" />
            <path d="M 138 55 L 153 25 L 124 47 Z" fill="#FF9EB5" opacity="0.8" />

            <ellipse cx="78" cy="85" rx="10" ry="12" fill="#10B981" filter="url(#glowGreen)" />
            <ellipse cx="122" cy="85" rx="10" ry="12" fill="#10B981" filter="url(#glowGreen)" />
            <ellipse cx="79" cy="85" rx="4" ry="9" fill="#042F2E" />
            <ellipse cx="123" cy="85" rx="4" ry="9" fill="#042F2E" />
            <circle cx="75" cy="80" r="3" fill="#FFFFFF" />
            <circle cx="119" cy="80" r="3" fill="#FFFFFF" />

            <polygon points="100,96 95,91 105,91" fill="#FF80A0" />
            <path d="M 95 100 Q 100 106 105 100" stroke="#FF80A0" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <line x1="45" y1="90" x2="15" y2="85" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="45" y1="97" x2="15" y2="99" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="155" y1="90" x2="185" y2="85" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="155" y1="97" x2="185" y2="99" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />

            <path d="M 68 122 Q 100 134 132 122" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="100" cy="130" r="7" fill="#FFD700" stroke="#B45309" strokeWidth="1.5" />
            <text x="100" y="133" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#78350F">S</text>
          </svg>

          <div className="mt-2 text-center text-xs text-slate-400 group-hover:text-emerald-300 flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-emerald-400" /> Click to Pet Shadow 🐾
          </div>
        </motion.div>
      </div>

      {/* HEART CONNECTION CENTER PIECE */}
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="p-4 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 shadow-lg shadow-pink-500/20"
        >
          <Heart fill="#FF5D8F" size={36} className="text-pink-500 animate-pulse" />
        </motion.div>
        <div className="mt-3 text-xs md:text-sm font-handwriting text-pink-300 text-lg">
          Mia's Kitten Duo 🐾✨
        </div>
      </div>

      {/* MATTO - White Kitten Mascot */}
      <div className="flex flex-col items-center group relative">
        <AnimatePresence mode="wait">
          {mattoSpeech && (
            <motion.div
              key={mattoSpeech}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 px-4 py-2 bg-slate-900/90 border border-slate-700 text-pink-300 font-cute text-sm md:text-base rounded-2xl shadow-xl relative max-w-xs text-center backdrop-blur-md"
            >
              <span>{mattoSpeech}</span>
              <div className="w-3 h-3 bg-slate-900 border-r border-b border-slate-700 transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          animate={mattoPurring ? { y: [0, -6, 0, -6, 0], scale: [1, 1.04, 1] } : { y: [0, -8, 0] }}
          transition={mattoPurring ? { duration: 0.3, repeat: 4 } : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          onClick={handleMattoClick}
          className="cursor-pointer relative p-4 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-pink-400/50 shadow-2xl transition-all"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 border border-pink-400 text-pink-300 px-3 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
            Matto (White Kitten)
          </div>

          <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mattoBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
              <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <motion.path
              d="M 50 140 C 20 120 10 70 40 60 C 55 55 60 80 50 110"
              stroke="#F8FAFC"
              strokeWidth="14"
              strokeLinecap="round"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            <ellipse cx="100" cy="140" rx="55" ry="45" fill="url(#mattoBody)" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="100" cy="145" rx="35" ry="25" fill="#FFF5F7" />

            <ellipse cx="70" cy="175" rx="14" ry="10" fill="#FFFFFF" stroke="#CBD5E1" />
            <ellipse cx="130" cy="175" rx="14" ry="10" fill="#FFFFFF" stroke="#CBD5E1" />
            <circle cx="70" cy="177" r="4" fill="#FFACC7" />
            <circle cx="130" cy="177" r="4" fill="#FFACC7" />

            <circle cx="100" cy="90" r="48" fill="url(#mattoBody)" stroke="#E2E8F0" strokeWidth="2" />

            <path d="M 60 60 L 40 15 L 80 48 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M 62 55 L 47 25 L 76 47 Z" fill="#FFACC7" opacity="0.9" />
            <path d="M 140 60 L 160 15 L 120 48 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M 138 55 L 153 25 L 124 47 Z" fill="#FFACC7" opacity="0.9" />

            <circle cx="145" cy="45" r="5" fill="#FF5D8F" />
            <polygon points="145,45 137,38 137,52" fill="#FFACC7" />
            <polygon points="145,45 153,38 153,52" fill="#FFACC7" />

            <ellipse cx="78" cy="85" rx="10" ry="12" fill="#3B82F6" filter="url(#glowBlue)" />
            <ellipse cx="122" cy="85" rx="10" ry="12" fill="#3B82F6" filter="url(#glowBlue)" />
            <ellipse cx="79" cy="85" rx="4" ry="9" fill="#1E3A8A" />
            <ellipse cx="123" cy="85" rx="4" ry="9" fill="#1E3A8A" />
            <circle cx="75" cy="80" r="3" fill="#FFFFFF" />
            <circle cx="119" cy="80" r="3" fill="#FFFFFF" />

            <polygon points="100,96 95,91 105,91" fill="#FF5D8F" />
            <path d="M 95 100 Q 100 106 105 100" stroke="#FF5D8F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <line x1="45" y1="90" x2="15" y2="85" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="45" y1="97" x2="15" y2="99" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="155" y1="90" x2="185" y2="85" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="155" y1="97" x2="185" y2="99" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

            <path d="M 68 122 Q 100 134 132 122" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="100" cy="130" r="7" fill="#FFD700" stroke="#B45309" strokeWidth="1.5" />
            <text x="100" y="133" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#78350F">M</text>
          </svg>

          <div className="mt-2 text-center text-xs text-slate-400 group-hover:text-pink-300 flex items-center justify-center gap-1">
            <Sparkles size={14} className="text-pink-400" /> Click to Pet Matto 🐾
          </div>
        </motion.div>
      </div>
    </div>
  );
};
