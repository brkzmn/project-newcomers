import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext(null);
// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const themes = {
    light: {
      foreground: "#333333",
      background: "#eeeeee",
    },
    dark: {
      foreground: "#EEEEEE",
      background: "#222222",
    },
  };
  function getInitialIsDark() {
    const isDarkMode = localStorage.getItem("isDarkMode");
    return isDarkMode ? JSON.parse(isDarkMode) : false;
  }
  const [isDarkMode, setIsDarkMode] = useState(getInitialIsDark);
  const toggleFunction = () => {
    setIsDarkMode((prevState) => !prevState);
    !isDarkMode ? setTheme(themes.dark) : setTheme(themes.light);
  };
  function getInitialTheme() {
    const theme = localStorage.getItem("theme");
    return theme ? JSON.parse(theme) : {};
  }
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme, isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{ themes, theme, toggleFunction, isDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
