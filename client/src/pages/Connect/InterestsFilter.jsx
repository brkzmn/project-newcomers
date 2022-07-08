import React, { useState } from "react";
import Interest from "./Interest";
import InterestInput from "./InterestInput";
import InterestsDropdown from "./InterestsDropdown";
import "./InterestsFilter.css";
import PropTypes from "prop-types";

const interests = [
  "development",
  "Skiing",
  "Dutch",
  "Meditation",
  "music",
  "parties",
  "sightseeing",
  "speaking up",
  "video games",
  "Soccer",
  "Tennis",
  "bar attending",
  "dancing",
  "Table Tennis",
  "reading",
  "library attending",
];

const InterestsFilter = ({
  selectedInterests,
  onInsertInterest,
  onDeleteInterest,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [interest, setInputInterest] = useState("");

  const handleInputChange = (e) => {
    setInputInterest(e.target.value);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    if (interest.trim().length === 0) {
      setIsDropdown(false);
    }
    setIsDropdown(true);
  };

  const handleDropdownItemClick = (interest) => {
    onInsertInterest(interest);
    setInputInterest("");
    document.getElementById("interest-input").focus();
  };

  const handleInterestDelete = (interest) => {
    onDeleteInterest(interest);
  };

  const filteredInterests = interests.filter(
    (item) =>
      interest.trim().length > 0 &&
      item.trim().toLowerCase().includes(interest.toLowerCase())
  );

  return (
    <div className="interests-filter">
      <div className="interests-bar">
        {selectedInterests.length > 0 &&
          selectedInterests.map((interest, index) => {
            return (
              <Interest
                interest={interest}
                key={index}
                onDelete={handleInterestDelete}
              />
            );
          })}
        <InterestInput value={interest} onChange={handleInputChange} />
      </div>
      {isDropdown && (
        <InterestsDropdown
          interests={filteredInterests}
          onClick={handleDropdownItemClick}
        />
      )}
    </div>
  );
};

InterestsFilter.propTypes = {
  selectedInterests: PropTypes.array.isRequired,
  onInsertInterest: PropTypes.func,
  onDeleteInterest: PropTypes.func,
};

export default InterestsFilter;
