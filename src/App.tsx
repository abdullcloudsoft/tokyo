import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenOrderModal={() => setIsOrderModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* 
          Hero Section:
          Uncovered, edge-to-edge HD 3D food visual with zero sheet, panel, or overlay.
        */}
        <Hero onOpenOrderModal={() => setIsOrderModalOpen(true)} />

        {/* Menu Section with Chinese, Thai, Japanese, Starters, Rice & Noodles, Drinks */}
        <MenuSection />

        {/* Short & Elegant About Section */}
        <AboutSection />

        {/* Compact 8-image Culinary Gallery */}
        <GallerySection />

        {/* Contact Section with Call, WhatsApp, Map Directions, Facebook & Instagram */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Quick Order / Inquiry Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* Lightweight, Unobtrusive Concierge Chatbot */}
      <Chatbot />
    </div>
  );
}
