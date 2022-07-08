import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ name, value, onChange, ...rest }) => {
  return (
    <input
      {...rest}
      name={name}
      value={value}
      className={"input"}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
