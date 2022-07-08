import React, { useEffect } from "react";
import "./InterestInput.css";
import PropTypes from "prop-types";

const InterestInput = ({ onChange, value }) => {
  useEffect(() => {
    const input = document.getElementById("interest-input");
    input.focus();
  }, []);
  return (
    <input
      type={"text"}
      id="interest-input"
      name="interest"
      value={value}
      onChange={onChange}
      placeholder="type here.."
    />
  );
};

InterestInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default InterestInput;
