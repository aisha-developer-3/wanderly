import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenDeals: () => void;
  onOpenBookNow: () => void;
  user: { name: string; email: string; avatar?: string } | null;
  onSignOut: () => void;
  onQuickSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  onOpenWishlist,
  onOpenAuth,
  onOpenDeals,
  onOpenBookNow,
  user,
  onSignOut,
  onQuickSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'packages', label: 'Packages' },
    { id: 'flights', label: 'Flights' },
    { id: 'deals', label: 'Deals', isAction: true },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (link: { id: string; label: string; isAction?: boolean }) => {
    if (link.id === 'deals') {
      onOpenDeals();
    } else {
      setActiveTab(link.id);
      const element = document.getElementById(link.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Lockup matching mockup */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-teal-700 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-200">
              <Compass className="w-6 h-6 stroke-[2.2] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-slate-900 leading-none">
                WANDERLY
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 font-medium mt-1">
                Travel. Explore. Live.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id && link.id !== 'deals';
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`relative py-1 transition-colors hover:text-teal-700 font-medium ${
                    isActive ? 'text-teal-700 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: Search, Wishlist, Sign In, Book Now */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={onQuickSearchClick}
              aria-label="Search destinations"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-600 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button with Counter */}
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-600 transition-colors relative"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-teal-600 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-700 text-white font-semibold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full">
                        Gold Traveler
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-slate-400" />
                      My Saved Stays ({wishlistCount})
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDeals();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Exclusive Deals
                    </button>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Book Now Button (Orange Highlight) */}
            <button
              onClick={onOpenBookNow}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#E8633A] hover:from-[#d65d40] hover:to-[#d6532b] rounded-lg shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenWishlist}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 relative"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === link.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                <button
                  onClick={onSignOut}
                  className="text-xs text-red-600 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookNow();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-[#E76F51] to-[#E8633A] rounded-lg shadow-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
