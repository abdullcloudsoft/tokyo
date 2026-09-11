import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { Search, MessageSquare, PhoneCall } from 'lucide-react';

interface MenuSectionProps {
  onSelectDishForOrder?: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDishForOrder }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleWhatsAppInquiry = (item: MenuItem) => {
    const text = encodeURIComponent(
      `Hello Tokyo Pan Asian Cuisine! I would like to inquire about and order: *${item.name}* (${item.category}). Please share availability and current pricing.`
    );
    window.open(`https://wa.me/923189187390?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="menu" className="py-20 bg-stone-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 bg-amber-100/60 px-3 py-1 rounded-full">
            Culinary Selection
          </span>
          <h2
            id="menu-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mt-3 mb-3"
          >
            Pan-Asian Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Crafted with authentic spices, fresh wok heat, and artisanal culinary traditions.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none flex items-center gap-1.5 p-1.5 bg-stone-200/60 rounded-2xl">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Compact Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600/40 text-stone-800 placeholder-stone-400 transition-all"
            />
          </div>
        </div>

        {/* Menu Cards Grid - Compact & Professional */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Image Container - Aspect 4:3 with exact dish food photography */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                    <span className="text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-stone-800 px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="text-[11px] font-semibold bg-amber-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                        Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                    <button
                      onClick={() => handleWhatsAppInquiry(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60 active:scale-[0.98] transition-colors"
                      title="Order or inquire on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Order on WhatsApp</span>
                    </button>

                    <a
                      href={RESTAURANT_INFO.callUrl}
                      aria-label="Call for this dish"
                      className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 active:scale-95 transition-colors"
                      title="Call 0318 9187390"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">No dishes found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-amber-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Menu Notice & Quick Order CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-stone-900">
              Want the full printed menu or daily chef specials?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Contact our team at Commercial Market Road for customized platters, family deals, and takeaway.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Menu</span>
            </a>
            <a
              href={RESTAURANT_INFO.callUrl}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-stone-600" />
              <span>0318 9187390</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
