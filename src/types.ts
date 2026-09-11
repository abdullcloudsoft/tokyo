export interface MenuItem {
  id: string;
  name: string;
  category: 'Chinese' | 'Thai' | 'Japanese' | 'Asian Starters' | 'Rice & Noodles' | 'Drinks';
  description: string;
  image: string;
  popular?: boolean;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    action: 'call' | 'whatsapp' | 'directions' | 'menu';
    value?: string;
  }[];
}
