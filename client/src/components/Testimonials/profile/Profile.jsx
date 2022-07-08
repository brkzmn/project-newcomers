import React from "react";
import "./Profile.css";
import PropTypes from "prop-types";

const Profile = ({ profile }) => {
  return (
    <div className="profile">
      <img src={profile.url} alt={profile.name} />
      <div className="profile-text">
        <div>
          <h3>{profile.name}</h3>
        </div>
        <em>{profile.occupation}</em>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
