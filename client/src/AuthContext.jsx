import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { getCookie } from "./util/getCookie";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const logout = (cb) => {
    setIsAuthenticated(isUserAuthenticated());
    cb();
  };

  const login = (cb) => {
    setIsAuthenticated(isUserAuthenticated());
    cb();
  };

  const isUserAuthenticated = () => {
    const userStatus = getCookie("userStatus");

    return userStatus !== "";
  };

  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
