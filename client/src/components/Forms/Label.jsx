import React from "react";
import PropTypes from "prop-types";
import "./Label.css";

const Label = ({ children }) => {
  return <label className="label">{children}</label>;
};

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default Label;
