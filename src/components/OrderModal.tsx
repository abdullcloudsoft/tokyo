import React, { useState } from 'react';
import { X, MessageSquare, PhoneCall, ShoppingBag, MapPin, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [orderType, setOrderType] = useState<'Takeaway' | 'Delivery' | 'Dine-In'>('Takeaway');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const greeting = `Hello Tokyo Pan Asian Cuisine!`;
    const details = [
      greeting,
      `*Order/Inquiry Request*`,
      customerName ? `Name: ${customerName}` : '',
      `Type: ${orderType}`,
      notes ? `Dishes / Inquiries: ${notes}` : 'I would like to see your menu and place an order.',
      `Location: Commercial Market Road, Satellite Town, Rawalpindi`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/923189187390?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-amber-700 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Order & Inquire</h3>
              <p className="text-xs text-amber-200/90">{RESTAURANT_INFO.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 mb-5">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Commercial Market Road, Satellite Town, Rawalpindi</span>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-4">
            {/* Order Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Service Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Takeaway', 'Delivery', 'Dine-In'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      orderType === type
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Your Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Abdullah"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600/40"
              />
            </div>

            {/* Dishes / Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Dishes or Special Request
              </label>
              <textarea
                rows={3}
                placeholder="e.g., Artisan Sushi Platter, Wok-tossed noodles, Thai Green Curry..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600/40 resize-none"
              ></textarea>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp (0318 9187390)</span>
              </button>

              <a
                href={RESTAURANT_INFO.callUrl}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>Call Directly: 0318 9187390</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
