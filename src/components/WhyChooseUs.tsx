import React from 'react';
import { BadgePercent, CalendarSync, Users, Headset } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/travelData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'why-1': return BadgePercent;
      case 'why-2': return CalendarSync;
      case 'why-3': return Users;
      case 'why-4': return Headset;
      default: return BadgePercent;
    }
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Centered Heading with Underline */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Why Travelers Choose Wanderly
        </h2>
        <div className="w-12 h-1 bg-teal-600 rounded-full mx-auto mt-3" />
      </div>

      {/* 4 Feature Columns matching mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {WHY_CHOOSE_ITEMS.map((item) => {
          const Icon = getIcon(item.id);

          return (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {/* Circular Soft Teal Container */}
              <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Icon className="w-6 h-6 stroke-[1.8]" />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
