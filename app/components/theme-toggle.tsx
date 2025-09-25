'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/context/theme-context';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  // Check if we're on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only check for system preference on the client side
  const isDark = isMounted && 
    (theme === 'dark' || 
     (theme === 'system' && 
      window.matchMedia('(prefers-color-scheme: dark)').matches));

  if (!isMounted) {
    return (
      <button 
        className="p-2 rounded-full bg-gray-100 text-gray-600"
        aria-label="Loading theme"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
