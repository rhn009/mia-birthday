import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music, Volume2, Calendar, ChevronDown, Mail, Lock, Feather, Gift, CheckCircle2, MessageCircle, Bookmark, Fish, Milk, Trophy, Flame, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

// ==========================================
// 1. WEB AUDIO SYNTHESIZER (No external mp3)
// ==========================================
class AudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBirthdayMelody() {
    this.initCtx();
    if (!this.ctx) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    const melody = [
      { note: 261.63, duration: 0.35 },
      { note: 261.63, duration: 0.35 },
      { note: 293.66, duration: 0.7 },
      { note: 261.63, duration: 0.7 },
      { note: 349.23, duration: 0.7 },
      { note: 329.63, duration: 1.2 },

      { note: 261.63, duration: 0.35 },
      { note: 261.63, duration: 0.35 },
      { note: 293.66, duration: 0.7 },
      { note: 261.63, duration: 0.7 },
      { note: 392.00, duration: 0.7 },
      { note: 349.23, duration: 1.2 },

      { note: 261.63, duration: 0.35 },
      { note: 261.63, duration: 0.35 },
      { note: 523.25, duration: 0.7 },
      { note: 440.00, duration: 0.7 },
      { note: 349.23, duration: 0.7 },
      { note: 329.63, duration: 0.7 },
      { note: 293.66, duration: 1.2 },

      { note: 466.16, duration: 0.35 },
      { note: 466.16, duration: 0.35 },
      { note: 440.00, duration: 0.7 },
      { note: 349.23, duration: 0.7 },
      { note: 392.00, duration: 0.7 },
      { note: 349.23, duration: 1.4 },
    ];

    let startTime = now + 0.1;

    melody.forEach((item) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.duration - 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + item.duration);

      startTime += item.duration;
    });

    setTimeout(() => {
      this.isPlaying = false;
    }, (startTime - now) * 1000);
  }

  playPurrSound() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.linearRampToValueAtTime(75, now + 0.3);
    osc.frequency.linearRampToValueAtTime(55, now + 0.6);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }
}

const audioSynth = new AudioSynth();

