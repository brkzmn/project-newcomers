import React from "react";
import "./Error.css";
import PropTypes from "prop-types";

const Error = ({ children }) => {
  return <p className="error-msg">{children}</p>;
};

Error.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Error;
