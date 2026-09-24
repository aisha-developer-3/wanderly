import React from 'react';
import { 
  Check, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Sparkles,
  PlaneTakeoff
} from 'lucide-react';
import { TravelPackage } from '../data/travelData';

interface TravelPackagesProps {
  packages: TravelPackage[];
  onSelectPackage: (pkg: TravelPackage) => void;
  onViewAllPackages: () => void;
}

export const TravelPackages: React.FC<TravelPackagesProps> = ({
  packages,
  onSelectPackage,
  onViewAllPackages,
}) => {
  return (
    <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Top Travel Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            All-inclusive flight, stay, and curated excursion deals with zero hidden fees
          </p>
        </div>

        <button
          onClick={onViewAllPackages}
          className="text-xs sm:text-sm font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 group"
        >
          <span>View all packages</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid of 4 packages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => onSelectPackage(pkg)}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
          >
            {/* Image & Discount Badge */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={pkg.image}
                alt={pkg.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />

              <div className="absolute inset-0 bg-slate-200 -z-10 flex items-center justify-center text-slate-400">
                <PlaneTakeoff className="w-8 h-8 text-slate-400" />
              </div>

              {/* Discount Badge matching mockup */}
              <div className="absolute top-3 left-3 bg-[#E76F51] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-sm">
                {pkg.discountBadge}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {pkg.title}
                </h3>
                
                <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span>{pkg.duration} / {pkg.nights}</span>
                </p>

                {/* Included Services list with green checkmarks */}
                <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                  {pkg.includedServices.map((service, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 stroke-[2.5]" />
                      <span className="truncate">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400">From </span>
                  <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                    ${pkg.discountedPrice}
                  </span>
                  <span className="text-xs text-slate-400 line-through ml-1.5 tabular-nums">
                    ${pkg.originalPrice}
                  </span>
                </div>

                <span className="text-xs font-bold text-teal-700 group-hover:underline">
                  Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
