import React from 'react';
import { X, Star, MapPin, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Destination } from '../data/travelData';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onViewStays: (destName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onViewStays,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Photo */}
        <div className="relative h-64 w-full bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                {destination.country}
              </span>
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{destination.rating}</span>
                <span className="text-slate-300 text-[11px]">({destination.staysCount})</span>
              </div>
            </div>
            <h3 className="text-3xl font-black">{destination.name}</h3>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-5">
          <p className="text-sm font-semibold text-teal-900 bg-teal-50/70 p-3 rounded-xl border border-teal-100">
            {destination.tagline}
          </p>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Must-Visit Highlights
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {destination.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 p-2 rounded-lg bg-slate-50"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Available Accommodations</span>
              <p className="text-sm font-bold text-slate-900">{destination.staysCount}</p>
            </div>

            <button
              onClick={() => {
                onViewStays(destination.name);
                onClose();
              }}
              className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <span>Explore Stays in {destination.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
