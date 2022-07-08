import React from "react";
import "./Tags.css";
import Prototypes from "prop-types";

const Tags = ({ tags }) => {
  return (
    <div className="card-tags">
      {tags.map((interest, index) => {
        return (
          <span className="tag" key={index}>
            {interest}
          </span>
        );
      })}
    </div>
  );
};

Tags.propTypes = {
  tags: Prototypes.array.isRequired,
};

export default Tags;
