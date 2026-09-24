import React, { useState } from 'react';
import { Plane, Clock, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { FLIGHTS_DATA, FlightOption } from '../data/travelData';

interface FlightSearchResultsProps {
  onClose: () => void;
  destinationFilter?: string;
  onBookFlight: (flight: FlightOption) => void;
}

export const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({
  onClose,
  destinationFilter,
  onBookFlight,
}) => {
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [flightConfirmed, setFlightConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const filteredFlights = destinationFilter
    ? FLIGHTS_DATA.filter(
        (f) =>
          f.to.toLowerCase().includes(destinationFilter.toLowerCase()) ||
          destinationFilter.toLowerCase().includes(f.to.toLowerCase())
      )
    : FLIGHTS_DATA;

  const displayList = filteredFlights.length > 0 ? filteredFlights : FLIGHTS_DATA;

  const handleConfirmFlight = (flight: FlightOption) => {
    const ref = 'FLT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSelectedFlight(flight);
    setFlightConfirmed(true);
    onBookFlight(flight);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        {flightConfirmed && selectedFlight ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Flight Ticket Reserved
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-3 mb-2">
              You're all set to fly with {selectedFlight.airline}!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Flight {selectedFlight.flightNumber} ({selectedFlight.from} → {selectedFlight.to})
            </p>
            <div className="inline-block bg-slate-100 px-5 py-2.5 rounded-xl font-mono text-base font-bold text-slate-900 mb-6">
              {bookingRef}
            </div>
            <div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-teal-800 text-white rounded-xl text-xs font-bold hover:bg-teal-900"
              >
                Close & Return to Explorer
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Available Flights {destinationFilter ? `to ${destinationFilter}` : ''}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Real-time schedule and fares with Wanderly airline partner protection.
            </p>

            <div className="space-y-3">
              {displayList.map((flight) => (
                <div
                  key={flight.id}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-teal-500 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 hover:bg-white"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">{flight.airline}</span>
                      <span className="text-[11px] font-mono text-slate-400">({flight.flightNumber})</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                        {flight.classType}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs pt-1">
                      <div>
                        <span className="font-extrabold text-slate-800">{flight.departureTime}</span>
                        <p className="text-[11px] text-slate-500">{flight.from}</p>
                      </div>

                      <div className="flex flex-col items-center px-2">
                        <span className="text-[10px] text-slate-400 font-medium">{flight.duration}</span>
                        <div className="w-20 h-0.5 bg-slate-300 relative my-1">
                          <div className="w-1.5 h-1.5 bg-teal-600 rounded-full absolute -top-0.5 right-0" />
                        </div>
                        <span className="text-[10px] text-teal-700 font-bold">{flight.stops}</span>
                      </div>

                      <div>
                        <span className="font-extrabold text-slate-800">{flight.arrivalTime}</span>
                        <p className="text-[11px] text-slate-500">{flight.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <div className="sm:text-right">
                      <span className="text-xs text-slate-400">From </span>
                      <span className="text-lg font-black text-slate-900 tabular-nums">${flight.price}</span>
                    </div>
                    <button
                      onClick={() => handleConfirmFlight(flight)}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-[#E76F51] to-[#E8633A] text-white text-xs font-bold rounded-lg hover:from-[#d65d40] hover:to-[#d6532b] shadow-xs transition-colors"
                    >
                      Book Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Includes carry-on baggage and flexible cancellation
              </span>
              <button onClick={onClose} className="text-teal-800 font-bold hover:underline">
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
