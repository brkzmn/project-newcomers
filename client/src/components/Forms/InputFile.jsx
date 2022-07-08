import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ name, value, onChange, className, ...rest }) => {
  return (
    <input
      {...rest}
      name={name}
      value={value}
      className={className}
      type="file"
      onChange={(e) => onChange(e)}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Input;
