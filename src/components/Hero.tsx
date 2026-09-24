import React from 'react';
import { ShieldCheck, BedDouble, Headphones, Lock } from 'lucide-react';
import { IMAGES } from '../data/travelData';

export const Hero: React.FC = () => {
  const trustHighlights = [
    { label: 'Best Price Guarantee', icon: ShieldCheck },
    { label: 'Handpicked Stays', icon: BedDouble },
    { label: '24/7 Travel Support', icon: Headphones },
    { label: 'Secure Booking', icon: Lock },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900">
      {/* Hero Background Image with Fallback and Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Luxury overwater tropical villas in Maldives"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          onError={(e) => {
            // Fallback gracefully to background styling if image fails
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        {/* Soft overlay matching design: clear on top left for crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:via-white/70 sm:to-transparent lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-40">
        <div className="max-w-2xl">
          
          {/* Cursive Tagline Accent */}
          <p className="font-script text-3xl sm:text-4xl text-[#E76F51] font-bold tracking-wide mb-2 drop-shadow-xs">
            The world is calling
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5 text-balance">
            Where will your next adventure be?
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 max-w-xl">
            Discover handpicked destinations, amazing stays, and unforgettable experiences curated just for you.
          </p>

          {/* Trust Highlights Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            {trustHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/85 backdrop-blur-sm border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-800 hover:bg-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
