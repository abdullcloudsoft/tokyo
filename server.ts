import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error('Failed to initialize Gemini AI:', e);
    }
  }
  return aiClient;
}

// System instructions for Tokyo Pan Asian Cuisine
const RESTAURANT_SYSTEM_PROMPT = `
You are the virtual culinary host for "Tokyo Pan Asian Cuisine", a premier restaurant located on Commercial Market Road, Satellite Town, Rawalpindi, Pakistan.
Details:
- Address: Commercial Market Road, Satellite Town, Rawalpindi
- Phone / WhatsApp: 0318 9187390
- Email: tokyopanasiancuisine3@gmail.com
- Social: Facebook (https://www.facebook.com/p/TOKYO-61576789112697/) & Instagram (@tokyopanasian)
- Hours: Open daily from 12:00 PM to 12:00 AM (midnight)
- Cuisines: Authentic Pan-Asian including Japanese (Sushi, Sashimi, Maki), Thai (Green Curry, Tom Yum), Chinese (Wok specials, Szechuan, Dim Sum), Asian Starters (Spring rolls, Gyoza), Rice & Noodles (Wok-tossed noodles, Fried rice), and Artisan Chilled Drinks.
- Services: Dine-in, Takeaway, and Delivery orders.
- Ordering: Call 0318 9187390 or order via WhatsApp.
Instructions:
- Keep your answers concise, hospitable, and accurate (1-3 sentences maximum).
- Never make up specific prices; invite customers to inquire via WhatsApp (0318 9187390) for daily specials and current rates.
- Always remain warm, polite, and helpful.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'Tokyo Pan Asian Cuisine' });
});

// Chatbot API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getAIClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: message,
          config: {
            systemInstruction: RESTAURANT_SYSTEM_PROMPT,
            temperature: 0.7,
            maxOutputTokens: 250,
          },
        });

        const reply = response.text || "I'd be happy to assist you with our menu and reservations at Tokyo Pan Asian Cuisine on Commercial Market Road, Rawalpindi! Call 0318 9187390 or message us on WhatsApp.";
        res.json({ reply });
        return;
      } catch (err) {
        console.error('Gemini error, using smart fallback:', err);
      }
    }

    // Default smart fallback if no API key or network error
    const lower = message.toLowerCase();
    let reply = `Welcome to Tokyo Pan Asian Cuisine on Commercial Market Road, Satellite Town, Rawalpindi! We offer authentic Japanese, Thai, and Chinese culinary specialties. For orders or inquiries, please call us at 0318 9187390 or message us on WhatsApp.`;

    if (lower.includes('location') || lower.includes('where') || lower.includes('address')) {
      reply = `We are located on Commercial Market Road, Satellite Town, Rawalpindi. Open daily 12:00 PM – 12:00 AM.`;
    } else if (lower.includes('phone') || lower.includes('call') || lower.includes('contact')) {
      reply = `You can call us directly at 0318 9187390 or email tokyopanasiancuisine3@gmail.com.`;
    } else if (lower.includes('menu') || lower.includes('food') || lower.includes('sushi') || lower.includes('noodle')) {
      reply = `Our menu highlights Japanese sushi & sashimi, wok noodles, Chinese stir-fries, fragrant Thai curries, and refreshing coolers. You can explore the menu section above or message us on WhatsApp for daily specials!`;
    } else if (lower.includes('order')) {
      reply = `You can place a takeaway or delivery order instantly via WhatsApp or by calling 0318 9187390!`;
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tokyo Pan Asian Cuisine server running on port ${PORT}`);
  });
}

start();
