/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import "./Message.css";
import PropTypes from "prop-types";
import { Buffer } from "buffer";
import { ThemeContext } from "../../ThemeContext";
export const Message = ({ message, align, currentUser, receiver }) => {
  const { theme } = useContext(ThemeContext);
  const messageTimestamp =
    currentUser && currentUser._id === message.sender
      ? `You at ${new Date(message.createdAt).toLocaleString()} to ${
          receiver.userName
        }`
      : `${receiver.userName} at ${new Date(
          message.createdAt
        ).toLocaleString()}`;

  return (
    <div
      className={`message-container ${align} dark-shadow-l`}
      style={{ color: theme.foreground, backgroundColor: theme.background }}
    >
      <img
        src={
          currentUser &&
          currentUser.profileImage &&
          currentUser._id === message.sender
            ? currentUser.profileImage
            : receiver && receiver.profileImage
            ? receiver.profileImage
            : "https://picsum.photos/200"
        }
        alt={message.sender.firstName}
      />
      <div className="message-info">
        <span>
          {message && <em className="message-timestamp">{messageTimestamp}</em>}
        </span>
        <span className="message-text">{message.body}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  receiver: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  align: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
};
