import React, { useState } from 'react';
import { Search, Sun, Moon, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useApp } from '../context/AppContext';

export const UtilityBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, increaseFontSize, decreaseFontSize, fontSize } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div className="bg-blue-900 text-white py-1">
      <div className="container mx-auto px-4 max-w-none">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-sm hidden sm:inline">Accessibility:</span>
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={decreaseFontSize}
                aria-label="Decrease text size"
                className="text-white hover:bg-blue-800 h-6 px-2"
                disabled={fontSize <= 12}
              >
                <span className="text-xs">A-</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseFontSize}
                aria-label="Increase text size"
                className="text-white hover:bg-blue-800 h-6 px-2"
                disabled={fontSize >= 18}
              >
                <span className="text-xs">A+</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className="text-white hover:bg-blue-800 h-6 px-2"
              >
                {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-6 text-xs w-32 sm:w-48 bg-blue-800 border-blue-700 text-white placeholder-blue-200"
              aria-label="Search the portal"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-800 h-6 px-2"
              aria-label="Submit search"
            >
              <Search className="h-3 w-3" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};