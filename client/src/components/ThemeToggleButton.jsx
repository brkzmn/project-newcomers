import React, { useContext } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { ThemeContext } from "../ThemeContext";
// eslint-disable-next-line react/prop-types
const ThemeToggleButton = ({ className, ...rest }) => {
  const { toggleFunction } = useContext(ThemeContext);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={className} {...rest}>
      <DarkModeToggle
        onChange={() => {
          toggleFunction();
        }}
        checked={isDarkMode}
        size={55}
      />
    </div>
  );
};
export default ThemeToggleButton;
