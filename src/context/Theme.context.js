import React, { createContext, useState } from "react";

const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const ThemeContext = createContext({
  theme: window.__theme || THEMES.LIGHT,
  themeToggler: () => null,
  THEMES: THEMES,
});

function ThemeContextProvider({ children }) {
  const localTheme = window.__theme;
  const [theme, setTheme] = useState(localTheme || THEMES.LIGHT);
  const themeToggler = () => {
    const selectedTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(selectedTheme);
    window.__setPreferredTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeToggler, THEMES: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
