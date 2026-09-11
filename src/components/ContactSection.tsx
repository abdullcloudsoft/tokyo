import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 bg-amber-100/60 px-3 py-1 rounded-full">
            Connect With Us
          </span>
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mt-3 mb-3"
          >
            Visit & Contact
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            We look forward to serving you at our restaurant in Satellite Town, Rawalpindi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-6 bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              {/* Brand Title */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Pan-Asian Restaurant
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  {RESTAURANT_INFO.name}
                </h3>
              </div>

              {/* Information Rows */}
              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                      Address
                    </span>
                    <p className="text-sm sm:text-base font-medium text-stone-900 leading-snug mt-0.5">
                      Commercial Market Road,
                      <br />
                      Satellite Town, Rawalpindi
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <a
                      href={RESTAURANT_INFO.callUrl}
                      className="text-sm sm:text-base font-bold text-amber-700 hover:text-amber-800 transition-colors mt-0.5 inline-block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                      Email
                    </span>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-sm sm:text-base font-medium text-stone-800 hover:text-amber-700 transition-colors mt-0.5 inline-block break-all"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                      Operating Hours
                    </span>
                    <p className="text-sm font-medium text-stone-900 mt-0.5">
                      {RESTAURANT_INFO.hours}
                    </p>
                    <p className="text-xs text-stone-500">
                      Dine-in, Takeaway & Delivery Orders
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Call Now, WhatsApp, Get Directions */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200">
                <a
                  id="contact-call-now-btn"
                  href={RESTAURANT_INFO.callUrl}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  id="contact-whatsapp-btn"
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  id="contact-get-directions-btn"
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 active:scale-[0.98] transition-all"
                >
                  <Navigation className="w-4 h-4 text-stone-700" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Follow Our Socials:
                </span>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    id="social-facebook-link"
                    href={RESTAURANT_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
                    aria-label="Facebook Page"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>

                  {/* Instagram */}
                  <a
                    id="social-instagram-link"
                    href={RESTAURANT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20 transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map & Directions Card */}
          <div className="lg:col-span-6 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs flex flex-col">
            <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Satellite Town, Rawalpindi
                  </h4>
                  <p className="text-xs text-stone-500">
                    Commercial Market Road location
                  </p>
                </div>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Interactive Visual Map */}
            <div className="relative flex-1 min-h-[320px] w-full bg-stone-200 overflow-hidden">
              <iframe
                title="Tokyo Pan Asian Cuisine Rawalpindi Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13289.43169824675!2d73.064115!3d33.636845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94e240fa9767%3A0x6b44a72d7f8d689!2sCommercial%20Market%20Rd%2C%20Satellite%20Town%2C%20Rawalpindi!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <span>📍 Easy access via Commercial Market & Murree Road</span>
              <a
                href={RESTAURANT_INFO.callUrl}
                className="font-semibold text-amber-800 hover:underline"
              >
                Need help finding us? Call 0318 9187390
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
