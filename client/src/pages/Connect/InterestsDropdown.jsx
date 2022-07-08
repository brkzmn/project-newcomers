import React from "react";
import "./InterestsDropdown.css";
import PropTypes from "prop-types";

const InterestsDropdown = ({ interests, onClick }) => {
  return (
    <div className="interests-dd">
      {interests.map((interest, index) => {
        return (
          <div
            className="interests-dd-item"
            onClick={() => onClick(interest)}
            key={index}
          >
            {interest}
          </div>
        );
      })}
    </div>
  );
};

InterestsDropdown.propTypes = {
  interests: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default InterestsDropdown;
