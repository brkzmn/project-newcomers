// Load our .env variables
import dotenv from "dotenv";
import express from "express";
dotenv.config();
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db/connectDB.js";
import { logInfo, logError } from "./util/logging.js";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { Message, MessageSchema } from "./models/Message.js";
import testRouter from "./testRouter.js";

// The environment should set the port

const port = process.env.PORT;
const httpServer = createServer(app);
const allowedOrigins = [
  "http://localhost:8080",
  "https://c35-newcomers-develop.herokuapp.com",
  "http://c35-newcomers-develop.herokuapp.com",
];
export const io = new Server(httpServer, {
  path: "",
  cors: {
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  },
});
app.set("socketio", io);
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        logError(err);
      } else {
        const userName = decoded.userName;
        socket.userName = userName;
        logInfo("clicked");
        socket.query = socket.handshake.query.queryName;
        next();
      }
    });
  } catch (err) {
    logInfo(err);
    next(err);
  }
});
let socket_id = [];
io.on("connection", async (socket) => {
  try {
    logInfo("Client connected...");
    socket.emit("id", socket.id);
    logInfo(socket.userName);
    socket_id.push(socket.id);
    const userName = socket.userName;
    const user = await User.findOne({ userName });
    const userId = user._id;
    const chatLog = await MessageSchema.statics.latest(userId);
    socket.emit("chatHistory", chatLog);
    socket.emit("contactHistory", chatLog);
    /*  if (socket_id[0] === socket.id) {
            // remove the connection listener for any subsequent
            // connections with the same ID
            io.removeAllListeners("connection");
          } */
    socket.on("message", async (msg) => {
      try {
        let message = await Message.create(msg);
        io.emit("message", message);
        logInfo(message);
      } catch (error) {
        logError(error);
      }
    });
    socket.on("contacts", async (contactsIds) => {
      try {
        logInfo(contactsIds);
        const contactsUsers = await User.find({
          _id: { $in: [...contactsIds] },
        });
        logInfo(contactsUsers.length);
        socket.emit("sendContacts", contactsUsers);
      } catch (err) {
        logError(err);
      }
    });
    socket.on("disconnect", () => {
      logInfo("Client disconnected...");
      //socket.removeAllListeners();
    });
  } catch (error) {
    logError(error);
  }
});
if (port == null) {
  // If this fails, make sure you have created a `.env` file in the right place with the PORT set
  logError(new Error("Cannot find a PORT number, did you create a .env file?"));
}

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(port, () => {
      logInfo(`Server started on port ${port}`);
    });
  } catch (error) {
    logError(error);
  }
};

/****** Host our client code for Heroku *****/
/**
 * We only want to host our client code when in production mode as we then want to use the production build that is built in the dist folder.
 * When not in production, don't host the files, but the development version of the app can connect to the backend itself.
 */
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(new URL("../../client/dist", import.meta.url).pathname)
  );
  // Redirect * requests to give the client data
  app.get("*", (req, res) =>
    res.sendFile(
      new URL("../../client/dist/index.html", import.meta.url).pathname
    )
  );
}

/****** For cypress we want to provide an endpoint to seed our data ******/
if (process.env.NODE_ENV !== "production") {
  app.use("/api/test", testRouter);
}

// Start the server
startServer();
