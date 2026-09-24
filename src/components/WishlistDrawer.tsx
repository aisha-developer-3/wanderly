import React from 'react';
import { X, Heart, Trash2, MapPin, ArrowRight } from 'lucide-react';
import { Hotel } from '../data/travelData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedHotels: Hotel[];
  onRemoveFromWishlist: (hotelId: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedHotels,
  onRemoveFromWishlist,
  onSelectHotel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            <h3 className="text-base font-bold text-slate-900">
              Saved Stays ({wishlistedHotels.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistedHotels.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                Explore handpicked hotels and tap the heart icon to save your dream stays.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-teal-800 text-white rounded-xl text-xs font-bold hover:bg-teal-900 transition-colors"
              >
                Explore Hotels
              </button>
            </div>
          ) : (
            wishlistedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl border border-slate-200/80 p-3 flex gap-3 group hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectHotel(hotel);
                      }}
                      className="text-xs font-bold text-slate-900 truncate hover:text-teal-700 cursor-pointer"
                    >
                      {hotel.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                      ${hotel.startingPrice} <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onRemoveFromWishlist(hotel.id)}
                        aria-label="Remove"
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectHotel(hotel);
                        }}
                        className="px-2.5 py-1 bg-teal-800 text-white text-[11px] font-bold rounded-md hover:bg-teal-900 transition-colors"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedHotels.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button
              onClick={() => {
                onClose();
                const first = wishlistedHotels[0];
                if (first) onSelectHotel(first);
              }}
              className="w-full py-3 bg-gradient-to-r from-[#E76F51] to-[#E8633A] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Book First Saved Stay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
