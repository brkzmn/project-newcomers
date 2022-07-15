import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import useUserDetails from "../../hooks/useUserDetails";
// import { logInfo } from "../../../../server/src/util/logging.js";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import "./RecentConnections.css";
import UserCard from "./UserCard";
import { ThemeContext } from "../../ThemeContext";

// eslint-disable-next-line react/prop-types
const RecentConnections = ({ parent }) => {
  const [contacts, setContacts] = useState([]);
  const [contactsIds, setContactsIds] = useState([]);
  const { userDetails, isMeLoading, meError, cancelMeFetch } = useUserDetails();
  const navigate = useNavigate();
  const { theme, isDarkMode } = useContext(ThemeContext);
  // logInfo(contactsIds);
  const { socket } = useContext(SocketContext);
  function provideContactsIds(data, userId, cb) {
    let contactsIdsArray = [];
    data.forEach((chat) => {
      const idArray = chat._id.split(" ").filter((elem) => elem !== "and");
      if (idArray.includes(userId)) {
        const contact = idArray.filter((id) => id !== userId);
        // logInfo(contact);
        contactsIdsArray.push(contact[0]);
      }
    });
    cb(contactsIdsArray);
  }

  useEffect(() => {
    socket.connect();

    userDetails &&
      socket.on("contactHistory", (data) => {
        provideContactsIds(data, userDetails._id, (providedIds) =>
          setContactsIds(providedIds)
        );
      });
    socket.on("sendContacts", (newContacts) => {
      setContacts(newContacts);
    });
  }, []);

  useEffect(() => {
    contactsIds && socket.emit("contacts", contactsIds);
  }, [contactsIds]);
  useEffect(() => {
    return () => {
      socket.disconnect();

      cancelMeFetch();
    };
  }, []);
  return (
    <div
      className="recent-connections"
      style={{
        boxShadow: !isDarkMode
          ? "5px -7px 12px rgba(0, 0, 0, 0.2)"
          : "5px -7px 12px -1px var(--light-background)",
      }}
    >
      {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>}
      <h2 className="recent-connections-title">Contacts</h2>
      <div
        className="recent-connections-list scroll-narrow"
        style={{
          backgroundColor:
            isDarkMode && parent === "chat"
              ? "hsla(30, 7%, 27%, 0.8)"
              : parent !== "chat"
              ? theme.background
              : "rgba(50, 50, 93, 0.25)",
          borderRadius: parent === "chat" ? "0.5rem" : "0",
          padding: parent === "chat" && "1rem 0",
        }}
      >
        <>
          {contacts &&
            contacts.map((user, index) => {
              return (
                user &&
                userDetails && (
                  <UserCard
                    key={index}
                    user={user}
                    parent={parent}
                    onClick={() => {
                      userDetails._id &&
                        navigate(`/chat/${user._id}`, {
                          state: { receiver: user, userId: userDetails._id },
                        });
                    }}
                  />
                )
              );
            })}
        </>
      </div>
    </div>
  );
};

export default RecentConnections;
