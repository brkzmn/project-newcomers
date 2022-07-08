import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import useSocketClient from "./hooks/useSocketClient.js";
export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const socketIo = useSocketClient();
  const [socket] = useState(socketIo);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
SocketProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
