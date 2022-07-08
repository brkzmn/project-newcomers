import React from "react";
import PropTypes from "prop-types";
import "./InputFieldContainer.css";

const InputFieldContainer = ({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`input-field-container ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

InputFieldContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default InputFieldContainer;
