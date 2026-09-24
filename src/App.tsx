import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchBox } from './components/SearchBox';
import { Categories } from './components/Categories';
import { PopularDestinations } from './components/PopularDestinations';
import { FeaturedHotels } from './components/FeaturedHotels';
import { TravelPackages } from './components/TravelPackages';
import { PromoBanner } from './components/PromoBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';

// Modals and Drawers
import { HotelDetailModal } from './components/HotelDetailModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { DealsModal } from './components/DealsModal';
import { DestinationModal } from './components/DestinationModal';
import { FlightSearchResults } from './components/FlightSearchResults';

import { 
  POPULAR_DESTINATIONS, 
  FEATURED_HOTELS, 
  TRAVEL_PACKAGES, 
  Hotel, 
  TravelPackage, 
  Destination,
  FlightOption 
} from './data/travelData';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  // Navigation & Search State
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [activeSearchType, setActiveSearchType] = useState<'hotels' | 'flights' | 'packages'>('hotels');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Initial wishlist with 3 items matching mockup counter
  const [wishlist, setWishlist] = useState<string[]>(['hotel-1', 'hotel-2', 'hotel-4']);

  // User State (can be null or logged in)
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@wanderly.com',
  });

  // Modal states
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [isFlightSearchOpen, setIsFlightSearchOpen] = useState(false);

  // Toast Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Toggle wishlist
  const handleToggleWishlist = (hotelId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(hotelId);
      if (exists) {
        showToast('Removed from saved stays');
        return prev.filter((id) => id !== hotelId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, hotelId];
      }
    });
  };

  // Filtered hotels based on query & category
  const filteredHotels = useMemo(() => {
    return FEATURED_HOTELS.filter((hotel) => {
      const matchQuery =
        !destinationQuery ||
        hotel.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(destinationQuery.toLowerCase()) ||
        hotel.destinationId.toLowerCase().includes(destinationQuery.toLowerCase());

      const matchCat =
        !selectedCategory || hotel.category === selectedCategory;

      return matchQuery && matchCat;
    });
  }, [destinationQuery, selectedCategory]);

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    if (!selectedCategory) return POPULAR_DESTINATIONS;
    return POPULAR_DESTINATIONS.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  // Wishlisted hotels objects
  const wishlistedHotels = useMemo(() => {
    return FEATURED_HOTELS.filter((h) => wishlist.includes(h.id));
  }, [wishlist]);

  // Search Action
  const handlePerformSearch = (params: {
    type: 'hotels' | 'flights' | 'packages';
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
  }) => {
    if (params.type === 'flights') {
      setIsFlightSearchOpen(true);
    } else if (params.type === 'packages') {
      const element = document.getElementById('packages');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById('hotels');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      showToast(`Showing hotels for "${params.destination || 'All Destinations'}"`);
    }
  };

  // Quick book handler
  const handleBookNowCTA = () => {
    setSelectedHotel(FEATURED_HOTELS[0]);
  };

  // Quick search button in navbar
  const handleQuickSearchClick = () => {
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-teal-600 selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Navigation */}
      <Navbar
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDeals={() => setIsDealsOpen(true)}
        onOpenBookNow={handleBookNowCTA}
        user={user}
        onSignOut={() => {
          setUser(null);
          showToast('Signed out successfully');
        }}
        onQuickSearchClick={handleQuickSearchClick}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Travel Search Component */}
        <SearchBox
          activeSearchType={activeSearchType}
          setActiveSearchType={setActiveSearchType}
          destinationQuery={destinationQuery}
          setDestinationQuery={setDestinationQuery}
          onPerformSearch={handlePerformSearch}
        />

        {/* 4. Travel Categories */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            if (catId) {
              const element = document.getElementById('hotels');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* 5. Popular Destinations */}
        <PopularDestinations
          destinations={filteredDestinations.length > 0 ? filteredDestinations : POPULAR_DESTINATIONS}
          onSelectDestination={(dest) => setSelectedDest(dest)}
          onViewAllClick={() => {
            setSelectedCategory(null);
            setDestinationQuery('');
            const element = document.getElementById('destinations');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Featured Hotels */}
        <FeaturedHotels
          hotels={filteredHotels.length > 0 ? filteredHotels : FEATURED_HOTELS}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onSelectHotel={(hotel) => setSelectedHotel(hotel)}
          onViewAllHotels={() => {
            setSelectedCategory(null);
            setDestinationQuery('');
            showToast('Showing all featured hotels');
          }}
        />

        {/* 7. Top Travel Packages */}
        <TravelPackages
          packages={TRAVEL_PACKAGES}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onViewAllPackages={() => {
            const element = document.getElementById('packages');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. Promotional Banner */}
        <PromoBanner
          onExploreDeals={() => setIsDealsOpen(true)}
        />

        {/* 9. Why Travelers Choose Wanderly */}
        <WhyChooseUs />

      </main>

      {/* 10. Footer */}
      <Footer
        onSelectDestinationName={(name) => {
          setDestinationQuery(name);
          const element = document.getElementById('hotels');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
          showToast(`Filtered hotels for ${name}`);
        }}
        onOpenDeals={() => setIsDealsOpen(true)}
        onNavigateSection={(sec) => {
          const element = document.getElementById(sec);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals and Interactive Drawers */}
      <HotelDetailModal
        hotel={selectedHotel}
        onClose={() => setSelectedHotel(null)}
        isWishlisted={selectedHotel ? wishlist.includes(selectedHotel.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onCompleteBooking={(details) => {
          showToast(`Reservation confirmed: Ref ${details.ref}`);
        }}
      />

      <PackageDetailModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onCompleteBooking={(details) => {
          showToast(`Package confirmed: Ref ${details.ref}`);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedHotels={wishlistedHotels}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectHotel={(hotel) => {
          setIsWishlistOpen(false);
          setSelectedHotel(hotel);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSignInSuccess={(signedInUser) => {
          setUser(signedInUser);
          showToast(`Welcome back, ${signedInUser.name}!`);
        }}
      />

      <DealsModal
        isOpen={isDealsOpen}
        onClose={() => setIsDealsOpen(false)}
        onSelectDeal={(code) => {
          showToast(`Promo code ${code} copied!`);
        }}
      />

      <DestinationModal
        destination={selectedDest}
        onClose={() => setSelectedDest(null)}
        onViewStays={(destName) => {
          setDestinationQuery(destName);
          const element = document.getElementById('hotels');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
          showToast(`Viewing stays in ${destName}`);
        }}
      />

      {isFlightSearchOpen && (
        <FlightSearchResults
          onClose={() => setIsFlightSearchOpen(false)}
          destinationFilter={destinationQuery}
          onBookFlight={(flight) => {
            showToast(`Booked ${flight.airline} flight to ${flight.to}!`);
          }}
        />
      )}

    </div>
  );
}
