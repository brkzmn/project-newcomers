import express from "express";
import withAuth from "../middlewares/middleware.js";
import { getMessages, postMessage } from "../controllers/messages.js";

const messagesRouter = express.Router();

messagesRouter.post("/", withAuth, getMessages);
messagesRouter.post("/post", withAuth, postMessage);

export default messagesRouter;
