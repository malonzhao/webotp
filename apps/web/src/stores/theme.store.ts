import { create } from 'zustand';

interface ThemeState {
  getResolvedTheme: () => 'light' | 'dark';
  isSystemDark: boolean;
}

// Apply theme class to html element
const applyThemeClass = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Clear all possible theme classes, then add the correct class
  document.documentElement.classList.remove('light', 'dark');
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('light');
  }
};

// Anti-flicker initialization - apply theme before page load
const initializeTheme = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Apply theme immediately to prevent flickering
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.remove('light', 'dark');
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.add('light');
  }
};

export const useThemeStore = create<ThemeState>((set) => ({
  getResolvedTheme: () => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    set({ isSystemDark: isDark });
    return isDark ? 'dark' : 'light';
  },
  isSystemDark: false,
}));

// Listen for system theme changes and apply
if (typeof window !== 'undefined') {
  // Initialize theme immediately to prevent flickering
  initializeTheme();
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Optimized event listener
  const handleThemeChange = (event: MediaQueryListEvent) => {
    const isDark = event.matches;
    useThemeStore.getState().getResolvedTheme(); // Update state
    
    // Apply theme changes immediately
    document.documentElement.classList.remove('light', 'dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  };
  
  // Listen for theme changes
  mediaQuery.addEventListener('change', handleThemeChange);
}

export { applyThemeClass, initializeTheme };
