import React, { useContext } from "react";
import "./UserCard.css";
import PropTypes from "prop-types";
import { ThemeContext } from "../../ThemeContext";

const UserCard = ({ user, children, onClick, parent }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className="card"
      onClick={() => onClick(user)}
      style={{
        cursor: "pointer",
        boxShadow: !isDarkMode
          ? `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px ,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`
          : `var(--light-background) 0px 2px 5px -1px ,
      var(--light-foreground) 0px 1px 3px -1px`,
        backgroundColor: theme.background,
        width: parent === "chat" && "100%",
      }}
    >
      <div className="card-img-container">
        <img
          src={
            user.profileImage ? user.profileImage : "https://picsum.photos/200"
          }
        />
      </div>
      <div className="card-info">
        <h3 className="card-title">{`${user.firstName} ${user.lastName} | ${user.userType}`}</h3>
        <h5
          className={isDarkMode ? "card-subtitle light-text" : "card-subtitle"}
        >
          {user.province}
        </h5>
        {children}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func,
  parent: PropTypes.string,
};

export default UserCard;
