import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ children, onClick, className, type, ...rest }) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
