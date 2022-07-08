import React from "react";
import PropTypes from "prop-types";
import "./MemberInfo.css";

const MemberInfo = ({ member }) => {
  return (
    <section className="member-info">
      <h2 className="member-name">{member.name}</h2>
      <h3 className="member-occupation">{member.occupation}</h3>
      <p className="member-description">{member.description}</p>
      <div className="social">
        <a href={member.github} target={"_blank"} rel="noreferrer">
          Github
        </a>
        <a href={member.linkedin} target={"_blank"} rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
};

MemberInfo.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MemberInfo;
