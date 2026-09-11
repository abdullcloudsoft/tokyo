import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Phone,
  MessageSquare,
  MapPin,
  Utensils,
  Bot,
  User,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ChatMessage } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Welcome to ${RESTAURANT_INFO.name}! 🥢 How can I assist you with our menu, location on Commercial Market Road, or placing an order today?`,
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'View Menu', action: 'menu' },
        { label: 'Location & Map', action: 'directions' },
        { label: 'Call 0318 9187390', action: 'call' },
        { label: 'WhatsApp Order', action: 'whatsapp' },
      ],
    },
  ]);

  const quickPrompts = [
    'Where is the restaurant located?',
    'What cuisines do you serve?',
    'How do I place an order?',
    'Do you have sushi and wok noodles?',
    'What are your opening hours?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Fast, intelligent local response engine ensuring instant answers
  const getLocalResponse = (query: string): { text: string; actions?: ChatMessage['suggestedActions'] } => {
    const q = query.toLowerCase();

    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('direction') || q.includes('situated') || q.includes('rawalpindi')) {
      return {
        text: `We are located on Commercial Market Road, Satellite Town, Rawalpindi. We're open daily from 12:00 PM to 12:00 AM. You can easily find us via Google Maps!`,
        actions: [{ label: 'Get Directions', action: 'directions' }],
      };
    }

    if (q.includes('call') || q.includes('phone') || q.includes('number') || q.includes('contact') || q.includes('email')) {
      return {
        text: `You can call us directly at 0318 9187390 or email tokyopanasiancuisine3@gmail.com. We are also available on WhatsApp!`,
        actions: [
          { label: 'Call Now (0318 9187390)', action: 'call' },
          { label: 'Chat on WhatsApp', action: 'whatsapp' },
        ],
      };
    }

    if (q.includes('order') || q.includes('delivery') || q.includes('takeaway') || q.includes('parcel') || q.includes('dine')) {
      return {
        text: `You can order for dine-in, takeaway, or direct delivery by messaging us on WhatsApp or calling our staff directly at 0318 9187390!`,
        actions: [
          { label: 'WhatsApp Order', action: 'whatsapp' },
          { label: 'Call 0318 9187390', action: 'call' },
        ],
      };
    }

    if (q.includes('cuisine') || q.includes('food') || q.includes('serve') || q.includes('menu') || q.includes('category') || q.includes('categories')) {
      return {
        text: `Tokyo Pan Asian Cuisine serves authentic Chinese, Thai, and Japanese specialties, along with crispy Asian Starters, high-heat Wok Rice & Noodles, and artisan chilled drinks.`,
        actions: [{ label: 'View Menu Section', action: 'menu' }],
      };
    }

    if (q.includes('sushi') || q.includes('maki') || q.includes('japanese') || q.includes('sashimi')) {
      return {
        text: `Yes! We feature fresh artisan Japanese Sushi rolls, Salmon Maki, and Nigiri crafted with seasoned sushi rice and authentic nori.`,
        actions: [{ label: 'Order Sushi on WhatsApp', action: 'whatsapp' }],
      };
    }

    if (q.includes('noodle') || q.includes('chowmein') || q.includes('rice') || q.includes('wok')) {
      return {
        text: `Yes! Our signature high-heat wok-tossed noodles and classic Asian wok fried rice are crowd favorites tossed with fresh vegetables and rich savory reduction.`,
        actions: [{ label: 'Explore Noodles', action: 'menu' }],
      };
    }

    if (q.includes('hour') || q.includes('open') || q.includes('timing') || q.includes('time') || q.includes('close')) {
      return {
        text: `We are open daily from 12:00 PM to 12:00 AM (midnight) for dine-in, takeaway, and delivery orders.`,
        actions: [{ label: 'Call Restaurant', action: 'call' }],
      };
    }

    if (q.includes('thai') || q.includes('curry') || q.includes('tom yum')) {
      return {
        text: `Our Thai specialties include rich, fragrant Thai Green Curry in authentic coconut milk and classic spicy-sour Tom Yum soup with lemongrass and lime!`,
        actions: [{ label: 'View Thai Selection', action: 'menu' }],
      };
    }

    // Default friendly answer
    return {
      text: `Tokyo Pan Asian Cuisine is located on Commercial Market Road, Satellite Town, Rawalpindi. We offer fresh Japanese Sushi, Chinese Wok, Thai Curries, and Noodles. Call 0318 9187390 or order via WhatsApp for quick assistance!`,
      actions: [
        { label: 'WhatsApp Us', action: 'whatsapp' },
        { label: 'Call 0318 9187390', action: 'call' },
      ],
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Check if server endpoint responds, otherwise fall back instantaneously to local smart response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const assistantMsg: ChatMessage = {
            id: `asst-${Date.now()}`,
            sender: 'assistant',
            text: data.reply,
            timestamp: 'Just now',
            suggestedActions: data.actions || [
              { label: 'Call 0318 9187390', action: 'call' },
              { label: 'WhatsApp', action: 'whatsapp' },
            ],
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Endpoint fallback
    }

    // Smart Local Fallback
    setTimeout(() => {
      const local = getLocalResponse(query);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: local.text,
        timestamp: 'Just now',
        suggestedActions: local.actions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 250);
  };

  const handleActionClick = (action: string) => {
    if (action === 'call') {
      window.location.href = RESTAURANT_INFO.callUrl;
    } else if (action === 'whatsapp') {
      window.open(RESTAURANT_INFO.whatsappUrl, '_blank', 'noopener,noreferrer');
    } else if (action === 'directions') {
      window.open(RESTAURANT_INFO.googleMapsUrl, '_blank', 'noopener,noreferrer');
    } else if (action === 'menu') {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="chatbot-open-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open Tokyo Pan Asian Chatbot"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-stone-900 text-white hover:bg-amber-700 shadow-xl border border-stone-800 transition-all duration-200 active:scale-95"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-stone-900"></span>
          </div>
          <span className="text-xs font-bold tracking-wide">Tokyo Assistant</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="w-[90vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-serif text-sm font-bold shadow-xs">
                東
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight font-display">
                  Tokyo Pan Asian Concierge
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Commercial Market Rd, Rawalpindi</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-amber-700 text-white rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {/* Suggested action buttons */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(action.action)}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 hover:text-amber-800 text-stone-700 transition-colors border border-stone-200/60"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-stone-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-stone-400 pl-8">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] text-stone-600 hover:text-stone-900 bg-white px-2.5 py-1 rounded-full border border-stone-200 hover:border-amber-600 shrink-0 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about menu, location, orders..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-600 text-stone-800 placeholder-stone-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Send message"
              className="p-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
