import React from "react";
import "./Check.css";
import CheckMarkSvg from "./CheckMarkSvg";
import PropTypes from "prop-types";

const Check = ({ children }) => {
  return (
    <div className="check-wrapper">
      <div className="check-icon-wrapper">
        <CheckMarkSvg />
      </div>
      <p>{children}</p>
    </div>
  );
};

Check.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Check;
