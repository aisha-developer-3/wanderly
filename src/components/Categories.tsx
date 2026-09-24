import React from 'react';
import { 
  Palmtree, 
  Compass, 
  Gem, 
  Building2, 
  Users, 
  Heart, 
  Ship, 
  Footprints 
} from 'lucide-react';
import { CATEGORIES } from '../data/travelData';

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palmtree': return Palmtree;
      case 'Compass': return Compass;
      case 'Gem': return Gem;
      case 'Building2': return Building2;
      case 'Users': return Users;
      case 'Heart': return Heart;
      case 'Ship': return Ship;
      case 'Footprints': return Footprints;
      default: return Compass;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = getIcon(cat.icon);
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 group cursor-pointer text-center ${
                isSelected
                  ? 'bg-teal-50 border-teal-600 shadow-sm scale-102'
                  : 'bg-white border-slate-200/80 hover:border-teal-500 hover:shadow-md'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-2.5 transition-colors duration-200 ${
                  isSelected
                    ? 'bg-teal-700 text-white'
                    : 'bg-teal-50/70 text-teal-700 group-hover:bg-teal-700 group-hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected ? 'text-teal-900 font-bold' : 'text-slate-700 group-hover:text-teal-800'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <div className="mt-4 flex items-center justify-between px-4 py-2 bg-teal-50/80 rounded-lg text-xs text-teal-900 border border-teal-100">
          <span>
            Filtering by <strong>{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</strong>
          </span>
          <button
            onClick={() => onSelectCategory(null)}
            className="text-teal-700 font-bold hover:underline"
          >
            Clear Filter
          </button>
        </div>
      )}
    </section>
  );
};
