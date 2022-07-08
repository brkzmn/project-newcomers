import React, { useState, useEffect, useContext } from "react";
import "./Chat.css";
import { useLocation, useParams } from "react-router-dom";
import useUserDetails from "../../hooks/useUserDetails";
import RecentConnections from "../../components/RecentConnections/RecentConnections";
import { Message } from "./Message";
import useFetch from "../../hooks/useFetch";
import { logInfo } from "../../../../server/src/util/logging.js";
import { Buffer } from "buffer";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import MessageBox from "./MessageBox";
import { SocketContext } from "../../SocketContext";
import { ThemeContext } from "../../ThemeContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useLocation();
  const receiver = state.receiver;
  const { userDetails } = useUserDetails();
  const userId = state.userId;
  const { refId } = useParams();
  const receiverId = refId;
  const { isDarkMode } = useContext(ThemeContext);
  const { socket } = useContext(SocketContext);
  const onGetSuccess = (response) => {
    const { success } = response;
    logInfo(success);
  };

  const {
    isLoading: isGetLoading,
    error: getError,
    performFetch: performGetFetch,
    cancelFetch: cancelGetFetch,
  } = useFetch("/messages", onGetSuccess);

  useEffect(() => {
    performGetFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ receiverId }),
    });

    return cancelGetFetch;
  }, []);

  const connectSocket = () => socket.connect();

  useEffect(() => {
    socket.on("message", (msg) => {
      logInfo("You have a new message");
      addMessage(msg);
    });
  }, []);
  useEffect(() => {
    connectSocket();

    socket.on("id", (data) => {
      logInfo(data);
    });
    socket.on("chatHistory", (data) => {
      logInfo(data);
      data.forEach((chat) => {
        const idArray = chat._id.split(" ");
        logInfo(idArray);
        if (idArray.includes(userId) && idArray.includes(receiverId)) {
          addHistory(chat.messages);
        }
      });
    });

    return () => socket.disconnect();
  }, [receiverId]);
  const addMessage = (msg) => {
    setMessages((oldMessages) => [
      ...oldMessages,
      ...(Array.isArray(msg) ? msg.reverse() : [msg]),
    ]);
  };
  const addHistory = (msg) => {
    setMessages(() => [...(Array.isArray(msg) ? msg : [msg])]);
  };

  const onSuccess = (response) => {
    const { messages } = response;
    logInfo(messages);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/messages/post",
    onSuccess
  );

  useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, []);

  return (
    <div className="row-container">
      <div className="chat-page-wrapper">
        <div className="chat-container scroll" id="msgBox">
          <p className="chat-title">
            {userDetails?.firstName} is chatting with {receiver?.firstName}
          </p>
          <div
            className="chat-log"
            style={{
              backgroundColor: isDarkMode
                ? "hsla(30, 7%, 27%, 0.8)"
                : "rgba(50, 50, 93, 0.25)",
            }}
          >
            {isLoading && !error && <Spinner />}
            {error && <Error>{error}</Error>}
            {isGetLoading && !getError && <Spinner />}
            {getError && <Error>{getError}</Error>}
            {messages &&
              messages.map((item, index) => {
                const align =
                  userDetails && userDetails._id === item.sender
                    ? "align-right"
                    : "align-left";

                return (
                  userDetails &&
                  receiver && (
                    <Message
                      key={index}
                      currentUser={userDetails}
                      receiver={receiver}
                      message={item}
                      align={align}
                    />
                  )
                );
              })}
          </div>
          <MessageBox
            socket={socket}
            receiver={receiver}
            performFetch={performFetch}
            addMessage={addMessage}
          />
        </div>
        <div className="receiver-info">
          <div className="receiver-img-container">
            <img
              src={
                receiver && receiver.profileImage
                  ? `data:image/${
                      receiver.profileImage.contentType
                    };base64,${Buffer.from(
                      receiver.profileImage.data.data
                    ).toString("base64")}`
                  : "https://picsum.photos/200"
              }
              alt={receiver.firstName}
            />
          </div>
          <p className="receiver-name">{`${receiver.firstName} ${receiver.lastName}`}</p>
        </div>
      </div>
      {userDetails && <RecentConnections parent={"chat"} />}
    </div>
  );
};

export default Chat;
