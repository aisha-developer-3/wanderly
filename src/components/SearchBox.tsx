import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Plane, 
  Package, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/travelData';

interface SearchBoxProps {
  activeSearchType: 'hotels' | 'flights' | 'packages';
  setActiveSearchType: (type: 'hotels' | 'flights' | 'packages') => void;
  destinationQuery: string;
  setDestinationQuery: (q: string) => void;
  onPerformSearch: (searchParams: {
    type: 'hotels' | 'flights' | 'packages';
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
  }) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  activeSearchType,
  setActiveSearchType,
  destinationQuery,
  setDestinationQuery,
  onPerformSearch,
}) => {
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-22');
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  const destRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPerformSearch({
      type: activeSearchType,
      destination: destinationQuery,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: adults,
      rooms: rooms,
    });
  };

  const selectDestination = (name: string) => {
    setDestinationQuery(name);
    setShowDestDropdown(false);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 lg:-mt-20 z-30">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3 sm:p-4 lg:p-5">
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 lg:items-center">
          
          {/* Left Vertical Tab Selector matching mockup */}
          <div className="flex lg:flex-col gap-1.5 shrink-0 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            <button
              type="button"
              onClick={() => setActiveSearchType('hotels')}
              className={`flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeSearchType === 'hotels'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Hotels</span>
              </div>
              {activeSearchType === 'hotels' && <ChevronRight className="w-3.5 h-3.5 hidden lg:block" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveSearchType('flights')}
              className={`flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeSearchType === 'flights'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                <span>Flights</span>
              </div>
              {activeSearchType === 'flights' && <ChevronRight className="w-3.5 h-3.5 hidden lg:block" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveSearchType('packages')}
              className={`flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeSearchType === 'packages'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Packages</span>
              </div>
              {activeSearchType === 'packages' && <ChevronRight className="w-3.5 h-3.5 hidden lg:block" />}
            </button>
          </div>

          {/* Form Input Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
            
            {/* Destination Field with Autocomplete Dropdown */}
            <div ref={destRef} className="relative">
              <div 
                onClick={() => setShowDestDropdown(true)}
                className="p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Destination
                  </span>
                  <MapPin className="w-4 h-4 text-teal-700" />
                </div>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destinationQuery}
                  onChange={(e) => {
                    setDestinationQuery(e.target.value);
                    setShowDestDropdown(true);
                  }}
                  onFocus={() => setShowDestDropdown(true)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden"
                />
              </div>

              {/* Destination Dropdown */}
              {showDestDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-50 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Popular Destinations
                  </div>
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => selectDestination(dest.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 rounded-lg text-xs transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-bold text-slate-800">{dest.name}</p>
                          <p className="text-[10px] text-slate-400">{dest.country}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{dest.staysCount}</span>
                    </button>
                  ))}
                  {destinationQuery && (
                    <button
                      type="button"
                      onClick={() => setShowDestDropdown(false)}
                      className="w-full mt-1 text-center py-1.5 text-xs text-teal-700 font-semibold border-t border-slate-100"
                    >
                      Use "{destinationQuery}"
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Check In Date */}
            <div className="p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {activeSearchType === 'flights' ? 'Departure' : 'Check In'}
                </span>
                <Calendar className="w-4 h-4 text-teal-700" />
              </div>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Check Out Date */}
            <div className="p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {activeSearchType === 'flights' ? 'Return' : 'Check Out'}
                </span>
                <Calendar className="w-4 h-4 text-teal-700" />
              </div>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Guests & Rooms Popover */}
            <div ref={guestRef} className="relative">
              <div 
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Guests & Rooms
                  </span>
                  <Users className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-sm font-semibold text-slate-800 truncate">
                  {adults} {adults === 1 ? 'Guest' : 'Guests'}, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </div>
              </div>

              {/* Guest Adjuster Popover */}
              {showGuestDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Guests</p>
                        <p className="text-[10px] text-slate-400">Age 13 or above</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                          className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Rooms</p>
                        <p className="text-[10px] text-slate-400">Accommodation units</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{rooms}</span>
                        <button
                          type="button"
                          onClick={() => setRooms(Math.min(5, rooms + 1))}
                          className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="w-full py-1.5 bg-teal-700 text-white rounded-lg text-xs font-bold hover:bg-teal-800 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Big Search Submit Button */}
          <button
            type="submit"
            className="w-full lg:w-auto px-7 py-4 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-98 shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
            <span className="text-sm">Search</span>
          </button>

        </form>
      </div>
    </div>
  );
};
