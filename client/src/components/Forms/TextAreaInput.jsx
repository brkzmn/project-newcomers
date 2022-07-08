import React from "react";
import PropTypes from "prop-types";
import "./TextAreaInput.css";

const TextAreaInput = ({ name, value, onChange, ...rest }) => {
  return (
    <textarea
      {...rest}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={"textarea"}
      cols="30"
      rows="10"
    ></textarea>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaInput;
