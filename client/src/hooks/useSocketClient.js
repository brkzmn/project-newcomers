import io from "socket.io-client";

const useSocketClient = (pathName = "", queryData) => {
  const socketUrl = process.env.SOCKET_SERVER_URL;

  let socket;
  if (queryData) {
    socket = io.of(socketUrl, {
      path: pathName,
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        queryName: queryData,
      },
    });
  } else if (!queryData) {
    socket = io(socketUrl, {
      path: pathName,
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    });
  }

  return socket;
};

export default useSocketClient;
