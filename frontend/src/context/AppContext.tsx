import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, ChatMessage } from '../types';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  isChatOpen: boolean;
  chatMessages: ChatMessage[];
  fontSize: number;
  login: (user: User) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  toggleChat: () => void;
  addChatMessage: (message: ChatMessage) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you navigate the college portal. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    // Load preferences from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedFontSize = localStorage.getItem('fontSize');
    const savedUser = localStorage.getItem('user');

    if (savedDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
      document.documentElement.style.setProperty('--font-size', `${savedFontSize}px`);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const increaseFontSize = () => {
    if (fontSize < 18) {
      const newSize = fontSize + 1;
      setFontSize(newSize);
      localStorage.setItem('fontSize', newSize.toString());
      document.documentElement.style.setProperty('--font-size', `${newSize}px`);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      const newSize = fontSize - 1;
      setFontSize(newSize);
      localStorage.setItem('fontSize', newSize.toString());
      document.documentElement.style.setProperty('--font-size', `${newSize}px`);
    }
  };

  const value: AppContextType = {
    user,
    isAuthenticated: user !== null,
    isDarkMode,
    isChatOpen,
    chatMessages,
    fontSize,
    login,
    logout,
    toggleDarkMode,
    toggleChat,
    addChatMessage,
    increaseFontSize,
    decreaseFontSize,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};