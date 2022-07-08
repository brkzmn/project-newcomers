import React, { useContext } from "react";
import "./CreateUser.css";
import { ThemeContext } from "../../ThemeContext";
export const PasswordHint = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div
      className="hint password-hint"
      style={{
        backgroundColor: isDarkMode
          ? "var(--light-background)"
          : "var(--dark-background)",
        color: isDarkMode
          ? "var(--light-foreground)"
          : "var(--dark-foreground)",
      }}
    >
      <h3> Password Requirements:</h3>
      <ul>
        <li>Be 6 characters or longer</li>
        <li>1 lowercase alphabetical character</li>
        <li>1 uppercase alphabetical character</li>
        <li>1 numeric character</li>
        <li>1 special character(!@#$%^&)</li>
      </ul>
    </div>
  );
};
export const UserHint = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div
      className="hint userName-hint"
      style={{
        backgroundColor: isDarkMode
          ? "var(--light-background)"
          : "var(--dark-background)",
        color: isDarkMode
          ? "var(--light-foreground)"
          : "var(--dark-foreground)",
      }}
    >
      <h3> Username Requirements:</h3>
      <ul>
        <li>Minimum 3 and maximum 23 characters </li>
        <li>First character should be alphabetical</li>
        <li>Allowed special characters: [-_@.]</li>
        <li>Only numeric, alphabetical or mentioned special characters</li>
        <li>Has not used before</li>
      </ul>
    </div>
  );
};
