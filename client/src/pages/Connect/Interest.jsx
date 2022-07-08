import React from "react";
import "./Interest.css";
import PropTypes from "prop-types";

const Interest = ({ interest, onDelete }) => {
  return (
    <div className="interest">
      <span className="interest-text">{interest}</span>
      <button onClick={() => onDelete(interest)} className="btn-close">
        X
      </button>
    </div>
  );
};

Interest.propTypes = {
  interest: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Interest;
