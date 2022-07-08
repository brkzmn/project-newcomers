/* eslint-disable react/prop-types */
import React, { useState } from "react";
import useUserDetails from "../../hooks/useUserDetails";
import Button from "../../components/Button";
import { RiSendPlaneFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import InputEmoji from "react-input-emoji";

const MessageBox = ({ receiver, performFetch, socket }) => {
  const [value, setValue] = useState("");
  const { userDetails } = useUserDetails();
  const postMessage = (e) => {
    e.preventDefault();

    if (!value) return;
    if (userDetails && receiver) {
      const message = {
        body: value,
        sender: userDetails._id,
        receiver: receiver._id,
      };
      socket.emit("message", message);
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message }),
        credentials: "include",
      });

      setValue("");
    }
  };

  return (
    <IconContext.Provider
      value={{
        size: "1.7rem",
        className: "react-chat-icon",
      }}
    >
      <form onSubmit={postMessage}>
        <div className="chat-input-container">
          <InputEmoji
            type="text"
            id="chat-message"
            name="chat-message"
            cleanOnEnter
            placeholder="type here... "
            value={value}
            onChange={setValue}
            className="chat-input"
          />
          <div className="btn-send-container">
            <Button id="send-btn" className="btn-block" type="submit">
              <RiSendPlaneFill />
            </Button>
          </div>
        </div>
      </form>
    </IconContext.Provider>
  );
};
export default MessageBox;
