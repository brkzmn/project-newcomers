import express from "express";
import authenticate from "../controllers/authenticate.js";

const authenticateRouter = express.Router();

authenticateRouter.post("/", authenticate);

export default authenticateRouter;
