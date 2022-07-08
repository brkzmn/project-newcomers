import React from "react";
import PropTypes from "prop-types";
import "./Select.css";

const Select = ({ value, onChange, options }) => {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => {
        return (
          <option
            className="option"
            selected={option.selected}
            value={option.value}
            key={index}
          >
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;
