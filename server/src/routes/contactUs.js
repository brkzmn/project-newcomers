import express from "express";
import { contactUs } from "../controllers/contactUs.js";

const contactUsRouter = express.Router();

contactUsRouter.post("/send", contactUs);

export default contactUsRouter;
