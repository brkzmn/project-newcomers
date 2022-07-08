import React from "react";
import PropTypes from "prop-types";
import "./DateTime.css";

const DateTime = ({ name, value, onChange, ...rest }) => {
  return (
    <input
      type="datetime-local"
      name={name}
      value={value}
      className={"datetime"}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
};

DateTime.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DateTime;
