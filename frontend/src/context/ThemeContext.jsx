import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Default theme configuration
const defaultTheme = {
  colors: {
    primary: "#3d2518",
    primaryLight: "#4d2f20",
    accent: "#f59e0b",
    accentHover: "#d97706",
    background: "#fffbeb",
    backgroundAlt: "#fef3c7",
    text: "#1f2937",
    textLight: "#6b7280",
    white: "#ffffff",
    success: "#16a34a",
    error: "#dc2626"
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    headingFont: "Inter, system-ui, sans-serif",
    baseFontSize: "16px",
    h1Size: "3rem",
    h2Size: "2rem",
    h3Size: "1.5rem"
  },
  header: {
    background: "#3d2518",
    text: "#ffffff",
    navText: "#ffffff",
    navHover: "#f59e0b"
  },
  footer: {
    background: "#3d2518",
    text: "#fef3c7",
    linkColor: "#f59e0b"
  },
  buttons: {
    primaryBg: "#f59e0b",
    primaryText: "#ffffff",
    primaryHover: "#d97706",
    secondaryBg: "#3d2518",
    secondaryText: "#ffffff",
    secondaryHover: "#2d1810",
    borderRadius: "0.5rem"
  },
  cards: {
    background: "#ffffff",
    border: "#e5e7eb",
    shadow: "0 1px 3px rgba(0,0,0,0.1)",
    borderRadius: "1rem"
  }
};

export const ThemeProvider = ({ children, theme: propTheme }) => {
  const [theme, setTheme] = useState(propTheme || defaultTheme);

  // Apply CSS variables whenever theme changes
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const applyThemeToDOM = (themeConfig) => {
    const root = document.documentElement;
    
    // Colors
    if (themeConfig.colors) {
      Object.entries(themeConfig.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
    
    // Typography
    if (themeConfig.typography) {
      root.style.setProperty('--font-family', themeConfig.typography.fontFamily);
      root.style.setProperty('--heading-font', themeConfig.typography.headingFont);
      root.style.setProperty('--base-font-size', themeConfig.typography.baseFontSize);
      root.style.setProperty('--h1-size', themeConfig.typography.h1Size);
      root.style.setProperty('--h2-size', themeConfig.typography.h2Size);
      root.style.setProperty('--h3-size', themeConfig.typography.h3Size);
    }
    
    // Header
    if (themeConfig.header) {
      root.style.setProperty('--header-bg', themeConfig.header.background);
      root.style.setProperty('--header-text', themeConfig.header.text);
      root.style.setProperty('--header-nav-text', themeConfig.header.navText);
      root.style.setProperty('--header-nav-hover', themeConfig.header.navHover);
    }
    
    // Footer
    if (themeConfig.footer) {
      root.style.setProperty('--footer-bg', themeConfig.footer.background);
      root.style.setProperty('--footer-text', themeConfig.footer.text);
      root.style.setProperty('--footer-link', themeConfig.footer.linkColor);
    }
    
    // Buttons
    if (themeConfig.buttons) {
      root.style.setProperty('--btn-primary-bg', themeConfig.buttons.primaryBg);
      root.style.setProperty('--btn-primary-text', themeConfig.buttons.primaryText);
      root.style.setProperty('--btn-primary-hover', themeConfig.buttons.primaryHover);
      root.style.setProperty('--btn-secondary-bg', themeConfig.buttons.secondaryBg);
      root.style.setProperty('--btn-secondary-text', themeConfig.buttons.secondaryText);
      root.style.setProperty('--btn-secondary-hover', themeConfig.buttons.secondaryHover);
      root.style.setProperty('--btn-radius', themeConfig.buttons.borderRadius);
    }
    
    // Cards
    if (themeConfig.cards) {
      root.style.setProperty('--card-bg', themeConfig.cards.background);
      root.style.setProperty('--card-border', themeConfig.cards.border);
      root.style.setProperty('--card-shadow', themeConfig.cards.shadow);
      root.style.setProperty('--card-radius', themeConfig.cards.borderRadius);
    }
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, defaultTheme, applyThemeToDOM }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { defaultTheme };
export default ThemeContext;