// ==========================================
// 2. KITTEN MASCOTS COMPONENT
// ==========================================
const KittenMascots: React.FC<{ onPet?: (kitten: 'shadow' | 'matto') => void }> = ({ onPet }) => {
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

// ==========================================
// 3. BIRTHDAY CAKE COMPONENT
// ==========================================
const BirthdayCake: React.FC<{ onWishMade?: () => void }> = ({ onWishMade }) => {
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

      <div className="relative my-4 cursor-pointer" onClick={blowOutCandles}>
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

          <ellipse cx="150" cy="250" rx="120" ry="18" fill="#334155" />
          <ellipse cx="150" cy="246" rx="115" ry="14" fill="#64748B" />

          <path d="M 40 190 L 40 230 C 40 245 260 245 260 230 L 260 190 Z" fill="url(#cakeLayer1)" />
          <ellipse cx="150" cy="190" rx="110" ry="20" fill="#FFA6C1" />

          <path d="M 40 190 Q 60 215 80 190 Q 100 215 120 190 Q 140 215 160 190 Q 180 215 200 190 Q 220 215 240 190 Q 250 205 260 190" fill="#FFFFFF" opacity="0.9" />

          <path d="M 65 130 L 65 180 C 65 195 235 195 235 180 L 235 130 Z" fill="url(#cakeLayer2)" />
          <ellipse cx="150" cy="130" rx="85" ry="16" fill="#FFC2D1" />

          <path d="M 90 75 L 90 120 C 90 132 210 132 210 120 L 210 75 Z" fill="url(#cakeLayer3)" />
          <ellipse cx="150" cy="75" rx="60" ry="12" fill="#FFFFFF" />

          <circle cx="100" cy="73" r="7" fill="#EF4444" />
          <circle cx="130" cy="71" r="7" fill="#EF4444" />
          <circle cx="150" cy="70" r="7.5" fill="#EF4444" />
          <circle cx="170" cy="71" r="7" fill="#EF4444" />
          <circle cx="200" cy="73" r="7" fill="#EF4444" />

          {[115, 150, 185].map((cx, idx) => (
            <g key={idx}>
              <rect x={cx - 4} y="40" width="8" height="32" rx="2" fill={idx === 1 ? "#FFD700" : "#A855F7"} />
              <line x1={cx} y1="40" x2={cx} y2="34" stroke="#475569" strokeWidth="2" />

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

// ==========================================
// 4. KITTEN CARE PLAYGROUND COMPONENT
// ==========================================
const KittenPlayground: React.FC<{ onUnlockReward?: () => void }> = ({ onUnlockReward }) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

// ==========================================
// 5. CHAT STORY TIMELINE COMPONENT
// ==========================================
const ChatTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const timelineEvents = [
    {
      date: "Dec 11, 2023",
      title: "The Kitten Dream Wish 🐾",
      tag: "The Seed of Our Dream",
      speaker: "Mia 🕊️",
      quote: "Jesy main kbhi kbhi ap sy kh deti hun k hm shadi k baad cat rkhen gy (obv hr lrki k kch dreams hty hain k os ny shadi k baad apny partner k sath kis trha ki life guzaarni hai)...",
      commentary: "Mia whispered her sweet dream of having cats together after marriage. Ruhaan kept this wish locked inside his heart!",
      badgeColor: "from-purple-500 to-pink-500",
      icon: "💭"
    },
    {
      date: "2024 Rescue",
      title: "Shadow Joins the Family 🐈‍⬛",
      tag: "Ruhaan's Rescue Mission",
      speaker: "Ruhaan & Mia",
      quote: "Ruhaan rescued a tiny black kitten with glowing emerald eyes and named him Shadow! Mia said: 'I know you are my shadow'",
      commentary: "Shadow became Ruhaan's mini shadow and Mia's cuddly dark prince. The first cat dream came true!",
      badgeColor: "from-emerald-600 to-teal-500",
      icon: "🐾"
    },
    {
      date: "2024 Special Moment",
      title: "Matto Arrives! 🐈‍⬛🤍",
      tag: "Mia's White Kitten",
      speaker: "Mia & Matto",
      quote: "Mia welcomed Matto—a gorgeous, fluffy white kitten with pink ears and sapphire blue eyes!",
      commentary: "Now Shadow & Matto form the ultimate black-and-white kitten duo! Mom Mia's dream is 100% complete!",
      badgeColor: "from-pink-500 to-rose-400",
      icon: "✨"
    },
    {
      date: "Every Single Day",
      title: "'I Love You The Most, Meri Jan' 💕",
      tag: "Our Eternal Promise",
      speaker: "Ruhaan & Mia",
      quote: "[04/12/2023] Mia: 'I love you so much Meri Jan'\n[04/12/2023] Ruhaan: 'I love you more babe'",
      commentary: "Through all late nights, studying, laughs, & cuddles with Shadow & Matto, Ruhaan's love for Mia grows stronger every second.",
      badgeColor: "from-amber-400 to-rose-500",
      icon: "💖"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
          <Bookmark size={14} className="text-purple-400" /> WhatsApp Memory Lane
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-rose-200 font-cute">
          Our Story: From Wish to Reality 📖✨
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 font-cute max-w-xl mx-auto">
          Revisiting real moments from our chat history that brought us to where we are today!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
        {timelineEvents.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              activeTab === idx
                ? 'bg-slate-900 border-pink-500 shadow-xl shadow-pink-500/10 scale-105'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
              <span className="text-base">{item.icon}</span>
            </div>
            <div className="font-bold text-sm text-slate-200 font-cute line-clamp-1">{item.title}</div>
            <div className="text-xs text-pink-400 mt-1 font-semibold">{item.tag}</div>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 md:p-8 bg-slate-900/80 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        <div className={`absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br ${timelineEvents[activeTab].badgeColor} opacity-20 blur-3xl rounded-full pointer-events-none`}></div>

        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <span className={`px-3 py-1 bg-gradient-to-r ${timelineEvents[activeTab].badgeColor} text-white font-bold text-xs rounded-full shadow-md`}>
            {timelineEvents[activeTab].tag}
          </span>
          <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
            <MessageCircle size={14} className="text-pink-400" /> WhatsApp Chat Vault
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white font-cute mb-3 flex items-center gap-2">
          <span>{timelineEvents[activeTab].icon}</span>
          <span>{timelineEvents[activeTab].title}</span>
        </h3>

        <div className="my-5 p-5 bg-slate-950/80 border-l-4 border-pink-500 rounded-r-2xl shadow-inner relative">
          <div className="text-xs font-semibold text-pink-400 mb-1 flex items-center gap-1">
            <Sparkles size={13} /> {timelineEvents[activeTab].speaker}
          </div>
          <p className="text-slate-200 text-sm md:text-base italic font-cute leading-relaxed whitespace-pre-line">
            "{timelineEvents[activeTab].quote}"
          </p>
        </div>

        <div className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed font-cute flex items-start gap-2">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{timelineEvents[activeTab].commentary}</span>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-cute">
          <span>Memory {activeTab + 1} of {timelineEvents.length}</span>
          <span className="text-pink-400 font-handwriting text-base flex items-center gap-1">
            <Heart size={14} fill="#FF5D8F" className="text-pink-500" /> Forever & Always
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 6. SEALED LOVE LETTER COMPONENT
// ==========================================
const LoveLetter: React.FC = () => {
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

      <div className="relative flex justify-center">
        {!isOpen ? (
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleLetter}
            className="w-full max-w-lg p-8 md:p-12 bg-gradient-to-b from-rose-950/80 via-slate-900 to-slate-950 border-2 border-rose-500/40 rounded-3xl shadow-2xl cursor-pointer flex flex-col items-center text-center relative overflow-hidden backdrop-blur-xl group"
          >
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

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold rounded-full shadow-xl shadow-red-600/40 flex items-center gap-2 border border-red-400 text-sm"
            >
              <Lock size={16} /> Tap Wax Seal to Unseal 🌹
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl p-8 md:p-12 bg-gradient-to-br from-amber-50/95 via-rose-50/95 to-pink-50/95 text-slate-900 border-4 border-rose-300 rounded-3xl shadow-2xl relative font-cute leading-relaxed"
          >
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

// ==========================================
// 7. MIA'S COUPON BOOK COMPONENT
// ==========================================
const CouponBook: React.FC = () => {
  const [redeemed, setRedeemed] = useState<Record<number, boolean>>({});

  const coupons = [
    {
      id: 1,
      title: "1x Unlimited Kitten Cuddles 🐾",
      description: "Ruhaan, Shadow, & Matto join you in bed for 100% cozy cat cuddle time.",
      icon: "🐈‍⬛",
      color: "border-pink-500/50 bg-pink-950/40 text-pink-300"
    },
    {
      id: 2,
      title: "1x Midnight Ice Cream & Treat Run 🍦",
      description: "Redeemable anytime Mia craves late night desserts or snacks!",
      icon: "🍨",
      color: "border-purple-500/50 bg-purple-950/40 text-purple-300"
    },
    {
      id: 3,
      title: "1x Ruhaan Does All House Chores 🧹",
      description: "Ruhaan cleans, washes dishes, and takes care of Shadow & Matto's litter all day!",
      icon: "✨",
      color: "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
    },
    {
      id: 4,
      title: "1x Breakfast in Bed by Ruhaan 🍳",
      description: "Hot tea/coffee and your favorite breakfast served directly to you in bed!",
      icon: "☕",
      color: "border-amber-500/50 bg-amber-950/40 text-amber-300"
    },
    {
      id: 5,
      title: "1x Deluxe Relaxation Massage 💆‍♀️",
      description: "30 minutes of gentle head, back, or foot massage from Ruhaan.",
      icon: "🌸",
      color: "border-rose-500/50 bg-rose-950/40 text-rose-300"
    },
    {
      id: 6,
      title: "1x Ultimate Wish Pass 👑",
      description: "Mia gets 1 free pass to demand ANYTHING from Ruhaan with zero complaints!",
      icon: "🎁",
      color: "border-yellow-500/50 bg-yellow-950/40 text-yellow-300"
    }
  ];

  const handleRedeem = (id: number) => {
    if (redeemed[id]) return;
    setRedeemed((prev) => ({ ...prev, [id]: true }));

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF5D8F', '#FFD700', '#A9DEF9']
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
          <Gift size={14} className="text-yellow-400" /> Birthday Treat Vault
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-rose-300 font-cute">
          Mia's VIP Birthday Coupon Book 🎟️✨
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-cute">
          Click to redeem any coupon whenever you want! Valid for 365 days!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => {
          const isClaimed = redeemed[c.id];
          return (
            <motion.div
              key={c.id}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-3xl border ${c.color} backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden transition-all`}
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border-r border-slate-800"></div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border-l border-slate-800"></div>

              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-slate-400">
                    COUPON #{c.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 font-cute mb-2">
                  {c.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed font-cute">
                  {c.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-cute">Issuer: Ruhaan ❤️</span>
                {isClaimed ? (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 size={14} /> REDEEMED!
                  </span>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRedeem(c.id)}
                    className="px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles size={12} /> Claim Coupon 🎟️
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 8. MAIN APP COMPONENT
// ==========================================
export function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [petCount, setPetCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#FF5D8F', '#FFACC7', '#FFD700', '#A9DEF9']
      });
    }, 800);
  }, []);

  const handleToggleMusic = () => {
    audioSynth.playBirthdayMelody();
    setIsPlayingMusic(true);
    setTimeout(() => setIsPlayingMusic(false), 16000);
  };

  const handlePetKitten = () => {
    setPetCount((prev) => prev + 1);
    audioSynth.playPurrSound();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cute relative selection:bg-pink-500 selection:text-white pb-20">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
        <nav className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-full backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2">
            <span className="text-xl">🕊️</span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-200 font-cute text-sm md:text-base">
              Mia's Birthday Universe
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700 text-pink-300 text-xs font-semibold rounded-full">
              <span>🐾</span> Petted: <strong className="text-emerald-400 font-mono">{petCount}</strong> times
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleMusic}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isPlayingMusic
                  ? 'bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/40 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-pink-300'
              }`}
            >
              {isPlayingMusic ? <Volume2 size={14} /> : <Music size={14} />}
              <span>{isPlayingMusic ? "Playing Tune 🎵" : "Play Birthday Music 🎵"}</span>
            </motion.button>
          </div>
        </nav>
      </header>

      <section className="relative z-10 pt-12 pb-8 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 text-pink-300 rounded-full text-xs md:text-sm font-semibold mb-6 shadow-lg shadow-pink-500/10"
        >
          <Calendar size={14} className="text-pink-400" />
          <span>September 2026 • Mia's Birthday Special 🎂</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight font-cute"
        >
          Happiest Birthday,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 text-glow">
            My Beloved Mia! 🌸🕊️
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-slate-300 text-base sm:text-xl font-cute max-w-2xl leading-relaxed"
        >
          With endless love from your husband <strong className="text-pink-300">Ruhaan ❤️</strong>, your rescue black kitten <strong className="text-emerald-300">Shadow 🐈‍⬛</strong>, and your white kitten <strong className="text-pink-300">Matto 🐈‍⬛🤍</strong>!
        </motion.p>

        <div className="mt-8 text-slate-500 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span>Scroll down to explore your magical wish</span>
          <ChevronDown size={16} />
        </div>
      </section>

      <section className="relative z-10 my-4">
        <KittenMascots onPet={handlePetKitten} />
      </section>

      <section className="relative z-10 my-8">
        <BirthdayCake />
      </section>

      <section className="relative z-10 my-8">
        <KittenPlayground />
      </section>

      <section className="relative z-10 my-8">
        <ChatTimeline />
      </section>

      <section className="relative z-10 my-8">
        <LoveLetter />
      </section>

      <section className="relative z-10 my-8">
        <CouponBook />
      </section>

      <footer className="mt-20 pt-8 border-t border-slate-800/80 text-center text-slate-400 text-xs font-cute flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-pink-300 text-base font-handwriting">
          <span>Built with eternal love by Ruhaan for Mia</span>
          <Heart fill="#FF5D8F" size={16} className="text-pink-500 animate-pulse" />
        </div>
        <p className="text-slate-500">
          Featuring mascots <strong>Shadow 🐾🖤</strong> (Rescued Kitten) & <strong>Matto 🐾🤍</strong> (White Kitten)
        </p>
        <p className="text-slate-600 text-[10px] mt-1 font-mono">
          Ready for Instant Vercel Deployment • 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
