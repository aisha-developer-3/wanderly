import React from 'react';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Waves, 
  Coffee, 
  Sparkles, 
  Heart, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Hotel } from '../data/travelData';

interface FeaturedHotelsProps {
  hotels: Hotel[];
  wishlist: string[];
  onToggleWishlist: (hotelId: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onViewAllHotels: () => void;
}

export const FeaturedHotels: React.FC<FeaturedHotelsProps> = ({
  hotels,
  wishlist,
  onToggleWishlist,
  onSelectHotel,
  onViewAllHotels,
}) => {
  return (
    <section id="hotels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Featured Hotels
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Handpicked premium accommodations with exceptional guest reviews
          </p>
        </div>

        <button
          onClick={onViewAllHotels}
          className="text-xs sm:text-sm font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 group"
        >
          <span>View all hotels</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => {
          const isWishlisted = wishlist.includes(hotel.id);

          return (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Wishlist Trigger */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-slate-200 -z-10 flex items-center justify-center text-slate-400">
                  <span className="text-xs font-semibold">Wanderly Stay</span>
                </div>

                {/* Badge if available */}
                {hotel.badge && (
                  <div className="absolute top-3.5 left-3.5 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {hotel.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(hotel.id);
                  }}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 flex items-center justify-center shadow-md transition-transform active:scale-90"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
                    }`}
                  />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 
                      onClick={() => onSelectHotel(hotel)}
                      className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-teal-800 transition-colors cursor-pointer"
                    >
                      {hotel.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{hotel.location}</span>
                  </div>

                  {/* Rating Stars & Count */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(hotel.rating)
                              ? 'fill-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{hotel.rating}</span>
                    <span className="text-[11px] text-slate-400">({hotel.reviewCount} reviews)</span>
                  </div>

                  {/* Amenities Row */}
                  <div className="flex items-center gap-3 py-2 border-y border-slate-100 text-slate-600 text-xs mb-4">
                    <div className="flex items-center gap-1" title="Free High-speed Wi-Fi">
                      <Wifi className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <div className="flex items-center gap-1" title="Pool & Spa">
                      <Waves className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <div className="flex items-center gap-1" title="Breakfast Option">
                      <Coffee className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <div className="flex items-center gap-1" title="Verified Cleanliness">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <span className="text-[11px] text-slate-400 ml-auto font-medium">Free cancellation</span>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-slate-400">From </span>
                    <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                      ${hotel.startingPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-medium"> / night</span>
                  </div>

                  <button
                    onClick={() => onSelectHotel(hotel)}
                    className="px-4 py-2 border border-teal-700/60 text-teal-800 hover:bg-teal-700 hover:text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
