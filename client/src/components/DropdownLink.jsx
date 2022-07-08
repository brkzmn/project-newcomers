import React from "react";
import PropTypes from "prop-types";
import "./DropdownLink.css";

const DropdownLink = ({ children, onClick }) => {
  return (
    <button className="dropdown-link" onClick={onClick}>
      {children}
    </button>
  );
};

DropdownLink.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DropdownLink;
