import React, { useRef } from 'react';
import { Star, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import { Destination } from '../data/travelData';

interface PopularDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onViewAllClick: () => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  destinations,
  onSelectDestination,
  onViewAllClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="w-10 h-1 bg-teal-600 rounded-full mb-2" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Popular Destinations
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewAllClick}
            className="text-xs sm:text-sm font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 group"
          >
            <span>View all destinations</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Destinations Horizontal Scrolling Container / Grid */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest)}
            className="min-w-[240px] sm:min-w-[260px] lg:min-w-[280px] h-[340px] sm:h-[380px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 snap-start shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Background Image with Fallback */}
            <img
              src={dest.image}
              alt={`${dest.name}, ${dest.country}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={(e) => {
                // Fallback to elegant scenic gradient if image fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />

            {/* Fallback container with gradient and icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-800 to-slate-900 -z-10 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-teal-400/40" />
            </div>

            {/* Dark Gradient Overlay for optimal legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:from-black/90 transition-colors" />

            {/* Card Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                {dest.name}
              </h3>
              <p className="text-xs text-slate-300 font-medium mb-2.5">
                {dest.country}
              </p>

              <div className="flex items-center gap-1.5 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">{dest.rating}</span>
                <span className="text-slate-300 text-[11px]">({dest.staysCount})</span>
              </div>
            </div>

            {/* Hover subtle explore prompt */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[11px] font-bold bg-white/90 text-slate-900 px-2.5 py-1 rounded-full shadow-xs">
                Explore
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
