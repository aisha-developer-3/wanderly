import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Users, 
  Plane, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { TravelPackage } from '../data/travelData';

interface PackageDetailModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onCompleteBooking: (details: any) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onCompleteBooking,
}) => {
  if (!pkg) return null;

  const [selectedDate, setSelectedDate] = useState(pkg.departureDates[0]);
  const [travelers, setTravelers] = useState(2);
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const totalPrice = pkg.discountedPrice * travelers;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'PKG-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setConfirmed(true);
    onCompleteBooking({
      ref,
      packageTitle: pkg.title,
      destination: pkg.destination,
      departureDate: selectedDate,
      travelers,
      total: totalPrice,
      leadTraveler: travelerName || 'Traveler',
      email: travelerEmail || 'traveler@example.com',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="p-8 sm:p-12 text-center my-auto">
            <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Package Reserved
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-2">
              Get ready for {pkg.title}!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Your vacation voucher and full flight/hotel itinerary have been booked.
            </p>
            <div className="inline-block bg-slate-100 px-5 py-2.5 rounded-xl font-mono text-base font-bold text-slate-900 mb-6">
              {bookingRef}
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 max-w-md mx-auto text-left text-xs text-slate-700 space-y-2 mb-8">
              <div className="flex justify-between font-semibold">
                <span>Package:</span>
                <span>{pkg.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Departure:</span>
                <span>{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Travelers:</span>
                <span>{travelers} Person(s)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
                <span>Total Paid:</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-teal-800 text-white font-bold rounded-xl hover:bg-teal-900 transition-colors shadow-md"
            >
              Done & View Stays
            </button>
          </div>
        ) : (
          <div>
            {/* Header Image */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
              <img
                src={pkg.image}
                alt={pkg.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#E76F51] text-white text-xs font-black px-3 py-1 rounded-md">
                {pkg.discountBadge}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-medium text-teal-300">{pkg.destination}</span>
                <h2 className="text-2xl sm:text-3xl font-black">{pkg.title}</h2>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>{pkg.duration} / {pkg.nights}</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Package Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Inclusions */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Included in this Package</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {pkg.includedServices.map((inc, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs font-semibold text-teal-950"
                    >
                      <Check className="w-4 h-4 text-teal-700 stroke-[2.5]" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation Form */}
              <form onSubmit={handleBooking} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Select Departure & Travelers</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Departure Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg font-semibold"
                    >
                      {pkg.departureDates.map((date, idx) => (
                        <option key={idx} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Travelers</label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg font-semibold"
                    >
                      <option value={1}>1 Traveler</option>
                      <option value={2}>2 Travelers</option>
                      <option value={3}>3 Travelers</option>
                      <option value={4}>4 Travelers</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Lead Traveler Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500">Contact Email</label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Price summary */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500">${pkg.discountedPrice} × {travelers} traveler(s)</span>
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                      ${totalPrice}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#E76F51] to-[#E8633A] text-white font-bold rounded-xl text-xs sm:text-sm hover:from-[#d65d40] hover:to-[#d6532b] shadow-md transition-all active:scale-98"
                  >
                    Confirm Package Booking
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
