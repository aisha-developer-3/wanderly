import React from 'react';
import { ArrowRight, Plane, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/travelData';

interface PromoBannerProps {
  onExploreDeals: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onExploreDeals }) => {
  return (
    <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-teal-950 shadow-xl border border-teal-900/30">
        
        {/* Background Image with Fallback */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.banner}
            alt="Summer tropical beach vacation promo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right sm:object-center opacity-75 sm:opacity-90"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          {/* Subtle gradient overlay to prioritize text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/80 to-transparent sm:via-teal-950/60 lg:w-2/3" />
        </div>

        {/* Flight Trajectory Graphic */}
        <div className="hidden md:block absolute top-1/2 left-1/3 -translate-y-1/2 pointer-events-none opacity-40">
          <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
            <path
              d="M10 70 C 60 10, 150 90, 200 20"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
          <Plane className="w-5 h-5 text-white absolute top-2 right-3 rotate-45" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 max-w-xl text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800/80 backdrop-blur-xs text-[11px] font-bold text-teal-200 mb-3 border border-teal-700/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Limited Seasonal Offer</span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2">
            Get up to 30% off
          </h3>

          <p className="text-sm sm:text-base text-teal-100/90 font-medium mb-6">
            on your dream destinations this summer with Wanderly verified bookings.
          </p>

          <button
            onClick={onExploreDeals}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-teal-950 font-bold text-xs sm:text-sm hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Explore Deals</span>
            <ArrowRight className="w-4 h-4 text-teal-800" />
          </button>
        </div>

      </div>
    </section>
  );
};
