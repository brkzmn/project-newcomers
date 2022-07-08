import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  return (
    <ThemeProvider>
      <Router>{children}</Router>
    </ThemeProvider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
