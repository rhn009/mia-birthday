import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Volume2, Calendar, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

import { KittenMascots } from './components/KittenMascots';
import { BirthdayCake } from './components/BirthdayCake';
import { ChatTimeline } from './components/ChatTimeline';
import { KittenPlayground } from './components/KittenPlayground';
import { LoveLetter } from './components/LoveLetter';
import { CouponBook } from './components/CouponBook';
import { audioSynth } from './utils/audioSynth';

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
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Header Bar */}
      <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
        <nav className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-full backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2">
            <span className="text-xl">🕊️</span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-200 font-cute text-sm md:text-base">
              Mia's Birthday Universe
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Pet Count Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700 text-pink-300 text-xs font-semibold rounded-full">
              <span>🐾</span> Petted: <strong className="text-emerald-400 font-mono">{petCount}</strong> times
            </div>

            {/* Birthday Music Button */}
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

      {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-8 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Date & Title Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 text-pink-300 rounded-full text-xs md:text-sm font-semibold mb-6 shadow-lg shadow-pink-500/10"
        >
          <Calendar size={14} className="text-pink-400" />
          <span>September 2026 • Mia's Birthday Special 🎂</span>
        </motion.div>

        {/* Hero Title */}
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-slate-300 text-base sm:text-xl font-cute max-w-2xl leading-relaxed"
        >
          With endless love from your husband <strong className="text-pink-300">Ruhaan ❤️</strong>, your rescue black kitten <strong className="text-emerald-300">Shadow 🐈‍⬛</strong>, and your white kitten <strong className="text-pink-300">Matto 🐈‍⬛🤍</strong>!
        </motion.p>

        {/* Scroll Indicator */}
        <div className="mt-8 text-slate-500 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span>Scroll down to explore your magical wish</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* MASCOTS SECTION: Shadow & Matto */}
      <section className="relative z-10 my-4">
        <KittenMascots onPet={handlePetKitten} />
      </section>

      {/* BIRTHDAY CAKE & WISH CEREMONY */}
      <section className="relative z-10 my-8">
        <BirthdayCake />
      </section>

      {/* KITTEN CARE PLAYGROUND & LOVE METER */}
      <section className="relative z-10 my-8">
        <KittenPlayground />
      </section>

      {/* CHAT MEMORIES & STORY TIMELINE */}
      <section className="relative z-10 my-8">
        <ChatTimeline />
      </section>

      {/* RUHAAN'S SEALED LOVE LETTER */}
      <section className="relative z-10 my-8">
        <LoveLetter />
      </section>

      {/* MIA'S BIRTHDAY COUPON BOOK */}
      <section className="relative z-10 my-8">
        <CouponBook />
      </section>

      {/* FOOTER */}
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
