import React from 'react';
import { MapPin, Utensils, Flame, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-amber-800 bg-amber-50 border border-amber-200/50 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>About Us</span>
            </div>

            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-6"
            >
              Pan-Asian Dining on Commercial Market Road
            </h2>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-4">
              <strong className="text-stone-900 font-semibold">{RESTAURANT_INFO.name}</strong> is a specialized Pan-Asian restaurant located on Commercial Market Road, Satellite Town, Rawalpindi.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-8">
              We bring together the rich, authentic culinary traditions of Japan, Thailand, and China under one roof. Every dish is prepared with fresh ingredients, precise seasoning, and respect for classic Asian wok cooking and sushi artistry to deliver an appetizing and memorable dining experience.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-2.5">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">Wok Craft</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  High-heat wok cooking preserving crisp textures and rich aromas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-2.5">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">Authentic Flavors</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Classic recipes spanning Chinese, Thai, and Japanese cuisine.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-2.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">Prime Location</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Conveniently situated in Satellite Town, Rawalpindi.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image / Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=900&auto=format&fit=crop"
                alt="Pan-Asian Dining and Fresh Cooking at Tokyo Pan Asian Cuisine"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-stone-200 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">Visit Us</h4>
                    <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                      {RESTAURANT_INFO.address}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Daily: 12:00 PM – 12:00 AM • Dine-in & Takeaway
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
