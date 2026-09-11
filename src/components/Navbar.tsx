import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="navbar-brand"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-stone-900 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            東
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-tight">
              TOKYO
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-700">
              Pan Asian Cuisine
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Desktop Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              id={`nav-link-${link.name.toLowerCase()}`}
              className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action & Phone */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={RESTAURANT_INFO.callUrl}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            title="Call Restaurant"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>0318 9187390</span>
          </a>

          <button
            id="nav-order-now-btn"
            onClick={onOpenOrderModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all shadow-md shadow-amber-600/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Now</span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenOrderModal}
            aria-label="Order Now"
            className="p-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 active:scale-95 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2.5 rounded-lg text-stone-800 hover:bg-stone-100 active:bg-stone-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-white border-b border-stone-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-stone-800 hover:bg-stone-50 hover:text-amber-700 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-stone-600">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>0318 9187390</span>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
