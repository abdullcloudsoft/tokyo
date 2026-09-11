import React from 'react';
import heroBg from '../assets/images/tokyo_hero_feast_1789129819031.jpg';
import { UtensilsCrossed, PhoneCall, ChevronDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[88vh] md:min-h-[92vh] flex flex-col justify-between items-center text-center overflow-hidden"
    >
      {/* 
        NO SHEET / NO OVERLAY:
        The hero image is completely uncovered and clean edge-to-edge.
        No white/cream sheet, no translucent layer, no glass panel, no cards, no heavy gradient.
      */}
      <img
        src={heroBg}
        alt="Tokyo Pan Asian Cuisine Culinary Feast"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
        loading="eager"
      />

      {/* Top spacing */}
      <div className="w-full pt-28 md:pt-36"></div>

      {/* Natural text sitting directly over the image with crisp contrast */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Subtle authentic Pan-Asian badge */}
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase text-white bg-black/40 backdrop-blur-[2px] border border-white/30 mb-4"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Commercial Market Road, Rawalpindi
        </span>

        {/* Hero Title */}
        <h1
          id="hero-title"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] mb-4"
          style={{
            textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 8px 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,1)'
          }}
        >
          {RESTAURANT_INFO.name}
        </h1>

        {/* Hero Subtitle */}
        <p
          id="hero-subtitle"
          className="text-lg sm:text-2xl md:text-3xl text-stone-100 font-medium tracking-wide max-w-2xl mx-auto mb-8"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 4px 18px rgba(0,0,0,0.8)'
          }}
        >
          {RESTAURANT_INFO.tagline}
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md pb-4">
          <a
            id="hero-view-menu-btn"
            href="#menu"
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-white text-stone-900 hover:bg-stone-100 transition-all duration-200 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-700" />
            <span>View Menu</span>
          </a>

          <button
            id="hero-order-now-btn"
            onClick={onOpenOrderModal}
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Order Now</span>
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="relative z-10 pb-6 text-white flex flex-col items-center">
        <a
          href="#menu"
          aria-label="Scroll to menu"
          className="flex flex-col items-center gap-1 text-white/90 hover:text-white transition-colors"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
