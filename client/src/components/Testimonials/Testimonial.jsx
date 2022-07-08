import React from "react";
import Profile from "./profile/Profile";
import "./Testimonial.css";
import PropTypes from "prop-types";

const Testimonial = ({ quote, profile }) => {
  return (
    <div className="testimonial">
      <Profile profile={profile} />
      <blockquote>{quote}</blockquote>
    </div>
  );
};

Testimonial.propTypes = {
  quote: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};

export default Testimonial;
