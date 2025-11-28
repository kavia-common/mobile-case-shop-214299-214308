import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UIContext = createContext();

/**
 * PUBLIC_INTERFACE
 * UIProvider
 * Provides UI preferences like theme to the app.
 */
export function UIProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
  }), [theme]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useUI
 * Hook to access UI state.
 */
export function useUI() {
  return useContext(UIContext);
}
