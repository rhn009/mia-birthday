import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Sparkles, Calendar, Bookmark, CheckCircle2 } from 'lucide-react';

export const ChatTimeline: React.FC = () => {
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
      quote: "[04/12/2023] Mia: 'I love you so much Meri Jan <33'\n[04/12/2023] Ruhaan: 'I love you more babe <33'",
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

      {/* Interactive Tabs */}
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

      {/* Active Memory Card */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 md:p-8 bg-slate-900/80 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Background Badge Glow */}
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

        {/* WhatsApp Quote Box */}
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
