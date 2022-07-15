import io from "socket.io-client";
const useSocketClient = (pathName = "", queryData) => {
  //https://c35-newcomers-develop.herokuapp.com
  let socket;
  if (queryData) {
    // socket = io.of("https://c35-newcomers-develop.herokuapp.com/", {
    socket = io.of("http://localhost:5000", {
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
    // socket = io("https://c35-newcomers-develop.herokuapp.com/", {
    socket = io("http://localhost:5000", {
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
