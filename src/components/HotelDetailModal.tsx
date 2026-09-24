import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Check, 
  Wifi, 
  Waves, 
  Coffee, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  Users, 
  CreditCard,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Hotel } from '../data/travelData';

interface HotelDetailModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onCompleteBooking: (bookingDetails: any) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onCompleteBooking,
}) => {
  if (!hotel) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Calculate nights
  const nights = 3;
  const currentRoom = hotel.roomTypes[selectedRoomIndex] || hotel.roomTypes[0];
  const roomPrice = currentRoom.price;
  const subtotal = roomPrice * nights;
  const taxes = Math.round(subtotal * 0.12);
  const discountAmount = Math.round((subtotal * discountApplied) / 100);
  const total = subtotal + taxes - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SUMMER30') {
      setDiscountApplied(30);
      setPromoStatus('Success: 30% Summer discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'WANDERFLY') {
      setDiscountApplied(15);
      setPromoStatus('Success: 15% discount applied!');
    } else {
      setPromoStatus('Invalid promotional code.');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'WND-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setBookingConfirmed(true);
    onCompleteBooking({
      ref,
      hotelName: hotel.name,
      location: hotel.location,
      roomName: currentRoom.name,
      checkIn,
      checkOut,
      guestName: guestName || 'Guest Traveler',
      guestEmail: guestEmail || 'guest@wanderly.com',
      total,
      nights,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingConfirmed ? (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center my-auto">
            <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Booking Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-2">
              Pack your bags! You're going to {hotel.location.split(',')[0]}!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              A confirmation email with your itinerary voucher has been sent. Your booking reference number is:
            </p>
            <div className="inline-block bg-slate-100 px-5 py-2.5 rounded-xl font-mono text-base font-bold text-slate-900 mb-6">
              {bookingRef}
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 max-w-md mx-auto text-left text-xs text-slate-700 space-y-2 mb-8">
              <div className="flex justify-between font-semibold">
                <span>Hotel:</span>
                <span>{hotel.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Room Type:</span>
                <span>{currentRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Dates:</span>
                <span>{checkIn} to {checkOut} ({nights} nights)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                <span>Total Paid:</span>
                <span>${total}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-teal-800 text-white font-bold rounded-xl hover:bg-teal-900 transition-colors shadow-md"
            >
              Done & Explore More
            </button>
          </div>
        ) : (
          /* Normal Hotel Details & Booking Flow */
          <div>
            {/* Gallery Header */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
              <img
                src={hotel.gallery[activeImageIndex] || hotel.image}
                alt={hotel.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(hotel.id)}
                className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 text-slate-700 flex items-center justify-center shadow-md hover:bg-white transition-transform active:scale-95"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
                  }`}
                />
              </button>

              {/* Thumbnail Selector */}
              {hotel.gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                  {hotel.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Price Tag Overlay */}
              <div className="absolute bottom-4 right-4 text-right text-white">
                <span className="text-xs opacity-80">Starting from</span>
                <p className="text-2xl sm:text-3xl font-black tabular-nums">
                  ${hotel.startingPrice} <span className="text-xs font-normal">/ night</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Hotel Description, Amenities, Rooms */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {hotel.category.toUpperCase()}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-slate-800">{hotel.rating}</span>
                      <span className="text-slate-400">({hotel.reviewCount} verified reviews)</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {hotel.name}
                  </h2>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-teal-700" />
                    <span>{hotel.location}</span>
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">About the Property</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hotel.description}
                  </p>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Popular Amenities</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {hotel.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Selection */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Select Room Option</h4>
                  <div className="space-y-3">
                    {hotel.roomTypes.map((room, idx) => {
                      const isSelected = selectedRoomIndex === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedRoomIndex(idx)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-teal-50/70 border-teal-600 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="roomSelect"
                                checked={isSelected}
                                onChange={() => setSelectedRoomIndex(idx)}
                                className="text-teal-700"
                              />
                              <p className="text-sm font-bold text-slate-900">{room.name}</p>
                              <span className="text-[11px] text-slate-500 font-medium">({room.capacity})</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 ml-5">
                              {room.features.map((feat, fidx) => (
                                <span key={fidx} className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                                  ✓ {feat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="text-right sm:shrink-0 ml-5 sm:ml-0">
                            <span className="text-base font-extrabold text-slate-900 tabular-nums">${room.price}</span>
                            <span className="text-xs text-slate-500"> / night</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Booking Checkout Module */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
                    <span>Reserve Your Stay</span>
                    <span className="text-xs font-normal text-teal-700 font-semibold">Best Price Guaranteed</span>
                  </h3>

                  <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">Check In</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">Check Out</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. sarah@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>

                    {/* Promo Code Input */}
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500">Promo Code</label>
                      <div className="flex gap-1.5 mt-0.5">
                        <input
                          type="text"
                          placeholder="Try SUMMER30"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg font-mono uppercase"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoStatus && (
                        <p className={`text-[10px] mt-1 font-semibold ${discountApplied ? 'text-teal-700' : 'text-red-600'}`}>
                          {promoStatus}
                        </p>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>${roomPrice} × {nights} nights:</span>
                        <span className="tabular-nums font-medium">${subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & service fee (12%):</span>
                        <span className="tabular-nums font-medium">${taxes}</span>
                      </div>
                      {discountApplied > 0 && (
                        <div className="flex justify-between text-teal-700 font-bold">
                          <span>Promo Discount ({discountApplied}%):</span>
                          <span className="tabular-nums">-${discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                        <span>Total Due:</span>
                        <span className="tabular-nums text-base text-teal-900">${total}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#E76F51] to-[#E8633A] hover:from-[#d65d40] hover:to-[#d6532b] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-98 mt-3"
                    >
                      Instant Confirm Booking
                    </button>
                  </form>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Free cancellation up to 48 hours before check-in
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
