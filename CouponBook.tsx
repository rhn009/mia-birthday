import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CouponBook: React.FC = () => {
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
              {/* Ticket Notch visual */}
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
