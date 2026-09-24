import React, { useState } from 'react';
import { 
  Compass, 
  Send, 
  CheckCircle2,
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter
} from 'lucide-react';

interface FooterProps {
  onSelectDestinationName: (name: string) => void;
  onOpenDeals: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectDestinationName,
  onOpenDeals,
  onNavigateSection,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const topDestinations = ['Dubai', 'Bali', 'Maldives', 'Paris', 'London'];

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-100">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-teal-700 flex items-center justify-center text-teal-700">
                <Compass className="w-5 h-5 stroke-[2.2] -rotate-45" />
              </div>
              <div>
                <span className="text-lg font-black tracking-wider text-slate-900 leading-none">
                  WANDERLY
                </span>
                <p className="text-[9px] tracking-wider text-slate-400 font-medium">
                  Travel. Explore. Live.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Plan your perfect trip with ease. Discover places, stay in comfort, and create memories for life.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-600 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-600 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-600 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-700 hover:border-teal-600 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact Us'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateSection(item.toLowerCase().replace(' ', '-'))}
                    className="hover:text-teal-800 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              {['Help Center', 'FAQs', 'Booking Guide', 'Cancellation', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateSection('support')}
                    className="hover:text-teal-800 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              {topDestinations.map((dest) => (
                <li key={dest}>
                  <button
                    onClick={() => onSelectDestinationName(dest)}
                    className="hover:text-teal-800 transition-colors"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="lg:col-span-1 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Subscribe to our newsletter
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get exclusive deals & travel inspiration straight to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>You're on the list! Check your inbox for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-3 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-teal-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Wanderly. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-slate-600">Terms of Use</button>
            <span aria-hidden="true">·</span>
            <button className="hover:text-slate-600">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button className="hover:text-slate-600">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
